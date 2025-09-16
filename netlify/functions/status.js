exports.handler = async function handler(event) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    },
    body: JSON.stringify({
      supported: false,
      message: 'EspoCRM requires PHP and a supported database, which are not available on Netlify.',
      timestamp: new Date().toISOString(),
      path: event.path
    })
  };
};
