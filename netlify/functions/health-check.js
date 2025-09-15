exports.handler = async function handler(event) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    },
    body: JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      path: event.path
    })
  };
};
