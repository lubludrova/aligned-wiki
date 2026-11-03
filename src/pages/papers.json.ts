import { paperSearchEntries } from '../lib/content';
export function GET() { return new Response(JSON.stringify(paperSearchEntries), { headers: { 'Content-Type': 'application/json' } }); }
