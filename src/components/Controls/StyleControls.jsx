import React from 'react';
import { Layout, Type, Palette, MoveVertical, Image } from 'lucide-react';

const COLOR_PRESETS = [
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Emerald Green', hex: '#059669' },
  { name: 'Purple Dusk', hex: '#7c3aed' },
  { name: 'Crimson Red', hex: '#dc2626' },
  { name: 'Teal Cyan', hex: '#0d9488' },
  { name: 'Amber Gold', hex: '#d97706' },
  { name: 'Slate Dark', hex: '#334155' },
  { name: 'Midnight Violet', hex: '#4c1d95' }
];

const FONTS = [
  { name: 'Inter (Modern Sans)', value: 'Inter' },
  { name: 'Outfit (Clean Geometrical)', value: 'Outfit' },
  { name: 'Playfair Display (Executive Serif)', value: 'Playfair Display' },
  { name: 'Roboto (Classic Sans)', value: 'Roboto' },
  { name: 'Fira Code (Developer Tech)', value: 'Fira Code' }
];

export default function StyleControls({ styleSettings, setStyleSettings }) {
  const handleChange = (field, value) => {
    setStyleSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <div className="form-section-title">Resume Design & Formatting</div>
      <div className="form-section-subtitle">Customize the look, colors, fonts, and layout template of your generated PDF</div>

      {/* Template Picker */}
      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Layout size={16} />
          <span>Resume Template</span>
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {[
            { id: 'modern', label: 'Modern Minimalist', desc: 'Sleek top banner with accent highlights' },
            { id: 'executive', label: 'Executive Classic', desc: 'Traditional centered layout with serif header' },
            { id: 'creative', label: 'Creative Sidebar', desc: 'Dual-column layout with left sidebar' }
          ].map(tpl => (
            <button
              key={tpl.id}
              onClick={() => handleChange('template', tpl.id)}
              style={{
                padding: '0.875rem 0.625rem',
                borderRadius: 'var(--radius-md)',
                background: styleSettings.template === tpl.id ? 'var(--brand-glow)' : 'var(--bg-card)',
                border: `2px solid ${styleSettings.template === tpl.id ? 'var(--brand-primary)' : 'var(--border-color)'}`,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                {tpl.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {tpl.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Font Family */}
      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Type size={16} />
          <span>Typography Font</span>
        </label>
        <select
          className="form-select"
          value={styleSettings.fontFamily}
          onChange={(e) => handleChange('fontFamily', e.target.value)}
        >
          {FONTS.map(f => (
            <option key={f.value} value={f.value}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {/* Accent Color Palette */}
      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Palette size={16} />
          <span>Accent Color</span>
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '0.75rem' }}>
          {COLOR_PRESETS.map(c => (
            <button
              key={c.hex}
              onClick={() => handleChange('accentColor', c.hex)}
              title={c.name}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: c.hex,
                border: styleSettings.accentColor === c.hex ? '3px solid white' : '2px solid transparent',
                boxShadow: styleSettings.accentColor === c.hex ? '0 0 0 2px var(--brand-primary)' : 'none',
                cursor: 'pointer',
                transition: 'transform 0.15s ease'
              }}
            />
          ))}
          {/* Custom Color Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
            <input
              type="color"
              value={styleSettings.accentColor}
              onChange={(e) => handleChange('accentColor', e.target.value)}
              style={{
                width: '34px',
                height: '34px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
              title="Pick custom hex color"
            />
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Custom</span>
          </div>
        </div>
      </div>

      {/* Font Size & Spacing Tuning */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Type size={14} />
            <span>Font Scaling</span>
          </label>
          <select
            className="form-select"
            value={styleSettings.fontSize}
            onChange={(e) => handleChange('fontSize', e.target.value)}
          >
            <option value="small">Small (Dense)</option>
            <option value="medium">Medium (Standard)</option>
            <option value="large">Large (Spacious)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <MoveVertical size={14} />
            <span>Section Spacing</span>
          </label>
          <select
            className="form-select"
            value={styleSettings.spacing}
            onChange={(e) => handleChange('spacing', e.target.value)}
          >
            <option value="compact">Compact (Fit more content)</option>
            <option value="normal">Normal</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>
      </div>

      {/* Show Profile Photo Toggle */}
      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={styleSettings.showPhoto || false}
            onChange={(e) => handleChange('showPhoto', e.target.checked)}
          />
          <Image size={16} />
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Show Profile Photo in Preview (if URL provided)</span>
        </label>
      </div>
    </div>
  );
}
