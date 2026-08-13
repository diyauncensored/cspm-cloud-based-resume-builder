import React from 'react';
import ModernTemplate from './Templates/ModernTemplate';
import ExecutiveTemplate from './Templates/ExecutiveTemplate';
import CreativeTemplate from './Templates/CreativeTemplate';

export default function ResumePreview({ resumeData, styleSettings }) {
  const getFontSizeClass = () => {
    if (styleSettings.fontSize === 'small') return '13px';
    if (styleSettings.fontSize === 'large') return '16px';
    return '14.5px'; // medium
  };

  const renderTemplate = () => {
    switch (styleSettings.template) {
      case 'executive':
        return <ExecutiveTemplate resumeData={resumeData} styleSettings={styleSettings} />;
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} styleSettings={styleSettings} />;
      case 'modern':
      default:
        return <ModernTemplate resumeData={resumeData} styleSettings={styleSettings} />;
    }
  };

  return (
    <div className="preview-viewport">
      <div 
        id="resume-preview-canvas"
        className="a4-paper"
        style={{
          fontFamily: styleSettings.fontFamily || 'Inter',
          fontSize: getFontSizeClass(),
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
