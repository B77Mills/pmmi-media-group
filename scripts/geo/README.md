# GEO Summary & Key Facts — going-live guide

This repo (`pmmi-media-group-websites`) renders two GEO (Generative Engine
Optimization) content fields — `geoSummary` and `geoKeyFacts` — that originate in
mindful-cms and sync to the legacy `platform.Content.json` blob. The website's
render layer is **already built here**, but it is **inert** until the remote
`graphql-server` (in the **mindful-web** monorepo, not in this repo) exposes the
two fields on the `Content` type.

Requesting an undefined GraphQL field fails the whole query, so the field
selections in this repo are **commented out (staged)** until the backend ships.

---

## Step 1 — mindful-web `graphql-server` (do this first)

Mirror the existing `websiteDeck` wiring. Both fields read from the legacy
`json` column, same as `deck` → `websiteDeck`.

### 1a. Field definitions

File: `services/graphql-server/src/graphql/definitions/platform/content/interfaces/content.js`
(next to the existing `websiteDeck` definition):

```graphql
geoSummary: String @projection(localField: "json")
geoKeyFacts: String @projection(localField: "json")
```

### 1b. Resolvers

File: `services/graphql-server/src/graphql/resolvers/platform/content.js`
(in the `Content:` resolver map, mirroring `websiteDeck`):

```js
geoSummary: (content) => {
  const values = content.json ? JSON.parse(content.json) : {};
  return values.geoSummary || null;
},
geoKeyFacts: (content) => {
  const values = content.json ? JSON.parse(content.json) : {};
  return values.geoKeyFacts || null;
},
```

The GraphQL server uses runtime SDL + directives (no codegen) — **restart the
service** after editing. Run any installs inside the project's Docker container,
not on the host.

> Prerequisite already shipped in mindful-cms: the `json` blob round-trips both
> keys (inverse-sync write + import read). See the mindful-cms PR
> "feat: GEO summary & key facts for AI suggestions".

---

## Step 2 — flip this repo on (after Step 1 is deployed)

Uncomment the three staged selections. No other changes are needed — the render
component, head meta tag, and JSON-LD override are already wired.

1. **Article render + head meta tag** —
   `packages/global/graphql/fragment-factories/content-page.js`
   Uncomment `geoSummary` and `geoKeyFacts` in `LeadersContentPageFragment`.

2. **JSON-LD description override** —
   `packages/global/graphql/fragments/content-geo-metadata.js`
   Uncomment `geoSummary` in `ContentGeoMetadataFragment`.

That's it. With the fields present:
- `<global-content-geo>` renders the summary + key-facts list at the top of the
  article body (`packages/global/components/content/geo.marko`, placed in
  `components/layouts/content/default.marko`).
- `<meta name="geo:summary">` is emitted in the document head
  (`components/layouts/content/wrapper.marko`).
- The JSON-LD `description` prefers `geoSummary`, falling back to the existing
  `metadata.description` (`utils/build-geo-structured-data.js`).

---

## Notes / decisions

- **`geo:summary` meta name** is a custom, non-standard tag chosen to avoid
  colliding with the framework-managed `<meta name="description">`. Adjust the
  name in `wrapper.marko` if a different convention is preferred.
- **Where these components live**: per the agreed approach, the render layer was
  added in `pmmi-media-group-websites`. If/when this should apply to all sites,
  the component (`content/geo.marko`), util, and metadata fragment can be promoted
  into the mindful-web `marko-web` / `marko-web-theme-monorail` packages and the
  field added to the theme's default `ContentPageFragment`.
- **Other content fragments**: only `LeadersContentPageFragment` (the standard
  article/content route) was wired. If GEO fields should appear on other content
  types (contact, company, webinar, whitepaper, media-gallery), add the same
  staged selections to their fragment factories.
