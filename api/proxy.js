export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const url = new URL(req.url);
  url.host = '216.144.228.182';
  url.port = '10000';
  url.protocol = 'http:';
  url.pathname = '/vpn';

  const response = await fetch(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.body,
    duplex: 'half',
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
