# Deploying EspoCRM to Netlify

Netlify is designed for static sites and serverless functions, while EspoCRM requires a full PHP application server.
When you deploy the repository to Netlify the build succeeds, but every request is served as a static asset. Because
there is no generated `index.html` or PHP runtime available, Netlify falls back to its default 404 page and you see
`Page not found` for every path.

## Recommended approaches

* Deploy EspoCRM to infrastructure that provides a PHP 8.2–8.4 runtime together with a supported database such as
  MySQL, MariaDB, or PostgreSQL. You can follow the standard installation options that use those requirements,
  including manual, scripted, or Docker-based setups described in the main README.
* If you need a managed hosting solution, choose a provider that offers PHP and database support. Netlify cannot serve the
  application because it does not execute PHP code.
* For local evaluation, use the documented installation workflows to provision a compatible environment before migrating
  to production hosting.

Attempting to keep the deployment on Netlify will always result in a 404 because EspoCRM relies on server-side PHP code.
