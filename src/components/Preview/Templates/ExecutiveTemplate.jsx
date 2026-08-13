import React from 'react';

export default function ExecutiveTemplate({ resumeData, styleSettings }) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = resumeData;
  const accent = styleSettings.accentColor || '#1e3a8a';

  return (
    <div style={{ padding: '3rem 3rem', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: styleSettings.fontFamily || 'Playfair Display' }}>
      {/* Centered Executive Header */}
      <header style={{ textAlign: 'center', borderBottom: `2px solid ${accent}`, paddingBottom: '1rem', marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '0.02em', color: '#0f172a', margin: 0, textTransform: 'uppercase' }}>
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        <p style={{ fontSize: '1.125rem', fontStyle: 'italic', color: accent, margin: '0.25rem 0 0.75rem' }}>
          {personalInfo.jobTitle || 'Executive Title'}
        </p>

        {/* Contact info string */}
        <div style={{ fontSize: '0.84375rem', color: '#475569', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Executive Summary */}
      {personalInfo.summary && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: accent, fontWeight: 700, textAlign: 'center', margin: '0 0 0.5rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>
            Executive Summary
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#1e293b', lineHeight: 1.6, textAlign: 'justify', margin: 0 }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Professional Experience */}
      {experience && experience.length > 0 && (
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: accent, fontWeight: 700, textAlign: 'center', margin: '0 0 0.75rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>
            Professional Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a' }}>
                  <span>{exp.title}</span>
                  <span>{exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '–' : ''} {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', fontSize: '0.84375rem', color: accent, marginBottom: '0.375rem' }}>
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={{ margin: '0 0 0 1.25rem', padding: 0, fontSize: '0.84375rem', color: '#334155', lineHeight: 1.5 }}>
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
        <section style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: accent, fontWeight: 700, textAlign: 'center', margin: '0 0 0.5rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>
            Education & Academic Credentials
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <div>
                  <strong style={{ color: '#0f172a' }}>{edu.degree}</strong> — {edu.institution}
                  {edu.honors && <span style={{ fontStyle: 'italic', color: accent }}> ({edu.honors})</span>}
                </div>
                <div style={{ color: '#64748b' }}>{edu.endDate || edu.startDate}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Competencies / Skills */}
      {skills && skills.length > 0 && (
        <section style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: accent, fontWeight: 700, textAlign: 'center', margin: '0 0 0.5rem', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem' }}>
            Core Competencies
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.84375rem', color: '#334155' }}>
            {skills.map(cat => (
              <div key={cat.id}>
                <strong style={{ color: '#0f172a' }}>{cat.category}:</strong> {cat.items.join(', ')}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
