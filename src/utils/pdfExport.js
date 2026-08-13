import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';

/**
 * Bulletproof Client-Side PDF Export Utility
 * Explicitly constructs ArrayBuffer -> Blob({ type: 'application/pdf' }) -> File(cleanFilename)
 * to guarantee that Chrome, Edge, and mobile browsers receive exact MIME type and .pdf filename.
 */
export const exportToPdf = async (elementId, filename = 'Resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found.`);
    return false;
  }

  // Ensure clean filename ending with .pdf
  let cleanFilename = (filename || 'Resume.pdf').trim();
  cleanFilename = cleanFilename.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
  if (!cleanFilename.toLowerCase().endsWith('.pdf')) {
    cleanFilename += '.pdf';
  }

  try {
    // Capture element into canvas at 2x resolution
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = pdfHeight;
    let position = 0;

    // First Page
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Additional Pages
    while (heightLeft >= 5) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    // 1. Get raw binary ArrayBuffer from jsPDF
    const pdfArrayBuffer = pdf.output('arraybuffer');

    // 2. Explicitly construct Blob with application/pdf MIME type
    const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });

    // 3. Explicitly construct File object with cleanFilename metadata
    const pdfFile = new File([pdfBlob], cleanFilename, { type: 'application/pdf' });

    // 4. Trigger download with FileSaver.js saveAs
    try {
      saveAs(pdfFile, cleanFilename);
    } catch (err) {
      // Fallback DOM anchor download with explicit data-downloadurl
      const fileUrl = URL.createObjectURL(pdfFile);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = cleanFilename;
      link.setAttribute('download', cleanFilename);
      link.dataset.downloadurl = ['application/pdf', cleanFilename, fileUrl].join(':');
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) link.parentNode.removeChild(link);
        URL.revokeObjectURL(fileUrl);
      }, 1000);
    }

    return true;
  } catch (error) {
    console.error('Error generating PDF with jsPDF:', error);
    window.print();
    return false;
  }
};

/**
 * Native Browser Vector PDF Print Utility
 * Triggers native browser print formatted with @media print CSS
 */
export const triggerNativePrint = () => {
  window.print();
};
