export default async function handler(request, context) {
  const url = new URL(request.url);
  const responseBody = {
    status: 'ok',
    edge: context.geo?.country?.code ?? 'unknown',
    timestamp: new Date().toISOString(),
    path: url.pathname
  };

  return new Response(JSON.stringify(responseBody), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-cache, no-store, must-revalidate'
    }
  });
}
