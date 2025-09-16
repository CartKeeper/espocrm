exports.handler = async function handler() {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    },
    body: JSON.stringify({
      supported: false,
      message: 'EspoCRM requires a PHP environment and cannot run on Netlify.',
      timestamp: new Date().toISOString(),
      documentation: 'https://github.com/espocrm/espocrm/blob/master/docs/deployment/netlify.md'
    })
  };
};
