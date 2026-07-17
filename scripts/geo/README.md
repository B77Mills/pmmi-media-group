# GEO Summary & Key Facts — going-live guide

This repo (`pmmi-media-group-websites`) renders three GEO (Generative Engine
Optimization) content fields that originate in mindful-cms (on the
`websiteChannelPublishingOptions` embed) and round-trip through the legacy
`platform.Content.json` blob:

- `geoSummary` — plain-text bottom-line answer.
- `geoKeyFacts` — bulleted-list HTML.
- `geoSummaryDisplay` — `DEFAULT` | `VISIBLE` | `HIDDEN`; controls whether the
  **visible** on-page summary renders. The summary still feeds the head meta tag
  and JSON-LD regardless of this value.

Status: **live.** The mindful-web `graphql-server` exposes the fields (PR
parameter1/mindful-web#258, merged + deployed) and the GraphQL field selections
in this repo are now uncommented.

---

## Step 1 — mindful-web `graphql-server` ✅ implemented

The three fields are exposed on the `Content` type, reading from the legacy
`json` blob (same pattern as `deck` → `websiteDeck`). Already applied in the
**mindful-web** monorepo:

- Field defs: `services/graphql-server/src/graphql/definitions/platform/content/interfaces/content.js`
  (next to `websiteDeck`):
  ```graphql
  geoSummary: String @projection(localField: "json")
  geoKeyFacts: String @projection(localField: "json")
  geoSummaryDisplay: String @projection(localField: "json")
  ```
- Resolvers: `services/graphql-server/src/graphql/resolvers/platform/content.js`
  (mirroring `websiteDeck`) parse `content.json` and return each key.

The GraphQL server uses runtime SDL + directives (no codegen) — **restart the
service** after deploying. Run installs inside the project's Docker container,
not on the host.

> Prerequisite (shipped in mindful-cms): the `json` blob round-trips all three
> keys via inverse-sync write + import read.

---

## Step 2 — go live ✅ done

The staged selections are now uncommented:

1. **Article render (visible block)** —
   `packages/global/graphql/fragment-factories/content-page.js`
   `geoSummary`, `geoKeyFacts`, and `geoSummaryDisplay` in `LeadersContentPageFragment`.

2. **JSON-LD description override + head meta tag** — framework-provided as of
   `@mindful-web/marko-web` >= 1.72.2 (PR parameter1/mindful-web#260). The default
   content-metadata query requests `geoSummary`, the default `buildStructuredData`
   overrides the JSON-LD `description` with it, and `<meta name="geo:summary">` is
   emitted automatically. **No site-side wiring required** — the former local
   `utils/build-geo-structured-data.js` and `graphql/fragments/content-geo-metadata.js`
   were removed, and the `structured-data-query-fragment` / `build-structured-data`
   props plus the head meta tag were dropped from `wrapper.marko`.

With the fields present:
- `<theme-content-geo-summary-block>` (from `marko-web-theme-monorail`) renders the
  summary + key-facts list at the top of the article body (placed in
  `components/layouts/content/default.marko`). The block is shown only for the
  allowed content types (article/news) on long-form bodies (>300 words); the visible
  summary is suppressed when `geoSummaryDisplay === "HIDDEN"`, and `VISIBLE` forces it
  on regardless of content type.
- `<meta name="geo:summary">` is emitted in the document head by the framework
  (`@mindful-web/marko-web` content metadata), regardless of the display toggle.
- The JSON-LD `description` prefers `geoSummary`, falling back to the existing
  `metadata.description`, via the framework's default `buildStructuredData`.

---

## Notes / decisions

- **`geoSummaryDisplay === "DEFAULT"`** is treated as "show the visible summary"
  in this repo (only `HIDDEN` suppresses it). Change the `showSummary` rule in
  `components/content/geo.marko` if a different default is wanted per site.
- **`geo:summary` meta name** is a custom, non-standard tag chosen to avoid
  colliding with the framework-managed `<meta name="description">`. It is now
  emitted by `@mindful-web/marko-web`; change it there if a different convention
  is preferred.
- **Promotion to the theme (done)**: the visible block now lives in
  `marko-web-theme-monorail` (>= 1.72.1) as `<theme-content-geo-summary-block>`
  (standalone `.content-geo-summary` block) with its SCSS at
  `scss/components/blocks/_geo-summary.scss`. This repo consumes it:
  `default.marko` renders `<theme-content-geo-summary-block content=content />`, and
  `scss/core.scss` imports `@mindful-web/marko-web-theme-monorail/scss/components/blocks/geo-summary`.
  The local `content/geo.marko` and `scss/components/_content-geo.scss` were removed.
  The block accepts an optional `title` (defaults to "Article Summary").

  The metadata layer (JSON-LD `geoSummary` description override + `geo:summary`
  meta tag) has since been promoted into `@mindful-web/marko-web` (>= 1.72.2,
  PR parameter1/mindful-web#260) and made the framework default, so the local
  `build-geo-structured-data.js` / `content-geo-metadata.js` and the `wrapper.marko`
  wiring were removed as redundant.
- **Other content fragments**: only `LeadersContentPageFragment` (the standard
  article/content route) was wired. If GEO fields should appear on other content
  types (contact, company, webinar, whitepaper, media-gallery), add the same
  staged selections to their fragment factories.
