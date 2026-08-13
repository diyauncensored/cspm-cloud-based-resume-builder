import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export default function ExperienceForm({ experience, setExperience }) {
  const handleAddExperience = () => {
    const newItem = {
      id: `exp-${Date.now()}`,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: ['']
    };
    setExperience(prev => [...prev, newItem]);
  };

  const handleRemoveExperience = (id) => {
    setExperience(prev => prev.filter(item => item.id !== id));
  };

  const handleChange = (id, field, value) => {
    setExperience(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleAddBullet = (expId) => {
    setExperience(prev => prev.map(item => {
      if (item.id === expId) {
        return { ...item, highlights: [...item.highlights, ''] };
      }
      return item;
    }));
  };

  const handleBulletChange = (expId, index, value) => {
    setExperience(prev => prev.map(item => {
      if (item.id === expId) {
        const newHighlights = [...item.highlights];
        newHighlights[index] = value;
        return { ...item, highlights: newHighlights };
      }
      return item;
    }));
  };

  const handleRemoveBullet = (expId, index) => {
    setExperience(prev => prev.map(item => {
      if (item.id === expId) {
        const newHighlights = item.highlights.filter((_, idx) => idx !== index);
        return { ...item, highlights: newHighlights.length ? newHighlights : [''] };
      }
      return item;
    }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <div className="form-section-title">Work Experience</div>
          <div className="form-section-subtitle">List your employment history and major accomplishments</div>
        </div>
        <button className="btn btn-secondary" onClick={handleAddExperience}>
          <Plus size={16} />
          <span>Add Position</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          No work experience added yet. Click "Add Position" above.
        </div>
      ) : (
        experience.map((exp, index) => (
          <div key={exp.id} className="item-card">
            <div className="item-card-header">
              <span className="item-card-title">
                {exp.title || `Position #${index + 1}`} {exp.company ? `@ ${exp.company}` : ''}
              </span>
              <button 
                className="btn btn-secondary btn-icon-only" 
                onClick={() => handleRemoveExperience(exp.id)}
                title="Remove position"
              >
                <Trash2 size={16} style={{ color: 'var(--danger)' }} />
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={exp.title}
                  onChange={(e) => handleChange(exp.id, 'title', e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={exp.company}
                  onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                  placeholder="TechCorp Solutions"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={exp.location}
                  onChange={(e) => handleChange(exp.id, 'location', e.target.value)}
                  placeholder="San Francisco, CA (or Remote)"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="text"
                  className="form-input"
                  value={exp.startDate}
                  onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                  placeholder="2021-03 or Mar 2021"
                />
              </div>

              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="text"
                  className="form-input"
                  disabled={exp.current}
                  value={exp.current ? 'Present' : exp.endDate}
                  onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                  placeholder="Present"
                />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.375rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  <input
                    type="checkbox"
                    checked={exp.current || false}
                    onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
                  />
                  <span>Currently work here</span>
                </label>
              </div>
            </div>

            {/* Bullet Highlights */}
            <div className="form-group">
              <label className="form-label">Key Responsibilities & Achievements</label>
              <div className="bullet-list">
                {exp.highlights.map((bullet, bulletIdx) => (
                  <div key={bulletIdx} className="bullet-item">
                    <GripVertical size={16} style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      className="form-input"
                      value={bullet}
                      onChange={(e) => handleBulletChange(exp.id, bulletIdx, e.target.value)}
                      placeholder="Achieved X metric by implementing Y feature..."
                    />
                    <button
                      className="btn btn-secondary btn-icon-only"
                      onClick={() => handleRemoveBullet(exp.id, bulletIdx)}
                      title="Delete bullet"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => handleAddBullet(exp.id)}
                style={{ marginTop: '0.5rem', fontSize: '0.8125rem' }}
              >
                <Plus size={14} />
                <span>Add Achievement Bullet</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
