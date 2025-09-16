# Deploying EspoCRM to Netlify

Netlify is designed for static sites and serverless functions, while EspoCRM requires a full PHP application server.
When you deploy the repository to Netlify the build succeeds, but every request is served as a static asset. Because
there is no generated `index.html` or PHP runtime available, Netlify cannot execute the application code.

## Compatibility layer for deploy previews

Starting from this repository version we ship a small Netlify compatibility layer that makes the limitation explicit so
people opening a deploy preview see guidance instead of an error page.

This compatibility layer does not make EspoCRM runnable on Netlify—it only explains the limitation to people opening the
deploy preview. The application still needs to be hosted on infrastructure that provides PHP and a supported database.

## Understanding the Netlify deploy summary

The compatibility layer components map directly to the entries Netlify reports after each deploy:

* The catch-all redirect defined in `netlify.toml` points every request to `/netlify-not-supported.html`, so visitors land
  on the notice page instead of encountering a 404. This shows up in the summary as a processed redirect.
* The `/netlify-status` route forwards to `netlify/functions/status.js`, a serverless function that returns JSON
  explaining that EspoCRM requires a PHP runtime with a supported database. Netlify records this as the deployed
  function.
* `netlify/edge-functions/netlify-notice.js` runs whenever the notice page is served, adds an `X-EspoCRM-Netlify`
  response header, and disables caching, which is why the summary includes an edge function entry.
* `public/netlify-not-supported.html` provides the notice itself, linking back to this documentation and recommended
  hosting targets. It is the page every preview visitor ultimately sees.

These items only document the limitation; they do not add PHP support or remove the requirement for a persistent
database.

## Recommended approaches

* Deploy EspoCRM to infrastructure that provides a PHP 8.2–8.4 runtime together with a supported database such as
  MySQL, MariaDB, or PostgreSQL. You can follow the standard installation options that use those requirements,
  including manual, scripted, or Docker-based setups described in the main README.
* Choose a managed hosting provider that offers PHP and database support. Netlify cannot serve the application because it does not execute PHP code.
* For local evaluation, use the documented installation workflows to provision a compatible environment before migrating
  to production hosting.

Attempting to keep the deployment on Netlify will always land on the compatibility page because EspoCRM relies on
server-side PHP code.
