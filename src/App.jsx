import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EditorTabs from './components/Editor/EditorTabs';
import PersonalInfoForm from './components/Editor/PersonalInfoForm';
import ExperienceForm from './components/Editor/ExperienceForm';
import EducationForm from './components/Editor/EducationForm';
import SkillsForm from './components/Editor/SkillsForm';
import ProjectsForm from './components/Editor/ProjectsForm';
import CustomForm from './components/Editor/CustomForm';
import StyleControls from './components/Controls/StyleControls';
import ResumePreview from './components/Preview/ResumePreview';
import { sampleResume, defaultStyleSettings } from './data/sampleResume';
import { useLocalStorage } from './hooks/useLocalStorage';
import { FileEdit, Eye } from 'lucide-react';

const emptyResume = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photoUrl: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: []
};

export default function App() {
  const [saveStatus, setSaveStatus] = useState('saved');
  const [activeTab, setActiveTab] = useState('personal');
  const [mobileTab, setMobileTab] = useState('editor'); // 'editor' | 'preview'

  const [resumeData, setResumeData] = useLocalStorage(
    'resume_builder_data_v1', 
    sampleResume, 
    (status) => setSaveStatus(status)
  );

  const [styleSettings, setStyleSettings] = useLocalStorage(
    'resume_builder_style_v1', 
    defaultStyleSettings,
    () => {}
  );

  // Apply dark/light theme to body or wrapper
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', styleSettings.darkMode ? 'dark' : 'light');
  }, [styleSettings.darkMode]);

  const handleLoadSample = () => {
    if (window.confirm("Pre-fill with sample resume data? Any existing edits will be replaced.")) {
      setResumeData(sampleResume);
      setStyleSettings(defaultStyleSettings);
    }
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to clear all resume data?")) {
      setResumeData(emptyResume);
    }
  };

  // Helper state updater setters
  const setPersonalInfo = (updater) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: typeof updater === 'function' ? updater(prev.personalInfo) : updater
    }));
  };

  const setExperience = (updater) => {
    setResumeData(prev => ({
      ...prev,
      experience: typeof updater === 'function' ? updater(prev.experience) : updater
    }));
  };

  const setEducation = (updater) => {
    setResumeData(prev => ({
      ...prev,
      education: typeof updater === 'function' ? updater(prev.education) : updater
    }));
  };

  const setSkills = (updater) => {
    setResumeData(prev => ({
      ...prev,
      skills: typeof updater === 'function' ? updater(prev.skills) : updater
    }));
  };

  const setProjects = (updater) => {
    setResumeData(prev => ({
      ...prev,
      projects: typeof updater === 'function' ? updater(prev.projects) : updater
    }));
  };

  const setCertifications = (updater) => {
    setResumeData(prev => ({
      ...prev,
      certifications: typeof updater === 'function' ? updater(prev.certifications) : updater
    }));
  };

  const setLanguages = (updater) => {
    setResumeData(prev => ({
      ...prev,
      languages: typeof updater === 'function' ? updater(prev.languages) : updater
    }));
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm personalInfo={resumeData.personalInfo} setPersonalInfo={setPersonalInfo} />;
      case 'experience':
        return <ExperienceForm experience={resumeData.experience || []} setExperience={setExperience} />;
      case 'education':
        return <EducationForm education={resumeData.education || []} setEducation={setEducation} />;
      case 'skills':
        return <SkillsForm skills={resumeData.skills || []} setSkills={setSkills} />;
      case 'projects':
        return <ProjectsForm projects={resumeData.projects || []} setProjects={setProjects} />;
      case 'custom':
        return (
          <CustomForm 
            certifications={resumeData.certifications || []} 
            setCertifications={setCertifications}
            languages={resumeData.languages || []}
            setLanguages={setLanguages}
          />
        );
      case 'styling':
        return <StyleControls styleSettings={styleSettings} setStyleSettings={setStyleSettings} />;
      default:
        return <PersonalInfoForm personalInfo={resumeData.personalInfo} setPersonalInfo={setPersonalInfo} />;
    }
  };

  return (
    <div className="app-container">
      {/* Skip link for keyboard users */}
      <a className="skip-link" href="#main-editor">
        Skip to editor
      </a>

      <Header 
        resumeData={resumeData}
        setResumeData={setResumeData}
        styleSettings={styleSettings}
        setStyleSettings={setStyleSettings}
        saveStatus={saveStatus}
        onLoadSample={handleLoadSample}
        onResetData={handleResetData}
      />

      <main className="app-main" role="main" aria-label="Resume builder workspace">
        {/* Editor Pane (Left) */}
        <section 
          id="main-editor"
          className={`editor-pane ${mobileTab === 'preview' ? 'hide-mobile' : ''}`}
          aria-label="Resume editor"
        >
          <EditorTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="editor-content">
            {renderActiveTabContent()}
          </div>
        </section>

        {/* Live Preview Pane (Right) */}
        <section 
          className={`preview-pane ${mobileTab === 'editor' ? 'hide-mobile' : ''}`}
          aria-label="Resume live preview"
        >
          <ResumePreview resumeData={resumeData} styleSettings={styleSettings} />
        </section>
      </main>

      {/* Mobile Switcher Bar */}
      <nav className="mobile-view-toggle" role="navigation" aria-label="View switcher">
        <button 
          className={`btn ${mobileTab === 'editor' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMobileTab('editor')}
          aria-current={mobileTab === 'editor' ? 'true' : undefined}
          aria-label="Show resume editor"
        >
          <FileEdit size={16} aria-hidden="true" />
          <span>Editor</span>
        </button>
        <button 
          className={`btn ${mobileTab === 'preview' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMobileTab('preview')}
          aria-current={mobileTab === 'preview' ? 'true' : undefined}
          aria-label="Show live preview"
        >
          <Eye size={16} aria-hidden="true" />
          <span>Live Preview</span>
        </button>
      </nav>
    </div>
  );
}

