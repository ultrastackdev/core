export const dynamic = 'force-static';

export async function GET(request: Request) {
  return new Response('Hello, from API!');
}
