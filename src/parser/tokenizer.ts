// Tokenizer for the boolean-expression subset.
//
// Strategy: scan left-to-right, accumulating an "atom buffer" of raw text.
// - Whole-word `and` / `or` / `not` outside string literals become keyword
//   tokens (flushing the atom buffer first).
// - `(` / `)` are ambiguous: they either group a sub-expression
//   (`(a and b)`) or belong to a function call (`states('x')`). We decide by
//   checking whether the character immediately preceding the `(` (ignoring
//   nothing - must be contiguous) is an identifier character. If so, the
//   whole balanced `(...)` (including nested parens and quoted strings) is
//   swallowed into the current atom buffer as raw text. Otherwise it's a
//   real grouping paren and becomes its own token.
import type { Token, TokenType } from './types';

const KEYWORD_RE = /^(and|or|not)$/;

function isIdentChar(ch: string): boolean {
  return /[A-Za-z0-9_.\]]/.test(ch);
}

export function tokenize(src: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  let bufStart = -1;
  let buf = '';

  const flush = (endIdx: number) => {
    const trimmed = buf.trim();
    if (trimmed.length > 0) {
      tokens.push({ type: 'ATOM', value: trimmed, start: bufStart, end: endIdx });
    }
    buf = '';
    bufStart = -1;
  };

  const pushBuf = (ch: string, idx: number) => {
    if (buf.length === 0) bufStart = idx;
    buf += ch;
  };

  while (i < src.length) {
    const ch = src[i];

    // Skip/consume string literals atomically into the buffer.
    if (ch === "'" || ch === '"') {
      const quote = ch;
      let j = i + 1;
      let str = ch;
      while (j < src.length && src[j] !== quote) {
        if (src[j] === '\\' && j + 1 < src.length) {
          str += src[j] + src[j + 1];
          j += 2;
          continue;
        }
        str += src[j];
        j += 1;
      }
      if (j < src.length) {
        str += src[j]; // closing quote
        j += 1;
      }
      if (buf.length === 0) bufStart = i;
      buf += str;
      i = j;
      continue;
    }

    if (ch === '(') {
      const precedingChar = buf.length > 0 ? buf[buf.length - 1] : '';
      const isCallParen = isIdentChar(precedingChar);
      if (isCallParen) {
        // Swallow the whole balanced group into the atom buffer.
        let depth = 1;
        let j = i + 1;
        let group = '(';
        while (j < src.length && depth > 0) {
          const c = src[j];
          if (c === "'" || c === '"') {
            const quote = c;
            group += c;
            j += 1;
            while (j < src.length && src[j] !== quote) {
              if (src[j] === '\\' && j + 1 < src.length) {
                group += src[j] + src[j + 1];
                j += 2;
                continue;
              }
              group += src[j];
              j += 1;
            }
            if (j < src.length) {
              group += src[j];
              j += 1;
            }
            continue;
          }
          if (c === '(') depth += 1;
          if (c === ')') depth -= 1;
          group += c;
          j += 1;
        }
        buf += group;
        i = j;
        continue;
      } else {
        flush(i);
        tokens.push({ type: 'LPAREN', value: '(', start: i, end: i + 1 });
        i += 1;
        continue;
      }
    }

    if (ch === ')') {
      flush(i);
      tokens.push({ type: 'RPAREN', value: ')', start: i, end: i + 1 });
      i += 1;
      continue;
    }

    if (/\s/.test(ch)) {
      // Whitespace: check if buffer so far is exactly a keyword before
      // resetting (word boundary check happens on next non-ident char too).
      i += 1;
      if (buf.length === 0) continue;
      pushBuf(' ', i - 1); // keep separator so multi-word atoms stay spaced
      continue;
    }

    pushBuf(ch, i);
    i += 1;

    // After appending an identifier char, check whether buf (trimmed of
    // trailing/leading via split) ends with a keyword at a word boundary,
    // i.e. next char is whitespace/paren/EOF and the word itself, taken as
    // the *last* whitespace-delimited token in buf, matches and/or/not.
    const nextCh = src[i] ?? '';
    const atWordBoundary = i >= src.length || /[\s()]/.test(nextCh);
    if (atWordBoundary) {
      const words = buf.trim().split(/\s+/);
      const lastWord = words[words.length - 1];
      if (KEYWORD_RE.test(lastWord)) {
        // Flush everything before the keyword as an atom, then emit keyword.
        const beforeLen = buf.length - lastWord.length;
        const before = buf.slice(0, beforeLen).trim();
        if (before.length > 0) {
          tokens.push({ type: 'ATOM', value: before, start: bufStart, end: i - lastWord.length });
        }
        const kwType: TokenType = lastWord.toUpperCase() as TokenType;
        tokens.push({ type: kwType, value: lastWord, start: i - lastWord.length, end: i });
        buf = '';
        bufStart = -1;
      }
    }
  }

  flush(src.length);
  tokens.push({ type: 'EOF', value: '', start: src.length, end: src.length });
  return tokens;
}
