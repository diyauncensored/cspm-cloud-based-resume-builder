import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function ProjectsForm({ projects, setProjects }) {
  const handleAddProject = () => {
    const newItem = {
      id: `proj-${Date.now()}`,
      name: '',
      role: '',
      link: '',
      description: '',
      technologies: []
    };
    setProjects(prev => [...prev, newItem]);
  };

  const handleRemoveProject = (id) => {
    setProjects(prev => prev.filter(item => item.id !== id));
  };

  const handleChange = (id, field, value) => {
    setProjects(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleTechChange = (id, text) => {
    const techArray = text.split(',').map(t => t.trim()).filter(Boolean);
    handleChange(id, 'technologies', techArray);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <div className="form-section-title">Projects & Portfolio</div>
          <div className="form-section-subtitle">Highlight notable projects, open-source work, or side applications</div>
        </div>
        <button className="btn btn-secondary" onClick={handleAddProject}>
          <Plus size={16} />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          No projects added yet. Click "Add Project" above.
        </div>
      ) : (
        projects.map((proj, index) => (
          <div key={proj.id} className="item-card">
            <div className="item-card-header">
              <span className="item-card-title">
                {proj.name || `Project #${index + 1}`} {proj.role ? `(${proj.role})` : ''}
              </span>
              <button 
                className="btn btn-secondary btn-icon-only" 
                onClick={() => handleRemoveProject(proj.id)}
                title="Remove project"
              >
                <Trash2 size={16} style={{ color: 'var(--danger)' }} />
              </button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={proj.name}
                  onChange={(e) => handleChange(proj.id, 'name', e.target.value)}
                  placeholder="DevPulse Analytics"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Role</label>
                <input
                  type="text"
                  className="form-input"
                  value={proj.role}
                  onChange={(e) => handleChange(proj.id, 'role', e.target.value)}
                  placeholder="Creator / Lead Architect"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Project URL / Link</label>
              <input
                type="text"
                className="form-input"
                value={proj.link}
                onChange={(e) => handleChange(proj.id, 'link', e.target.value)}
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={proj.description}
                onChange={(e) => handleChange(proj.id, 'description', e.target.value)}
                placeholder="Brief summary of what the project accomplishes and key tech used..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Technologies Used (comma separated)</label>
              <input
                type="text"
                className="form-input"
                value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || ''}
                onChange={(e) => handleTechChange(proj.id, e.target.value)}
                placeholder="React, TypeScript, Node.js, WebSockets"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
