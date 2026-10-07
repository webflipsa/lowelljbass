import Image from 'next/image';
import Link from 'next/link';
import { BASS_ART } from '@/lib/photos';
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
        <Image className="body-img" src={BASS_ART.body.src} width={BASS_ART.body.width} height={BASS_ART.body.height} alt="" aria-hidden="true" />
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
              <Link href="/bass-lessons" className="text-link">
                Bass lessons
              </Link>
              , session work, worship-team coaching or{' '}
              <Link href="/book-a-bassist" className="text-link">
                bass player bookings
              </Link>{' '}
              — send a note and Lowell will get back to you.
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
