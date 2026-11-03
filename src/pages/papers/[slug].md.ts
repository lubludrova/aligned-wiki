import { wikiNotes } from '../../lib/content';

export function getStaticPaths() {
  return Object.entries(wikiNotes).map(([slug, note]) => ({ params: { slug }, props: { raw: note.raw } }));
}

export function GET({ props }: { props: { raw: string } }) {
  return new Response(props.raw, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
