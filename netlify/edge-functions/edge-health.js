export default async function edgeHealth(request) {
  const body = JSON.stringify({
    status: 'ok',
    application: 'EspoCRM',
    checkedAt: new Date().toISOString(),
    path: new URL(request.url).pathname
  });

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}

export const config = {
  path: '/edge-health'
};
