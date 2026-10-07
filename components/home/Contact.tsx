import Image from 'next/image';
import { SOCIALS } from '@/lib/site';
import ContactForm from '../ContactForm';
import { SocialPills, Tag } from '../ui';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: SOCIALS.instagram },
  { label: 'Facebook', href: SOCIALS.facebook },
  { label: 'YouTube', href: SOCIALS.youtube },
];

/** The "body" of the bass: contact section + footer. */
export default function Contact() {
  return (
    <footer id="contact" data-fret="20" data-screen-label="Contact" className="fret-row contact">
      <div className="gutter" />
      <div className="neck-cell neck-cell--body" data-neck="20">
        <Image className="body-img" src="/assets/img/bass/body.png" width={760} height={784} alt="" aria-hidden="true" sizes="(max-width: 1488px) 34vw, 420px" quality={90} />
      </div>
      <div className="contact-body">
        <div className="contact-grid">
          <div data-reveal="" className="contact-copy">
            <Tag lead="The body" label="Contact" />
            <h2 className="contact-title">
              Let&apos;s find
              <br />
              <em>your tone.</em>
            </h2>
            <p className="contact-lead">
              Lessons, session work, worship-team coaching or bookings — send a note and Lowell will get back to you.
            </p>
            <div className="contact-social">
              <SocialPills items={SOCIAL_LINKS} className="pill-ink" />
            </div>
          </div>
          <ContactForm />
        </div>
        <div className="contact-bottom">
          <span>© {new Date().getFullYear()} Lowell Jeffery</span>
          <span className="contact-tagline">Discover your tone.</span>
        </div>
      </div>
    </footer>
  );
}
