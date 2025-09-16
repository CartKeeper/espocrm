export default async function handler(request, context) {
  const response = await context.next();

  response.headers.set('X-EspoCRM-Netlify', 'unsupported');

  return response;
}
