export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const body = req.body ? await req.arrayBuffer() : null;
    
    const url = new URL(req.url);
    const targetUrl = new URL('http://216.144.228.182:10000');
    targetUrl.pathname = url.pathname;
    targetUrl.search = url.search;

    const headers = new Headers();
    for (const [key, value] of req.headers) {
      if (!['host', 'connection'].includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    }

    const response = await fetch(targetUrl.toString(), {
      method: req.method,
      headers,
      body: body,
    });

    const responseHeaders = new Headers();
    for (const [key, value] of response.headers) {
      responseHeaders.set(key, value);
    }
    responseHeaders.set('Access-Control-Allow-Origin', '*');

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
