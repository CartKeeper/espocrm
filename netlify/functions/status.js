exports.handler = async function handler() {
  const documentationUrl = 'https://github.com/espocrm/espocrm/blob/master/docs/deployment/netlify.md';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    },
    body: JSON.stringify({
      supported: false,
      message: 'EspoCRM requires a PHP runtime with a supported database. Netlify does not provide this environment.',
      documentation: documentationUrl,
      timestamp: new Date().toISOString()
    })
  };
};
