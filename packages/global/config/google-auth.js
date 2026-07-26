/**
 * Shared Google Sign-In defaults for this tenant's sites.
 *
 * Wired as the default `googleAuth` in `config/identity-x.js`, so it applies to
 * every site built through the factory. **Dormant** until a real client id is
 * set below: with an empty `clientId` nothing renders or loads (the auth-form
 * button and the site-wide One-Tap init both stay inert).
 *
 * To enable Google Sign-In for this tenant:
 *   1. Set `clientId` to the tenant's Google OAuth *Web* client id and add every
 *      site origin (prod + staging + preview) as an Authorized JavaScript origin.
 *   2. Flip `autoPrompt` / `signInButtonEnabled` for the surfaces you want.
 *
 * (`missingFieldsBehavior` is intentionally omitted — the configureIdentityX
 * factory / idx config defaults it to 'profile-gate'.)
 */
module.exports = {
  clientId: '',
  autoPrompt: false,
  signInButtonEnabled: false,
};
