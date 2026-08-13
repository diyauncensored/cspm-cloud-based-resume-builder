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
    <div>
      <div className="form-section-title">Personal Details</div>
      <div className="form-section-subtitle">Add your contact and basic profile information</div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            name="fullName"
            value={personalInfo.fullName || ''}
            onChange={handleChange}
            placeholder="e.g. Alex Morgan"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Job Title / Headline</label>
          <input
            type="text"
            className="form-input"
            name="jobTitle"
            value={personalInfo.jobTitle || ''}
            onChange={handleChange}
            placeholder="e.g. Senior Software Engineer"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            name="email"
            value={personalInfo.email || ''}
            onChange={handleChange}
            placeholder="alex@example.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-input"
            name="phone"
            value={personalInfo.phone || ''}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Location (City, Country)</label>
          <input
            type="text"
            className="form-input"
            name="location"
            value={personalInfo.location || ''}
            onChange={handleChange}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Personal Website / Portfolio</label>
          <input
            type="text"
            className="form-input"
            name="website"
            value={personalInfo.website || ''}
            onChange={handleChange}
            placeholder="alexmorgan.dev"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">LinkedIn Profile</label>
          <input
            type="text"
            className="form-input"
            name="linkedin"
            value={personalInfo.linkedin || ''}
            onChange={handleChange}
            placeholder="linkedin.com/in/alexmorgan"
          />
        </div>

        <div className="form-group">
          <label className="form-label">GitHub Profile</label>
          <input
            type="text"
            className="form-input"
            name="github"
            value={personalInfo.github || ''}
            onChange={handleChange}
            placeholder="github.com/alexmorgan"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Profile Photo URL (Optional)</label>
        <input
          type="text"
          className="form-input"
          name="photoUrl"
          value={personalInfo.photoUrl || ''}
          onChange={handleChange}
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Professional Summary</label>
        <textarea
          className="form-textarea"
          name="summary"
          rows={4}
          value={personalInfo.summary || ''}
          onChange={handleChange}
          placeholder="Write 2-4 sentences summarizing your career achievements, core skills, and background..."
        />
      </div>
    </div>
  );
}
