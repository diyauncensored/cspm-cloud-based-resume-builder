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

  const handleDownloadPdf = async () => {
    const element = document.getElementById('resume-preview-canvas');
    if (!element) {
      alert('Resume preview not found. Please make sure the preview is visible.');
      return;
    }

    // Build a safe filename
    const rawName = resumeData.personalInfo.fullName || 'Resume';
    const safeName = rawName.replace(/[^a-zA-Z0-9_\-]/g, '_');
    const pdfFilename = safeName + '_CV.pdf';

    try {
      // Dynamically import to avoid any caching issues
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default;
      const jspdfModule = await import('jspdf');
      const jsPDF = jspdfModule.jsPDF;

      // Render the preview element to a high-res canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfPageHeight;

      while (heightLeft > 5) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfPageHeight;
      }

      // Get raw arraybuffer, build Blob with explicit MIME type
      const arrayBuf = pdf.output('arraybuffer');
      const blob = new Blob([arrayBuf], { type: 'application/pdf' });

      // Create object URL and download via anchor element
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = pdfFilename;
      a.type = 'application/pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();

      // Cleanup after a short delay
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 500);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('PDF generation failed. Falling back to browser print.');
      window.print();
    }
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
          onClick={() => window.print()}
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
