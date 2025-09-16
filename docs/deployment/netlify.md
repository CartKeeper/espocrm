# Deploying EspoCRM to Netlify

Netlify is designed for static sites and serverless functions, while EspoCRM requires a full PHP application server.
When you deploy the repository to Netlify the build succeeds, but every request is served as a static asset. Because
there is no generated `index.html` or PHP runtime available, the preview cannot execute the application code or render
EspoCRM's interface.

## Understanding the Netlify deploy summary

Deploy previews now ship with a lightweight compatibility layer so the limitation is obvious to anyone opening the
link:

* `netlify.toml` redirects every request to `/netlify-not-supported.html` and applies the standard security headers.
* `public/netlify-not-supported.html` explains why the preview cannot run EspoCRM and points to this documentation for
  the recommended hosting targets.
* `netlify/functions/status.js` responds with JSON indicating that EspoCRM needs PHP and a database. The deploy summary
  reports the function as provisioned, demonstrating serverless support without attempting to run the application.
* `netlify/edge-functions/netlify-notice.js` adds an `X-EspoCRM-Netlify` response header and controls caching for the
  notice page so the edge function invocation is visible in the summary.

The compatibility layer does not make EspoCRM runnable on Netlify—it simply replaces the 404 page with an explicit
notice and a link back to the supported installation paths.

## Recommended approaches

* Deploy EspoCRM to infrastructure that provides a PHP 8.2–8.4 runtime together with a supported database such as
  MySQL, MariaDB, or PostgreSQL. You can follow the standard installation options that use those requirements,
  including manual, scripted, or Docker-based setups described in the main README.
* If you need a managed hosting solution, choose a provider that offers PHP and database support. Netlify cannot serve the application because it does not execute PHP code, so select a host that provides the required runtime out of the box.
* For local evaluation, use the documented installation workflows to provision a compatible environment before migrating
  to production hosting.

Attempting to keep the deployment on Netlify will always fail because EspoCRM relies on server-side PHP code.
