export default async (request, context) => {
  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set('X-EspoCRM-Netlify', 'EspoCRM requires a PHP runtime and database.');
  headers.set('Cache-Control', 'no-store');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export const config = {
  path: '/netlify-not-supported.html',
};
