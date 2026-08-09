/**
 * Helper for scripts/mindful-web-link.sh.
 *
 * Given a linked source package and the nested node_modules of its installed
 * counterpart, print the nested dependencies that should still be preserved.
 *
 * A nested dep is kept only when the LINKED SOURCE still declares a compatible
 * major range for it. This matters when the source has moved on: if
 * @mindful-web/html is changed to depend on html-entities@^2 but the installed
 * copy still nests html-entities@1.4.0, preserving the nested copy would silently
 * run the new code against the old library. Dropping it lets resolution fall
 * through to the repo's hoisted version, which is what a real publish + install
 * would produce.
 *
 * Usage: node mindful-web-nested-deps.js <sourcePkgDir> <installedNodeModulesDir>
 */
const fs = require('fs');
const path = require('path');

const [sourceDir, nodeModulesDir] = process.argv.slice(2);

const majorOf = (value) => {
  const match = String(value).match(/(\d+)/);
  return match ? match[1] : null;
};

let deps = {};
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(sourceDir, 'package.json'), 'utf8'));
  deps = { ...pkg.dependencies, ...pkg.peerDependencies };
} catch (e) {
  process.exit(0); // unreadable source package.json: keep nothing
}

const keep = [];

const scan = (dir, prefix = '') => {
  let entries = [];
  try {
    entries = fs.readdirSync(dir);
  } catch (e) {
    return;
  }
  entries.forEach((entry) => {
    if (entry.startsWith('.')) return;
    // Recurse one level into scoped directories (@scope/name).
    if (!prefix && entry.startsWith('@')) {
      scan(path.join(dir, entry), `${entry}/`);
      return;
    }
    const name = `${prefix}${entry}`;
    const range = deps[name];
    if (!range) return; // source no longer depends on this at all
    let version;
    try {
      version = JSON.parse(fs.readFileSync(path.join(dir, entry, 'package.json'), 'utf8')).version;
    } catch (e) {
      return;
    }
    if (majorOf(range) === majorOf(version)) keep.push(name);
  });
};

scan(nodeModulesDir);
process.stdout.write(keep.join('\n'));
