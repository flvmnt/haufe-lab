# Lab 3 - Notes

> Heads up: this run was done autonomously via Claude Code using qwen3.5:9b
> (Ollama) for the AI parts. The critique and reflection below were written
> by Claude reading the qwen output critically. Edit to first person before
> claiming as my own work.

## Task 1 - LLM reachability

- Runtime: Ollama (`/usr/local/bin/ollama`), local on port 11434.
- Model: `qwen3.5:9b`.
- Test call: `POST /api/chat` with `"Say hello in one sentence."`
- Response content: *"Hello, I hope you are having a wonderful day."*
- Verdict: works.

One thing I noticed: `eval_count` was 3357 tokens and `total_duration` was
~228s for a single-sentence hello. Qwen3.5:9b is generating a long internal
"thinking" trace before the final answer. For Lab 7's `/health` endpoint
that matters - I either need a smaller model, set `num_predict`, or skip
this model for latency-sensitive paths.

## Task 2 - Evaluate an AI explanation

Snippet: classic debounce from David Walsh's blog (see `snippet.js`). Asked
qwen3.5:9b for a line-by-line explanation. Full output in
`task2_ai_explanation.md`.

### Was it accurate?

Mostly yes, with one outright wrong claim and a couple of imprecise ones.

- **Wrong**: "Multi-line comments in JavaScript are enclosed in `//`". They
  aren't. `//` is single-line only. `/* ... */` is the multi-line form.
  The model fabricated this while justifying why three adjacent `//` lines
  count as one "logical block". A beginner would internalize this and be
  confused the first time they see `/* */` in a real codebase.
- **Imprecise**: "An arrow function maintains lexical scoping... it closes
  over `func`, `context`, and `args` automatically." A regular function
  would also close over those. The arrow function's only real benefit here
  is lexical `this`, and we already captured `this` into `context` two
  lines up, so the choice is interchangeable. The AI made it sound load-
  bearing when it isn't.
- **Loose terminology**: it says `func.apply(context, args)` "spreads" the
  arguments. `.apply` takes an array, that's not the spread operator.
  Minor, but the same word means two different things in JS and a
  beginner will conflate them.

### Was it useful?

For a beginner, mostly. The "Why?" line for `const context = this` is
genuinely helpful, that one bites every junior dev. The breakdown of what
`setTimeout` returns and how `clearTimeout` uses it is correct and clear.

What's missing: *why you'd ever want a debounce in the first place*. There's
no mention of search-as-you-type, resize listeners, scroll handlers, or any
of the actual use cases. A beginner reading this knows what each line does
but has no idea when to reach for this function. That's the gap.

### Why vs what?

Mostly what. The explanation is mechanical: this line stores X, this line
calls Y. The closest it gets to "why" is the `this`-capture rationale and
the summary at the bottom. It never explains *why debounce exists* or *why
you'd care about race conditions between rapid calls*. That's the
conceptual content a beginner actually needs.

## Task 3 - Scaffold a function, then own it

Asked qwen3.5:9b to generate `isValidEmail`. Output in `generated_function.js`:

```js
function isValidEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}
```

Line by line:

1. `function isValidEmail(str)` - takes one arg, no type checking. If
   someone passes a number or `null`, `.test()` will coerce to string,
   so `isValidEmail(null)` returns `false` (tests against the string
   `"null"`). Fine for a frontend form, would worry about it in a
   library API.
2. `return /.../.test(str)` - regex literal, `.test()` returns boolean.
   Regex breakdown:
   - `^` and `$` - anchor to start/end so the *whole* string has to
     match. Without these, `"hi a@b.c bye"` would pass.
   - `[^\s@]+` - one or more characters that are NOT whitespace and NOT
     `@`. Used three times: local part, domain name, TLD.
   - `@` and `\.` - literal `@` and literal `.`. The backslash on the
     dot matters - unescaped `.` matches any character, so `a@b!c`
     would pass.

**The line I had to look up**: `[^\s@]+`. I knew `[^...]` was a negated
character class but I had to remind myself that `\s` inside it is still
"whitespace". The combination "not whitespace and not @" is doing a lot
of work - it's how the regex stays simple while still rejecting obvious
garbage like `"a b@c.d"` or `"a@@b.c"`.

**Would I use this?** For client-side form validation, yes. It accepts the
99% case (`john@example.com`, `j.smith+tag@sub.example.co.uk`) and rejects
obvious garbage. It's also basically the regex from the HTML5 spec for
`<input type="email">`, so users get the same rules in the browser and in
my JS.

What I would NOT do: trust this for "is this email real". It accepts
`a@b.c`, which is syntactically valid but almost certainly not a real
address. The only real validation is sending a confirmation email and
seeing if the user clicks the link. Regex tells you "this string is
shaped like an email", not "this email exists".
