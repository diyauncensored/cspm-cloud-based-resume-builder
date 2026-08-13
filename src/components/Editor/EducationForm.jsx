import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function EducationForm({ education, setEducation }) {
  const handleAddEducation = () => {
    const newItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: ''
    };
    setEducation(prev => [...prev, newItem]);
  };

  const handleRemoveEducation = (id) => {
    setEducation(prev => prev.filter(item => item.id !== id));
  };

  const handleChange = (id, field, value) => {
    setEducation(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <div className="form-section-title">Education</div>
          <div className="form-section-subtitle">Add your academic background and degrees</div>
        </div>
        <button className="btn btn-secondary" onClick={handleAddEducation}>
          <Plus size={16} />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          No education added yet. Click "Add Education" above.
        </div>
      ) : (
        education.map((edu, index) => (
          <div key={edu.id} className="item-card">
            <div className="item-card-header">
              <span className="item-card-title">
                {edu.degree || `Degree #${index + 1}`} {edu.institution ? `@ ${edu.institution}` : ''}
              </span>
              <button 
                className="btn btn-secondary btn-icon-only" 
                onClick={() => handleRemoveEducation(edu.id)}
                title="Remove education"
              >
                <Trash2 size={16} style={{ color: 'var(--danger)' }} />
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Degree / Certificate</label>
                <input
                  type="text"
                  className="form-input"
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                  placeholder="B.S. in Computer Science"
                />
              </div>

              <div className="form-group">
                <label className="form-label">University / Institution</label>
                <input
                  type="text"
                  className="form-input"
                  value={edu.institution}
                  onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                  placeholder="UC Berkeley"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={edu.location}
                  onChange={(e) => handleChange(edu.id, 'location', e.target.value)}
                  placeholder="Berkeley, CA"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="text"
                  className="form-input"
                  value={edu.startDate}
                  onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                  placeholder="2014-08"
                />
              </div>

              <div className="form-group">
                <label className="form-label">End / Graduation Date</label>
                <input
                  type="text"
                  className="form-input"
                  value={edu.endDate}
                  onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                  placeholder="2018-05"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">GPA (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  value={edu.gpa}
                  onChange={(e) => handleChange(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8 / 4.0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Honors / Distinctions (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  value={edu.honors}
                  onChange={(e) => handleChange(edu.id, 'honors', e.target.value)}
                  placeholder="Magna Cum Laude, Dean's List"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
