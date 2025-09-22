export async function handler(event, context) {
  const slug = event.queryStringParameters.slug;

  // map your clean slug → raw token
  const mapping = {
    "abc123": "hvrts8%2F-hvmn%3Fv%3Dj_%24q%3F9c30b0c'3%40-05fe'2D4a4-3C-'62558'2Ddc6ec613f'3Cb6"
    // add more if needed
  };

  const rawToken = mapping[slug];
  if (!rawToken) {
    return {
      statusCode: 404,
      body: "Not found"
    };
  }

  // forward the request to the real target
  const upstreamUrl = `https://example.com/service/${rawToken}`;
  const response = await fetch(upstreamUrl);

  const body = await response.text();

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body
  };
}
