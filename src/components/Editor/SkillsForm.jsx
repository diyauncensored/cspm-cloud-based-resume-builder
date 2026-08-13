import React from 'react';
import { Plus, Trash2, X } from 'lucide-react';

export default function SkillsForm({ skills, setSkills }) {
  const handleAddCategory = () => {
    const newCat = {
      id: `sk-${Date.now()}`,
      category: 'Technical Skills',
      items: ['JavaScript', 'React']
    };
    setSkills(prev => [...prev, newCat]);
  };

  const handleRemoveCategory = (id) => {
    setSkills(prev => prev.filter(item => item.id !== id));
  };

  const handleCategoryNameChange = (id, newName) => {
    setSkills(prev => prev.map(cat => cat.id === id ? { ...cat, category: newName } : cat));
  };

  const handleAddItem = (catId, newItemText) => {
    if (!newItemText.trim()) return;
    setSkills(prev => prev.map(cat => {
      if (cat.id === catId) {
        // Prevent duplicate tags
        if (!cat.items.includes(newItemText.trim())) {
          return { ...cat, items: [...cat.items, newItemText.trim()] };
        }
      }
      return cat;
    }));
  };

  const handleRemoveItem = (catId, itemIndex) => {
    setSkills(prev => prev.map(cat => {
      if (cat.id === catId) {
        return { ...cat, items: cat.items.filter((_, idx) => idx !== itemIndex) };
      }
      return cat;
    }));
  };

  const handleCommaSeparatedInput = (catId, text) => {
    const tags = text.split(',').map(t => t.trim()).filter(Boolean);
    if (tags.length > 0) {
      setSkills(prev => prev.map(cat => {
        if (cat.id === catId) {
          const uniqueItems = Array.from(new Set([...cat.items, ...tags]));
          return { ...cat, items: uniqueItems };
        }
        return cat;
      }));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <div className="form-section-title">Skills & Technologies</div>
          <div className="form-section-subtitle">Group your core technical and professional competencies into categories</div>
        </div>
        <button className="btn btn-secondary" onClick={handleAddCategory}>
          <Plus size={16} />
          <span>Add Skill Category</span>
        </button>
      </div>

      {skills.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          No skills categories added. Click "Add Skill Category" above.
        </div>
      ) : (
        skills.map(cat => (
          <div key={cat.id} className="item-card">
            <div className="item-card-header">
              <div style={{ flex: 1, marginRight: '1rem' }}>
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={cat.category}
                  onChange={(e) => handleCategoryNameChange(cat.id, e.target.value)}
                  placeholder="e.g. Frontend, Backend, Tools"
                />
              </div>
              <button 
                className="btn btn-secondary btn-icon-only" 
                onClick={() => handleRemoveCategory(cat.id)}
                title="Remove category"
                style={{ marginTop: '1.25rem' }}
              >
                <Trash2 size={16} style={{ color: 'var(--danger)' }} />
              </button>
            </div>

            {/* Skills Pill Tags */}
            <div className="form-group">
              <label className="form-label">Skills (Type & press Enter or separate with commas)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {cat.items.map((skillItem, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      padding: '0.25rem 0.625rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--bg-surface-hover)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.8125rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {skillItem}
                    <X
                      size={14}
                      style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}
                      onClick={() => handleRemoveItem(cat.id, idx)}
                    />
                  </span>
                ))}
              </div>

              <input
                type="text"
                className="form-input"
                placeholder="Add skill (e.g. TypeScript, React) and press Enter..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddItem(cat.id, e.target.value);
                    e.target.value = '';
                  } else if (e.key === ',') {
                    e.preventDefault();
                    handleAddItem(cat.id, e.target.value);
                    e.target.value = '';
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value) {
                    handleCommaSeparatedInput(cat.id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
