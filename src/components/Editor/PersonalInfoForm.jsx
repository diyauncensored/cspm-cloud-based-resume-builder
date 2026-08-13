import React from 'react';

export default function PersonalInfoForm({ personalInfo, setPersonalInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend className="form-section-title">Personal Details</legend>
      <div className="form-section-subtitle">Add your contact and basic profile information</div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="pi-fullName">Full Name</label>
          <input
            type="text"
            className="form-input"
            id="pi-fullName"
            name="fullName"
            autoComplete="name"
            value={personalInfo.fullName || ''}
            onChange={handleChange}
            placeholder="e.g. Alex Morgan"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="pi-jobTitle">Job Title / Headline</label>
          <input
            type="text"
            className="form-input"
            id="pi-jobTitle"
            name="jobTitle"
            autoComplete="organization-title"
            value={personalInfo.jobTitle || ''}
            onChange={handleChange}
            placeholder="e.g. Senior Software Engineer"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="pi-email">Email Address</label>
          <input
            type="email"
            className="form-input"
            id="pi-email"
            name="email"
            autoComplete="email"
            value={personalInfo.email || ''}
            onChange={handleChange}
            placeholder="alex@example.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="pi-phone">Phone Number</label>
          <input
            type="tel"
            className="form-input"
            id="pi-phone"
            name="phone"
            autoComplete="tel"
            value={personalInfo.phone || ''}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="pi-location">Location (City, Country)</label>
          <input
            type="text"
            className="form-input"
            id="pi-location"
            name="location"
            autoComplete="address-level2"
            value={personalInfo.location || ''}
            onChange={handleChange}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="pi-website">Personal Website / Portfolio</label>
          <input
            type="url"
            className="form-input"
            id="pi-website"
            name="website"
            autoComplete="url"
            value={personalInfo.website || ''}
            onChange={handleChange}
            placeholder="alexmorgan.dev"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="pi-linkedin">LinkedIn Profile</label>
          <input
            type="url"
            className="form-input"
            id="pi-linkedin"
            name="linkedin"
            value={personalInfo.linkedin || ''}
            onChange={handleChange}
            placeholder="linkedin.com/in/alexmorgan"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="pi-github">GitHub Profile</label>
          <input
            type="url"
            className="form-input"
            id="pi-github"
            name="github"
            value={personalInfo.github || ''}
            onChange={handleChange}
            placeholder="github.com/alexmorgan"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="pi-photoUrl">Profile Photo URL (Optional)</label>
        <input
          type="url"
          className="form-input"
          id="pi-photoUrl"
          name="photoUrl"
          value={personalInfo.photoUrl || ''}
          onChange={handleChange}
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="pi-summary">Professional Summary</label>
        <textarea
          className="form-textarea"
          id="pi-summary"
          name="summary"
          rows={4}
          value={personalInfo.summary || ''}
          onChange={handleChange}
          placeholder="Write 2-4 sentences summarizing your career achievements, core skills, and background..."
        />
      </div>
    </fieldset>
  );
}
