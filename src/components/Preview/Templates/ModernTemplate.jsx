import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const LinkedinIcon = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function ModernTemplate({ resumeData, styleSettings }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = resumeData;
  const accent = styleSettings.accentColor || '#2563eb';

  // Spacing helper
  const getSpacingClass = () => {
    if (styleSettings.spacing === 'compact') return '0.5rem';
    if (styleSettings.spacing === 'spacious') return '1.25rem';
    return '0.875rem';
  };

  const sectionMargin = getSpacingClass();

  return (
    <div style={{ padding: '2.5rem 2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Banner */}
      <header style={{ borderBottom: `3px solid ${accent}`, paddingBottom: '1.25rem', marginBottom: sectionMargin }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.1 }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p style={{ fontSize: '1.125rem', fontWeight: 600, color: accent, marginTop: '0.25rem', margin: 0 }}>
              {personalInfo.jobTitle || 'Professional Headline'}
            </p>
          </div>
          {styleSettings.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: `2px solid ${accent}`
              }}
            />
          )}
        </div>

        {/* Contact Info Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginTop: '0.875rem', fontSize: '0.8125rem', color: '#4b5563' }}>
          {personalInfo.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Mail size={13} style={{ color: accent }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Phone size={13} style={{ color: accent }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <MapPin size={13} style={{ color: accent }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Globe size={13} style={{ color: accent }} />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <LinkedinIcon size={13} color={accent} />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <GithubIcon size={13} color={accent} />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: sectionMargin }}>
          <h2 style={{ fontSize: '0.9375rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.375rem' }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.5, margin: 0 }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <section style={{ marginBottom: sectionMargin }}>
          <h2 style={{ fontSize: '0.9375rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.625rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem' }}>
            Work Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#111827' }}>
                      {exp.title}
                    </span>
                    {exp.company && (
                      <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: accent }}>
                        {' '}— {exp.company}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', fontWeight: 500 }}>
                    {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''} {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                {exp.location && (
                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', fontStyle: 'italic', marginBottom: '0.25rem' }}>
                    {exp.location}
                  </div>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={{ margin: '0.375rem 0 0 1.25rem', padding: 0, fontSize: '0.84375rem', color: '#374151', lineHeight: 1.45 }}>
                    {exp.highlights.filter(h => h.trim()).map((hl, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{hl}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section style={{ marginBottom: sectionMargin }}>
          <h2 style={{ fontSize: '0.9375rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.625rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem' }}>
            Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827' }}>
                    {edu.degree}
                  </span>
                  {edu.institution && (
                    <span style={{ color: '#4b5563', fontSize: '0.875rem' }}>
                      , {edu.institution}
                    </span>
                  )}
                  {edu.honors && (
                    <span style={{ fontSize: '0.8125rem', color: accent, fontStyle: 'italic', marginLeft: '0.5rem' }}>
                      ({edu.honors})
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                  {edu.endDate || edu.startDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section style={{ marginBottom: sectionMargin }}>
          <h2 style={{ fontSize: '0.9375rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem' }}>
            Skills & Competencies
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {skills.map(cat => (
              <div key={cat.id} style={{ fontSize: '0.84375rem', lineHeight: 1.4 }}>
                <strong style={{ color: '#111827', fontWeight: 600 }}>{cat.category}: </strong>
                <span style={{ color: '#374151' }}>{cat.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section style={{ marginBottom: sectionMargin }}>
          <h2 style={{ fontSize: '0.9375rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem' }}>
            Projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {projects.map(proj => (
              <div key={proj.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827' }}>
                    {proj.name} {proj.role ? `(${proj.role})` : ''}
                  </span>
                  {proj.link && (
                    <span style={{ fontSize: '0.8125rem', color: accent }}>{proj.link}</span>
                  )}
                </div>
                {proj.description && (
                  <p style={{ fontSize: '0.8125rem', color: '#4b5563', margin: '0.125rem 0 0', lineHeight: 1.4 }}>
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Languages Footer */}
      {(certifications?.length > 0 || languages?.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
          {certifications && certifications.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.8125rem', textTransform: 'uppercase', color: accent, fontWeight: 700, marginBottom: '0.25rem' }}>
                Certifications
              </h3>
              <div style={{ fontSize: '0.8125rem', color: '#374151' }}>
                {certifications.map(c => (
                  <div key={c.id}>
                    <strong>{c.name}</strong> ({c.issuer} {c.date})
                  </div>
                ))}
              </div>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.8125rem', textTransform: 'uppercase', color: accent, fontWeight: 700, marginBottom: '0.25rem' }}>
                Languages
              </h3>
              <div style={{ fontSize: '0.8125rem', color: '#374151' }}>
                {languages.map(l => (
                  <span key={l.id} style={{ marginRight: '0.75rem' }}>
                    <strong>{l.name}:</strong> {l.proficiency}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
