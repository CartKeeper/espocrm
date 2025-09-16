export default async function handler(request, context) {
  const response = await context.next();

  response.headers.set('X-EspoCRM-Netlify', 'Unsupported');
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

  return response;
}
