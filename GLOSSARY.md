# Gabinete FICA Website

Shared language for the public Gabinete FICA website and its consent-aware tracking setup.

**GTM Container**:
The Google Tag Manager web container installed on the site as the single code-level integration point for marketing and analytics tags.
_Avoid_: GTM code, GA script, tracking pixel

**GTM Noscript Fallback**:
The iframe-based Google Tag Manager fallback rendered for visitors whose browser does not run JavaScript.
_Avoid_: Body tag, fallback pixel

**Consent Category**:
A visitor-facing purpose group used to decide which tags may run, currently necessary, analytics, and marketing.
_Avoid_: Cookie type, permission bucket

**Consent Preference Cookie**:
A first-party cookie that records a visitor's consent category choices, consent schema version, and timestamp without storing tracking identifiers.
_Avoid_: Consent token, cookie consent local storage

**Custom Consent UI**:
The website-owned banner and preferences modal that collects and updates visitor consent choices.
_Avoid_: Cookie popup, GTM banner

**Basic Consent Mode**:
The Google Consent Mode approach where Google tags are blocked until the visitor grants the relevant consent category.
_Avoid_: Advanced consent mode, cookieless tracking

**Tracking Matrix**:
The pre-launch inventory that names each requested tag, vendor, purpose, trigger, consent category, and disclosure requirement.
_Avoid_: Tag list, marketing notes
