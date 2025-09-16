exports.handler = async function handler() {
  const documentationUrl = 'https://github.com/espocrm/espocrm/blob/master/docs/deployment/netlify.md';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    },
    body: JSON.stringify({
      supported: false,
      application: 'EspoCRM',
      message: 'EspoCRM requires PHP and a supported database, which Netlify does not provide.',
      documentation: documentationUrl,
      timestamp: new Date().toISOString()
    })
  };
};
