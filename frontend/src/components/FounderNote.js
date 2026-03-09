import React from 'react';
import { Play } from 'lucide-react';

const POSTER = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=640&q=60&auto=format&fit=crop';

const FounderNote = () => (
  <section className="founder-note" data-testid="founder-note-section">
    <div className="founder-note__inner">
      <span className="section-eyebrow section-eyebrow--muted" style={{ display: 'block', marginBottom: '1.25rem' }} data-testid="founder-eyebrow">
        From the Founder
      </span>
      <h2
        className="section-headline"
        style={{ textAlign: 'center' }}
        data-testid="founder-headline"
      >
        The problem I kept seeing.
      </h2>
      <p
        style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: 0, lineHeight: 1.7 }}
        data-testid="founder-subhead"
      >
        60 seconds. No slides. Here's why I built insig8.
      </p>

      <div className="founder-note__video-wrap" data-testid="founder-video-placeholder">
        <img
          src={POSTER}
          alt="Founder video poster"
          className="founder-note__poster"
        />
        <div className="founder-note__play" aria-label="Play founder video">
          <Play size={24} fill="currentColor" />
        </div>
      </div>

      <p className="founder-note__caption" data-testid="founder-caption">
        // Loom embed — replace with your recording
      </p>
    </div>
  </section>
);

export default FounderNote;
