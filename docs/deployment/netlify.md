# Deploying EspoCRM to Netlify

Netlify is designed for static sites and serverless functions, while EspoCRM requires a full PHP application server.
When you deploy the repository to Netlify the build succeeds, but every request is served as a static asset. Because
there is no generated `index.html` or PHP runtime available, Netlify falls back to its default 404 page and you see
`Page not found` for every path.

## Netlify compatibility layer

Starting from this repository version we ship a small Netlify compatibility layer that makes the limitation explicit:

* `netlify.toml` adds a catch-all redirect to `/netlify-not-supported.html`, applies security headers, and exposes a
  simple serverless function that reports the unsupported status.
* `netlify/functions/status.js` responds with JSON so the deploy summary shows a function being provisioned.
* `netlify/edge-functions/netlify-notice.js` decorates the compatibility page with an `X-EspoCRM-Netlify` header to
  demonstrate an edge function invocation.
* `public/netlify-not-supported.html` is the static page Netlify serves instead of a confusing 404. It links back to
  this documentation for the recommended hosting options.

These files do not make EspoCRM runnable on Netlify—they only explain the limitation to people opening the deploy
preview. The application still needs to be hosted on infrastructure that provides PHP and a supported database.

## Understanding the Netlify deploy summary

The Netlify deploy summary reflects this mismatch. Items such as **“No redirect rules processed”**, **“No header rules
processed”**, **“No functions deployed”**, and **“No edge functions deployed”** are informational in this case. EspoCRM
does not provide static `_redirects` or `_headers` files, nor does it ship Netlify-compatible functions. Adding empty
rules will not make the application work on Netlify because the fundamental PHP runtime requirement is still missing.

## Recommended approaches

* Deploy EspoCRM to infrastructure that provides a PHP 8.2–8.4 runtime together with a supported database such as
  MySQL, MariaDB, or PostgreSQL. You can follow the standard installation options that use those requirements,
  including manual, scripted, or Docker-based setups described in the main README.
* If you need a managed hosting solution, choose a provider that offers PHP and database support. Netlify cannot serve the
  application because it does not execute PHP code.
* For local evaluation, use the documented installation workflows to provision a compatible environment before migrating
  to production hosting.

Attempting to keep the deployment on Netlify will always result in a 404 because EspoCRM relies on server-side PHP code.
