# Netlify preview deployment

This branch imports the supplied source without changing page design, copy,
routes, Meta Pixel code or any Shopify cart URL.

## Preview setup

Create a separate Netlify project from `fappservicesllc-beep/mahjong`, selecting
`migration/netlify-preview` as its deployment branch. Use the temporary Netlify
hostname only. Do not attach the production custom domain or change Namecheap.

Settings are in `netlify.toml`: Node 24, build command
`python3 scripts/netlify-build.py`, publish directory `dist/public`.
No database or application secrets are required for this frontend.

The Netlify build installs dependencies from the lockfile. For local validation:

```sh
npm ci
python3 scripts/netlify-build.py
```

The build generates both downloadable source archives from tracked working
files in an isolated directory before compiling. This excludes local secrets,
Netlify state and untracked files from public downloads. Newly added files must
be tracked in Git to appear in those archives. The original exporter remains
unchanged; use the Netlify build wrapper for this deployment.

Netlify serves the React frontend as static files. Express is retained in the
repository for Node hosting, but its API endpoints do not run on this static
deployment. No current frontend page calls the order API. Missing API and
download URLs return 404; page routes use the SPA fallback. Existing ZIP files
are served as attachments. Root assets remain rooted at `/`, not `/english`.

## Before production

Test `/`, `/english`, `/espanol`, `/checkout`, `/checkout-es`, `/thank-you`,
`/gracias`, `/master-key`, `/llave-maestra`, and `/downloads` on the Netlify
hostname, including direct entry and refresh. Verify mobile and desktop,
both ZIP downloads and missing-download 404 responses. Test both checkout
buttons on mobile, all four selections per language and both exit offers.
Keep all ten Shopify destination URLs exactly unchanged.

Local captured-navigation tests do not verify Shopify products, prices or live
redirects. Google Fonts and Meta resources need live preview checks too.

Known inherited items remain unchanged: SEO origin points to
`www.themodernprotocols.com` instead of `mahjong.themodernprotocols.com`, and
Terms/Privacy links point to `#`. Resolve these explicitly before production.

Obtain user approval of the preview before production promotion or DNS changes.
Retain the current live deployment and Namecheap record for rollback. Only the
`mahjong` subdomain may be changed; leave the apex and `www` serving Shopify.
The final URL must remain `https://mahjong.themodernprotocols.com/english`.
