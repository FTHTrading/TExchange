# Troptions Domain Map
## All Troptions-Associated Domains — Status, DNS, and Integration Notes

---

## Primary Ecosystem Domains (8)

| # | Domain | Sub-Brand | DNS Required | SSL | Portal Route | Admin |
|---|---|---|---|---|---|---|
| 1 | troptionsxchange.com | Troptions Xchange | A record → Vercel | Required | `/troptions/xchange` | `/admin/troptions/ecosystem` |
| 2 | unitytoken.io | Unity Token | A record → Vercel | Required | `/troptions/unity-token` | `/admin/troptions/ecosystem` |
| 3 | troptionsuniversity.com | Troptions University | A record → Vercel | Required | `/troptions/university` | `/admin/troptions/ecosystem` |
| 4 | troptionstelevision.com | Troptions Television | A record → Vercel | Required | `/troptions/media` | `/admin/troptions/ecosystem` |
| 5 | realestateconnections.io | Real Estate Connections | A record → Vercel | Required | `/troptions/real-estate` | `/admin/troptions/ecosystem` |
| 6 | greenngo.solar | Green-N-Go Solar | A record → Vercel | Required | `/troptions/solar` | `/admin/troptions/ecosystem` |
| 7 | hotrcw.com | HOTRCW | A record → Vercel | Required | TBD (pending page) | `/admin/troptions/ecosystem` |
| 8 | troptionsmobilemedical.com | Mobile Medical Units | A record → Vercel | Required | `/troptions/mobile-medical` | `/admin/troptions/ecosystem` |

---

## Current Platform Hosting

All Troptions pages are currently served via the Troptions institutional OS at:  
**`troptions.unykorn.org`** (Vercel project: `troptions`, ID: `prj_3z1BGv3guL1hvrNG3fvLgFl4SCxc`)

Branded domains (listed above) are not yet connected to this Vercel project. Action required:
1. DNS: Add CNAME or A record for each domain pointing to Vercel
2. Vercel: Add each domain as a custom domain alias to the `troptions` project
3. Verify: Confirm SSL certificate provisioned by Vercel
4. Optional: Add `next.config.js` rewrite rules if per-domain routing is required

---

## Vercel Domain Setup Commands

For each domain, after DNS propagation:

```bash
# Example: troptionsxchange.com
vercel domains add troptionsxchange.com --scope <team>
vercel alias set <deployment-url> troptionsxchange.com
```

---

## DNS Verification Checklist

| Domain | Owner Confirmed | DNS Updated | SSL Active | Vercel Connected | Notes |
|---|---|---|---|---|---|
| troptionsxchange.com | ❓ | ❌ | ❌ | ❌ | Confirm with Bryan |
| unitytoken.io | ❓ | ❌ | ❌ | ❌ | Confirm with Bryan |
| troptionsuniversity.com | ❓ | ❌ | ❌ | ❌ | Confirm with Bryan |
| troptionstelevision.com | ❓ | ❌ | ❌ | ❌ | Confirm with Bryan |
| realestateconnections.io | ❓ | ❌ | ❌ | ❌ | Confirm with Bryan |
| greenngo.solar | ❓ | ❌ | ❌ | ❌ | Confirm with Bryan |
| hotrcw.com | ❓ | ❌ | ❌ | ❌ | Confirm with Bryan |
| troptionsmobilemedical.com | ❓ | ❌ | ❌ | ❌ | Confirm with Bryan |

All domain ownership and DNS access must be confirmed with Bryan before any DNS changes are made.

---

## Per-Domain Routing Strategy Options

**Option A — Single deployment, all sub-brand paths under troptions.unykorn.org**
- Simplest. No per-domain routing needed.
- Sub-brands accessible as `troptions.unykorn.org/troptions/xchange`, etc.
- Branded domains forward/redirect to these paths.

**Option B — Next.js middleware-based per-domain routing**
- Each domain renders its own sub-brand page as root `/`
- Requires `middleware.ts` hostname-based routing
- More complex but enables fully branded URLs per domain

**Recommendation:** Start with Option A for the Bryan meeting. Propose Option B as a future upgrade phase after domain ownership is confirmed.
