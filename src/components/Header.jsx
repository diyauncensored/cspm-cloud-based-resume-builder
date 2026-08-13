import React, { useRef } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  Moon, 
  Sun, 
  FileUp, 
  FileDown,
  Check,
  RefreshCw
} from 'lucide-react';
import { exportToPdf, triggerNativePrint } from '../utils/pdfExport';

export default function Header({ 
  resumeData, 
  setResumeData, 
  styleSettings, 
  setStyleSettings, 
  saveStatus,
  onLoadSample,
  onResetData 
}) {
  const fileInputRef = useRef(null);

  const toggleTheme = () => {
    setStyleSettings(prev => ({
      ...prev,
      darkMode: !prev.darkMode
    }));
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resumeData.personalInfo.fullName || 'Resume'}_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && parsed.personalInfo) {
            setResumeData(parsed);
          } else {
            alert("Invalid resume JSON format.");
          }
        } catch (err) {
          alert("Error parsing JSON file.");
        }
      };
    }
  };

  const handleDownloadPdf = () => {
    const filename = `${resumeData.personalInfo.fullName || 'Resume'}_CV.pdf`;
    exportToPdf('resume-preview-canvas', filename);
  };

  return (
    <header className="app-header">
      <div className="brand-logo">
        <div className="brand-icon">
          <FileText size={20} />
        </div>
        <span>ResumeCraft</span>
      </div>

      <div className="header-actions">
        {/* Auto save badge */}
        <div className={`save-status-badge ${saveStatus === 'saved' ? 'saved' : ''}`}>
          {saveStatus === 'saved' ? (
            <>
              <Check size={14} />
              <span>Draft Saved</span>
            </>
          ) : (
            <>
              <RefreshCw size={14} className="spin" />
              <span>Saving...</span>
            </>
          )}
        </div>

        {/* Load Sample Data */}
        <button 
          className="btn btn-secondary" 
          onClick={onLoadSample}
          title="Pre-fill form with realistic sample resume data"
        >
          <Sparkles size={16} />
          <span className="hide-mobile">Sample Data</span>
        </button>

        {/* JSON Backup & Restore */}
        <button 
          className="btn btn-secondary btn-icon-only" 
          onClick={handleExportJson}
          title="Export resume data as JSON file"
        >
          <FileDown size={16} />
        </button>

        <button 
          className="btn btn-secondary btn-icon-only" 
          onClick={() => fileInputRef.current?.click()}
          title="Import resume data from JSON file"
        >
          <FileUp size={16} />
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept=".json" 
          onChange={handleImportJson} 
        />

        {/* Reset */}
        <button 
          className="btn btn-secondary btn-icon-only" 
          onClick={onResetData}
          title="Clear all fields"
        >
          <RotateCcw size={16} />
        </button>

        {/* Dark/Light mode toggle */}
        <button 
          className="btn btn-secondary btn-icon-only" 
          onClick={toggleTheme}
          title="Toggle light/dark editor mode"
        >
          {styleSettings.darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Print (Native Vector PDF) */}
        <button 
          className="btn btn-secondary" 
          onClick={triggerNativePrint}
          title="Print or save vector PDF using browser print dialog"
        >
          <Printer size={16} />
          <span className="hide-mobile">Print</span>
        </button>

        {/* Direct Download PDF */}
        <button 
          className="btn btn-primary" 
          onClick={handleDownloadPdf}
          title="Download PDF directly"
        >
          <Download size={16} />
          <span>Download PDF</span>
        </button>
      </div>
    </header>
  );
}
