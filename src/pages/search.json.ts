import { searchEntries } from '../lib/content';
export function GET() { return new Response(JSON.stringify(searchEntries), { headers: { 'Content-Type': 'application/json' } }); }
