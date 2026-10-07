import Link from 'next/link';
import type { FaqItem } from '@/lib/content';

/**
 * Question-and-answer list. Plain <details> (no JavaScript, keyboard accessible); the answer text is the exact
 * string used in the page's FAQPage structured data (see lib/structured-data.ts).
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q} data-reveal="" className="faq-item">
          <summary>{item.q}</summary>
          <div className="faq-a">
            <p>{item.a}</p>
            {item.link && (
              <Link href={item.link.href} className="link-amber">
                {item.link.label}
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
