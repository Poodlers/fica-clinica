# GTM and Consent Implementation Specification

This specification captures the agreed tracking architecture for the Gabinete FICA Astro website. It is a handoff document for implementation; privacy and cookie policy copy still needs owner/legal review.

## Goals

- Install the Google Tag Manager web container as the single code-level integration point.
- Do not hardcode GA4, Google Ads, Meta Pixel, or future marketing tags in Astro.
- Use consent-first behaviour for normal JavaScript-enabled browsing.
- Support Google Consent Mode v2.
- Give visitors a way to reject, grant, change, and withdraw optional consent.

## Core Decisions

- Use a custom Astro consent UI, not a GTM-hosted banner.
- Use Basic Consent Mode for normal browsing: GTM loads only after analytics or marketing consent.
- Install the GTM noscript fallback as an explicit exception for no-JavaScript visitors.
- Treat all visitors with the same consent-first behaviour; do not geo-split.
- Store consent in a first-party cookie named `fica_consent_preferences`.
- Use consent schema version `2026-10-gtm-v1`.
- Re-prompt after 180 days or when the schema version changes.
- Add a combined policy page at `/privacidade-e-cookies`.

## Consent Categories

- Necessary: always enabled. Covers the site operating and functional site preferences, including the existing theme preference storage.
- Analytics: optional. Maps to `analytics_storage`.
- Marketing: optional. Maps to `ad_storage`, `ad_user_data`, and `ad_personalization`.

Analytics and marketing must be off by default.

## Cookie Contract

Cookie name: `fica_consent_preferences`

Shape:

```json
{
  "version": "2026-10-gtm-v1",
  "analytics": false,
  "marketing": false,
  "updatedAt": "2026-10-03T00:00:00.000Z"
}
```

Cookie attributes:

- `Path=/`
- `SameSite=Lax`
- `Max-Age=15552000`
- `Secure` on HTTPS

If the cookie is absent, malformed, expired, or for the wrong version, ignore it, show the banner, and keep GTM unloaded during normal JavaScript-enabled browsing.

## Environment

Read the GTM container ID from `PUBLIC_GTM_CONTAINER_ID`.

Only accept values matching a GTM container ID format beginning with `GTM-` and containing uppercase letters, numbers, and hyphens. If missing or invalid, do not render or load GTM. The consent UI may still render and store preferences.

Add this to `.env.example`:

```dotenv
PUBLIC_GTM_CONTAINER_ID=
```

## Astro Placement

In `src/layouts/Layout.astro`:

- Put the consent bootstrap as early in `<head>` as practical, after charset/viewport/theme-color.
- Define `window.dataLayer`.
- Define `gtag`.
- Set Consent Mode v2 defaults to denied:
  - `analytics_storage: denied`
  - `ad_storage: denied`
  - `ad_user_data: denied`
  - `ad_personalization: denied`
- Set `ads_data_redaction` to `true`.
- Read the consent cookie.
- If prior analytics or marketing consent exists, update consent state from the cookie and load GTM programmatically.
- Do not paste the normal GTM JavaScript loader statically in `<head>`.
- Render the GTM noscript iframe immediately after the opening `<body>` when the GTM ID is valid.
- Render a short `<noscript>` notice explaining that cookie preferences require JavaScript and linking to `/privacidade-e-cookies`.

Create a dedicated component such as `src/components/CookieConsent.astro` and include it once near the end of `<body>`.

## GTM Loading Rules

- Before choice: set denied defaults; do not load GTM.
- Reject all: store the denied choice, call a denied consent update, push `fica_consent_update`, and do not load GTM.
- Analytics only: update consent, push `fica_consent_update`, load GTM, allow analytics tags only.
- Marketing only: update consent, push `fica_consent_update`, load GTM, allow marketing tags only.
- Accept all: update consent, push `fica_consent_update`, load GTM.
- Returning visitor with optional consent: set denied defaults, update from cookie, then load GTM.
- Withdrawal: update consent to denied for withdrawn categories, persist the cookie, push `fica_consent_update`, and do not try to unload already-loaded scripts.

The GTM loader must be idempotent. Use a window flag such as `window.__ficaGtmLoaded` and avoid inserting duplicate scripts.

When consent is granted or changed, update Consent Mode before inserting GTM.

## Data Layer Event

After saving or changing consent, push:

```js
window.dataLayer.push({
  event: "fica_consent_update",
  analyticsConsent: true,
  marketingConsent: false
});
```

This event is for debugging and GTM configuration support. Actual tag permission must still rely on GTM consent checks.

## Consent UI

First-layer banner:

- Bottom banner.
- Buttons: accept all, reject all, manage preferences.
- Reject all must be as easy to access as accept all.

Preferences modal:

- Use a native `dialog` if practical.
- Necessary category is visible, enabled, and disabled.
- Analytics and marketing toggles are off by default.
- Save with an explicit `Guardar preferencias` action.
- Include close/cancel behaviour, Escape support, labelled heading, focusable controls, and focus return to the trigger.

Footer:

- Add a normal link to `/privacidade-e-cookies`.
- Add a `Preferencias de cookies` button/control that reopens the preferences modal.

## Policy Page

Create `/privacidade-e-cookies` in the same implementation pass.

The page should include a Portuguese draft for owner/legal review covering:

- Controller/site owner identity.
- Consent categories.
- Necessary/functional storage, including the theme preference.
- GTM as the integration point.
- Current and future vendors controlled through GTM.
- Analytics and marketing purposes.
- Retention/expiry of the consent preference cookie.
- How to change or withdraw consent.
- A link to Google's business data responsibility disclosure.
- A reminder that the live vendor list must match the GTM container.

## GTM Container Governance

Marketing must provide a tracking matrix before publishing tags. Every tag needs:

- Vendor
- Purpose
- Consent category
- Trigger
- Data collected
- Whether it uses remarketing, audiences, or conversion tracking
- Required privacy/cookie disclosure text

GTM is a privileged script surface. Only trusted users should have publish access.

Google tags should use built-in Consent Mode checks. Non-Google tags, including Meta Pixel, must require the marketing consent gate before firing. Do not use the noscript fallback for unapproved no-JavaScript/image-pixel tracking.

For this clinic site, do not send health conditions, appointment details, free-text form data, names, phone numbers, email addresses, or other patient-identifying data to GTM, GA4, Google Ads, Meta, or similar vendors.

## Verification

Before launch:

- Run the Astro build.
- Verify no GTM/GA/Ads/Meta requests happen before consent in normal JavaScript-enabled browsing.
- Verify reject all stores the choice and keeps GTM unloaded.
- Verify analytics-only loads GTM and allows analytics while denying marketing consent.
- Verify accept all loads GTM and grants all v2 consent fields.
- Verify footer preferences can withdraw consent.
- Verify Tag Assistant/Preview for no choice, reject all, analytics-only, and accept all.
- Verify the live GTM container does not publish tags without consent checks.

See `docs/tracking-verification.md` for the checklist.

## Implementation Prompt

Implement the GTM and consent architecture described in `docs/gtm-consent-spec.md`. Do not add GA4, Google Ads, Meta Pixel, or other vendor tags directly to Astro. Use `PUBLIC_GTM_CONTAINER_ID`, Basic Consent Mode for normal browsing, the custom Astro consent UI, the `fica_consent_preferences` cookie, the `/privacidade-e-cookies` policy page, footer links, the GTM noscript fallback, `fica_consent_update`, and the verification checklist. Keep all marketing tags inside GTM and require consent checks there.
