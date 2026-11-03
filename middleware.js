export default function middleware(request) {
  if (request.headers.get('authorization') === `Basic ${btoa('research:research')}`) {
    return new Response(null, { headers: { 'x-middleware-next': '1' } });
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Aligned Research Atlas", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  });
}
