exports.handler = async function handler() {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify({
      name: 'EspoCRM',
      netlifySupported: false,
      message: 'EspoCRM is a PHP application and cannot run on Netlify. See docs/deployment/netlify.md for details.'
    })
  };
};
