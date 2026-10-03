# Tracking Verification Checklist

Use this checklist before launching or republishing GTM tags.

## Build

- [ ] `npm run build` passes.
- [ ] `PUBLIC_GTM_CONTAINER_ID` is present and valid in the launch environment.
- [ ] No direct GA4, Google Ads, Meta Pixel, or other marketing scripts are hardcoded in Astro.

## Browser Checks

- [ ] First visit with no stored consent shows the consent banner.
- [ ] Before any choice, normal JavaScript-enabled browsing does not load GTM, GA4, Google Ads, or Meta Pixel requests.
- [ ] `Rejeitar tudo` stores the consent preference and keeps GTM unloaded.
- [ ] Analytics-only consent loads GTM and grants `analytics_storage` only.
- [ ] Marketing-only consent loads GTM and grants `ad_storage`, `ad_user_data`, and `ad_personalization` only.
- [ ] Accept all grants analytics and marketing consent and loads GTM once.
- [ ] The footer `Preferencias de cookies` control reopens preferences.
- [ ] Withdrawing consent updates the saved preference and Consent Mode state.
- [ ] A malformed or outdated consent cookie is ignored and the banner reappears.

## Tag Assistant / GTM Preview

- [ ] No-choice state shows denied defaults.
- [ ] Reject-all state keeps optional consent denied.
- [ ] Analytics-only state blocks marketing tags.
- [ ] Marketing-only state blocks analytics tags unless analytics consent is granted.
- [ ] Accept-all state grants all expected Consent Mode v2 fields.
- [ ] Every published tag has the expected consent checks.

## Governance

- [ ] `docs/tracking-matrix.md` is complete for every tag.
- [ ] The `/privacidade-e-cookies` page matches the live GTM vendors and purposes.
- [ ] No tag sends health conditions, appointment details, free-text form data, names, phone numbers, email addresses, or patient-identifying data.
- [ ] GTM publish access is limited to trusted users.
