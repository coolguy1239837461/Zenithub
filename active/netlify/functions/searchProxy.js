// netlify/functions/searchProxy.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing query parameter' })
    };
  }

  // Generate the messy URL based on the query
  const messyUrl = `https://example.com/service/${encodeURIComponent(query)}`;

  try {
    const response = await fetch(messyUrl);
    const data = await response.text();

    return {
      statusCode: 200,
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};
