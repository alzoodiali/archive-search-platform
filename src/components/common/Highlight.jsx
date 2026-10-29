import { splitHighlight } from '../../utils/arabic';

/** يميّز كلمات البحث داخل النص */
export default function Highlight({ text, query }) {
  if (!query) return text;
  return splitHighlight(text, query).map((part, i) =>
    part.match ? <mark key={i}>{part.text}</mark> : <span key={i}>{part.text}</span>,
  );
}
