exports.handler = async () => {
  const timestamp = new Date().toISOString();
  const payload = {
    status: 'ok',
    application: 'EspoCRM',
    checkedAt: timestamp
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  };
};
