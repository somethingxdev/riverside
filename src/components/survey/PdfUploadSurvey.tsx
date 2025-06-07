import React, { useState, useCallback } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UploadCloudIcon, FileTextIcon, XIcon } from 'lucide-react'; // Assuming you have lucide-react for icons

interface PdfUploadSurveyProps {
  onNext: (file?: File) => void;
}

const PdfUploadSurvey: React.FC<PdfUploadSurveyProps> = ({ onNext }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type === 'application/pdf') {
        setSelectedFile(event.target.files[0]);
      } else {
        alert('Please select a PDF file.');
      }
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      if (event.dataTransfer.files[0].type === 'application/pdf') {
        setSelectedFile(event.dataTransfer.files[0]);
      } else {
        alert('Please select a PDF file.');
      }
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const removeFile = () => {
    setSelectedFile(null);
    // Also reset the input field value if it's still holding the file reference
    const fileInput = document.getElementById('pdf-upload-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <>
      <DialogHeader className="mb-6">
        <DialogTitle className="text-4xl md:text-5xl font-heading leading-none uppercase">UPLOAD YOUR HOUSE PLAN</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col items-center w-full">
        {!selectedFile ? (
          <label
            htmlFor="pdf-upload-input"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors 
                        ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloudIcon className={`w-10 h-10 mb-3 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
              <p className={`mb-2 text-sm ${isDragging ? 'text-primary' : 'text-gray-500'}`}>
                Drag & drop or <span className="font-semibold text-primary">click to upload</span>
              </p>
              <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
            </div>
            <input id="pdf-upload-input" type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
          </label>
        ) : (
          <div className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-between">
            <div className="flex items-center">
              <FileTextIcon className="size-7 text-primary mr-3 shrink-0" />
              <span className="text-sm text-gray-700 truncate" title={selectedFile.name}>
                {selectedFile.name}
              </span>
            </div>
            <button onClick={removeFile} className="text-gray-500 hover:text-red-500 ml-2 shrink-0">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        <button onClick={() => onNext(selectedFile || undefined)} className="survey-button disabled:opacity-50 disabled:cursor-not-allowed w-full mt-8 max-w-sm" disabled={!selectedFile}>
          NEXT
        </button>
      </div>
    </>
  );
};

export default PdfUploadSurvey;
