# BaseCMS Websites for PMMI Media Group
This monorepo contains the codebase for websites managed by PMMI Media Group. All sites within this repository utilize the [@parameter1/base-cms](https://github.com/parameter1/base-cms) packages, most notably the `marko-web` and `web-cli`.

### Developing against a local `mindful-web` checkout

By default the sites in this repo run against the **published** `@mindful-web/*` packages
installed in `node_modules`. To test unpublished changes you would otherwise have to commit,
publish, and bump dependencies.

Instead, add a single value to your `.env` file pointing at your local
[mindful-web](https://github.com/parameter1/mindful-web) checkout:

```sh
# Path is relative to this repo root (or absolute)
MINDFUL_WEB_PATH=../../mindful/mindful-web
```

Then start a site as usual:

```sh
docker compose up pw
```

Editing a `.marko`, `.js`, or `.scss` file in your `mindful-web` checkout now recompiles and
restarts the site exactly like editing a file in this repo.

To go back to the published packages, comment out or remove `MINDFUL_WEB_PATH` and restart the
service. **There is nothing to manually undo** — `scripts/mindful-web-link.sh` reconciles
`node_modules` on every container start, so the `.env` value is always the source of truth.

#### Notes and limitations

- **All** `@mindful-web` runtime packages are linked together, not a hand-picked subset. Linking
  only some produces a mixed graph (e.g. a theme from `main` running against a published
  `marko-web`), which is not a combination that will ever ship.
- You are testing this repo against `mindful-web` **`main`**, while its `package.json` files are
  pinned to published ranges. A green run is strong evidence but not proof that the eventual
  dependency bump will be clean.
- Build tooling (`web-cli`, `marko-compiler`, `dependency-tool`, `eslint`, `browserslist-config`)
  is deliberately left on the installed copy. These run via `node_modules/.bin/*` stubs, whose
  `main` Node resolves to its real path — escaping `--preserve-symlinks` and causing them to load
  dependencies from the `mindful-web` checkout. If that checkout's `node_modules` was installed on
  macOS, the Linux container build fails with
  `You installed esbuild for another platform than the one you're currently using`.
  To test a tooling change anyway, run `docker compose run --rm yarn install` **inside
  mindful-web** first, then set `MINDFUL_WEB_LINK_TOOLING=1` here.
- The site container compiles Marko templates **into** your `mindful-web` checkout (`*.marko.js`).
  Those are gitignored there, so it's harmless — but the checkout is mounted read-write.
- Running `yarn install` while linked will replace the symlinks with freshly installed packages.
  This self-heals: the next container start discards the stale backups and re-links.
- Orphaned compiled templates (`*.marko.js` with no `.marko` source, left behind by a branch
  switch) are pruned automatically on every start, in both this repo and the linked checkout.
