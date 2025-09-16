# Deploying EspoCRM to Netlify

Netlify is designed for static sites and serverless functions, while EspoCRM requires a full PHP application server.
Deploying the repository to Netlify completes successfully, but every request is served as a static asset. Without a
generated `index.html` or PHP runtime, Netlify would normally fall back to its default 404 page and show
`Page not found` for every path.

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

Because the compatibility files are part of the repository, the Netlify deploy summary now reports that redirect rules,
headers, a function, and an edge function were processed. This is expected: the redirect sends all requests to the
informational page, the security headers apply to every response, the `/status` function surfaces the unsupported
state, and the `netlify-notice` edge function adds a diagnostic header. None of these artifacts provide the PHP runtime
or database EspoCRM requires—they simply guide readers to the correct hosting guidance.

If you open `/.netlify/functions/status` in a deploy preview you will see a JSON payload that reiterates that EspoCRM is
not supported on Netlify and links back to this document.

## Recommended approaches

* Deploy EspoCRM to infrastructure that provides a PHP 8.2–8.4 runtime together with a supported database such as
  MySQL, MariaDB, or PostgreSQL. You can follow the standard installation options that use those requirements,
  including manual, scripted, or Docker-based setups described in the main README.
* If you need a managed hosting solution, choose a provider that offers PHP and database support. Netlify cannot serve the
  application because it does not execute PHP code.
* For local evaluation, use the documented installation workflows to provision a compatible environment before migrating
  to production hosting.

Attempting to keep the deployment on Netlify will always serve the compatibility notice because EspoCRM relies on server-side PHP code.
