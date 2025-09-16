# Deploying EspoCRM to Netlify

Netlify is designed for static sites and serverless functions, while EspoCRM requires a full PHP application server.
When you deploy the repository to Netlify the build succeeds, but every request is served as a static asset. Because
there is no generated `index.html` or PHP runtime available, the preview cannot execute the application code or render
EspoCRM's interface.

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

Attempting to keep the deployment on Netlify will always fail because EspoCRM relies on server-side PHP code.
