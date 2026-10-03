# AGENTS.md

Personal project portfolio (Astro, static, no framework runtime). Material 3 Expressive-inspired, built bespoke in plain CSS. A human will read and edit this code, so keep it plain.

## Read first

- [docs/design.md](docs/design.md): the site's "feel" and the interaction checklist. **Feel is the top priority.**
- [docs/architecture.md](docs/architecture.md): file layout, components, styling rules.
- [docs/content.md](docs/content.md): adding and editing projects.

## Rules

1. **Never invent copy.** Bios, project blurbs, taglines and "about" text are the owner's voice. Leave a placeholder and move on:
   - In markup/Markdown: `TODO(copy): <what's needed, e.g. "one-sentence description of Kaiwa">`
   - Make it visibly obvious on the page so it can't ship unnoticed.
   - Find them all with `grep -rn "TODO(copy)" src docs`.
   - Structure, labels and UI strings that are functional (button text like "All projects") are fine to write.
2. **Write code a person would write.** Small components, plain names, comments only where the *why* isn't obvious. No speculative props, no abstraction for one use, no boilerplate comments restating the code.
3. **Feel before features.** Every interactive element needs hover, focus-visible, active and keyboard behaviour (see design.md). Check mobile/touch too. If you add something clickable, you own all of its states.
4. **Use the tokens.** Colours come from `--md-*` variables and tone roles in `src/styles/global.css`; no hardcoded hex in components. Motion uses the shared easing variables.
5. **Verify before reporting done:** `pnpm astro check` and `pnpm build` must pass. For visual or interaction changes, look at it in a browser, don't just rely on the build.
6. **Keep docs current.** After any big change (new component, new page type, changed convention, changed design decision), update the relevant doc *and* its summary line (see below).
7. **Ask questions.** If there are any problems, it is fine to ask for human help.

## Doc maintenance

Every file in `docs/` starts with a one-line `> Summary:` blockquote and a `Last updated:` line. When you change a doc, rewrite the summary so someone reading only the first lines gets the current picture, and update the date. Put changes of intent (not just file moves) in the summary. Don't append changelogs; edit the doc to be correct.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Restart the dev server after adding or changing `src/content.config.ts`; the collection schema is only read at startup.

Typecheck with `pnpm astro check`. It needs TypeScript 6 (Astro's checker rejects TS 7), so don't bump `typescript` past 6.x yet.

## Astro documentation

Full documentation: https://docs.astro.build

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling](https://docs.astro.build/en/guides/styling/)
- [Framework components](https://docs.astro.build/en/guides/framework-components/) (not used currently)
- [i18n](https://docs.astro.build/en/guides/internationalization/) (not used currently)
