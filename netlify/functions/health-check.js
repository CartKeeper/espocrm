exports.handler = async function handler(event) {
  const timestamp = new Date().toISOString();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    },
    body: JSON.stringify({
      status: 'ok',
      application: 'EspoCRM',
      timestamp,
      path: event.path
    })
  };
};
