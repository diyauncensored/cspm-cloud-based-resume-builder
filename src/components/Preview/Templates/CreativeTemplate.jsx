import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const LinkedinIcon = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function CreativeTemplate({ resumeData, styleSettings }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = resumeData;
  const accent = styleSettings.accentColor || '#7c3aed';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220mm 1fr', height: '100%', minHeight: '297mm' }}>
      {/* Dynamic 2-column flexbox paper representation */}
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        {/* Left Sidebar */}
        <aside style={{ width: '32%', background: '#f8fafc', borderRight: `3px solid ${accent}`, padding: '2rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Profile Photo */}
          {styleSettings.showPhoto && personalInfo.photoUrl && (
            <div style={{ textAlign: 'center' }}>
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `3px solid ${accent}`,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          )}

          {/* Contact Information */}
          <div>
            <h3 style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.625rem', borderBottom: `1px solid ${accent}`, paddingBottom: '0.25rem' }}>
              Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78125rem', color: '#475569', wordBreak: 'break-all' }}>
              {personalInfo.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Mail size={12} style={{ color: accent, flexShrink: 0 }} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Phone size={12} style={{ color: accent, flexShrink: 0 }} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <MapPin size={12} style={{ color: accent, flexShrink: 0 }} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Globe size={12} style={{ color: accent, flexShrink: 0 }} />
                  <span>{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <LinkedinIcon size={12} color={accent} />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.github && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <GithubIcon size={12} color={accent} />
                  <span>{personalInfo.github}</span>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.625rem', borderBottom: `1px solid ${accent}`, paddingBottom: '0.25rem' }}>
                Education
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {education.map(edu => (
                  <div key={edu.id} style={{ fontSize: '0.78125rem' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{edu.degree}</div>
                    <div style={{ color: '#475569' }}>{edu.institution}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Pills */}
          {skills && skills.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.625rem', borderBottom: `1px solid ${accent}`, paddingBottom: '0.25rem' }}>
                Skills
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {skills.map(cat => (
                  <div key={cat.id}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      {cat.category}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {cat.items.map((item, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.6875rem',
                            padding: '0.125rem 0.375rem',
                            background: '#e2e8f0',
                            borderRadius: '4px',
                            color: '#1e293b'
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.5rem', borderBottom: `1px solid ${accent}`, paddingBottom: '0.25rem' }}>
                Languages
              </h3>
              <div style={{ fontSize: '0.78125rem', color: '#334155' }}>
                {languages.map(l => (
                  <div key={l.id} style={{ marginBottom: '0.25rem' }}>
                    <strong>{l.name}:</strong> {l.proficiency}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Main Pane */}
        <main style={{ flex: 1, padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Header */}
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.1 }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: accent, margin: '0.25rem 0 0' }}>
              {personalInfo.jobTitle || 'Job Title'}
            </h2>
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.375rem' }}>
                About Me
              </h3>
              <p style={{ fontSize: '0.84375rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.625rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem' }}>
                Work Experience
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>
                        {exp.title} <span style={{ color: accent }}>@ {exp.company}</span>
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul style={{ margin: '0.375rem 0 0 1rem', padding: 0, fontSize: '0.8125rem', color: '#475569', lineHeight: 1.45 }}>
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

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem' }}>
                Featured Projects
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {projects.map(proj => (
                  <div key={proj.id} style={{ fontSize: '0.8125rem' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>
                      {proj.name} {proj.role ? `— ${proj.role}` : ''}
                    </div>
                    <p style={{ margin: '0.125rem 0 0', color: '#475569' }}>{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: accent, fontWeight: 700, marginBottom: '0.375rem' }}>
                Certifications
              </h3>
              <div style={{ fontSize: '0.8125rem', color: '#334155' }}>
                {certifications.map(c => (
                  <div key={c.id}>
                    <strong>{c.name}</strong> ({c.issuer} {c.date})
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
