# Consent-aware GTM integration

Accepted. The Gabinete FICA website will use Google Tag Manager as the single code-level integration point for marketing and analytics tags, but normal JavaScript-enabled browsing will follow Basic Consent Mode: GTM is not loaded until the visitor grants analytics or marketing consent. We will still install Google's standard GTM noscript fallback as an explicit no-JavaScript exception, because the site owner wants the complete GTM install snippet present even though those visitors cannot interact with the custom consent UI.

## Consequences

- The Astro app owns the consent banner, preferences modal, first-party consent preference cookie, and Consent Mode v2 state updates.
- GTM tags must still be governed in the GTM container; every tag needs a consent category and consent checks before publication.
- The noscript fallback must not be used as a loophole for unapproved image-pixel tracking.
