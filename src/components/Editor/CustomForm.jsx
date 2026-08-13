import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function CustomForm({ 
  certifications, 
  setCertifications, 
  languages, 
  setLanguages 
}) {
  // Certifications handlers
  const handleAddCert = () => {
    const newCert = { id: `cert-${Date.now()}`, name: '', issuer: '', date: '' };
    setCertifications(prev => [...prev, newCert]);
  };

  const handleRemoveCert = (id) => {
    setCertifications(prev => prev.filter(c => c.id !== id));
  };

  const handleCertChange = (id, field, value) => {
    setCertifications(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // Languages handlers
  const handleAddLang = () => {
    const newLang = { id: `lang-${Date.now()}`, name: '', proficiency: 'Fluent' };
    setLanguages(prev => [...prev, newLang]);
  };

  const handleRemoveLang = (id) => {
    setLanguages(prev => prev.filter(l => l.id !== id));
  };

  const handleLangChange = (id, field, value) => {
    setLanguages(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  return (
    <div>
      {/* Certifications Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <div className="form-section-title">Certifications & Licenses</div>
            <div className="form-section-subtitle">Professional credentials, AWS, Google, or Scrum certifications</div>
          </div>
          <button className="btn btn-secondary" onClick={handleAddCert}>
            <Plus size={16} />
            <span>Add Certification</span>
          </button>
        </div>

        {certifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
            No certifications added yet.
          </div>
        ) : (
          certifications.map(cert => (
            <div key={cert.id} className="item-card">
              <div className="item-card-header" style={{ marginBottom: '0.5rem' }}>
                <span className="item-card-title">{cert.name || 'New Certification'}</span>
                <button 
                  className="btn btn-secondary btn-icon-only" 
                  onClick={() => handleRemoveCert(cert.id)}
                >
                  <Trash2 size={16} style={{ color: 'var(--danger)' }} />
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Certification Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={cert.name}
                    onChange={(e) => handleCertChange(cert.id, 'name', e.target.value)}
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Issuing Organization</label>
                  <input
                    type="text"
                    className="form-input"
                    value={cert.issuer}
                    onChange={(e) => handleCertChange(cert.id, 'issuer', e.target.value)}
                    placeholder="Amazon Web Services"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Year / Date</label>
                  <input
                    type="text"
                    className="form-input"
                    value={cert.date}
                    onChange={(e) => handleCertChange(cert.id, 'date', e.target.value)}
                    placeholder="2023"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Languages Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <div className="form-section-title">Languages</div>
            <div className="form-section-subtitle">Spoken and written language proficiencies</div>
          </div>
          <button className="btn btn-secondary" onClick={handleAddLang}>
            <Plus size={16} />
            <span>Add Language</span>
          </button>
        </div>

        {languages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
            No languages added yet.
          </div>
        ) : (
          languages.map(lang => (
            <div key={lang.id} className="item-card">
              <div className="item-card-header" style={{ marginBottom: '0.5rem' }}>
                <span className="item-card-title">{lang.name || 'New Language'}</span>
                <button 
                  className="btn btn-secondary btn-icon-only" 
                  onClick={() => handleRemoveLang(lang.id)}
                >
                  <Trash2 size={16} style={{ color: 'var(--danger)' }} />
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Language</label>
                  <input
                    type="text"
                    className="form-input"
                    value={lang.name}
                    onChange={(e) => handleLangChange(lang.id, 'name', e.target.value)}
                    placeholder="e.g. English, French, Mandarin"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Proficiency Level</label>
                  <input
                    type="text"
                    className="form-input"
                    value={lang.proficiency}
                    onChange={(e) => handleLangChange(lang.id, 'proficiency', e.target.value)}
                    placeholder="Native, Fluent, Professional Working, Basic"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
