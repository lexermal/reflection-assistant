import React, { useState } from "react"
import { analyzeCSV, Entry } from './analyseDate';
import { FaUpload } from "react-icons/fa6";

export interface FileUploadProps {
  setFileContent: (lines: Entry[]) => void;
}


export function FileUpload({ setFileContent }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = analyzeCSV(text);
        setFileContent(lines);
      };
      reader.onerror = () => {
        setError('Error reading file');
      };
      reader.readAsText(file);
    } else {
      setError('Please upload a valid CSV file');
    }
  };

  return <div className='bg-blue-300 w-2/5 mt-7 mx-auto p-6 rounded-xl mb-10 cursor-pointer border-dashed border-4 border-spacing-8 border-purple-900 '>
    <input id="fileUPLOAD" type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
    <label htmlFor="fileUPLOAD">
      <div className='small'>
        <div className='text-center flex flex-row'>
          <FaUpload className='w-14 h-6' />
          <span>Upload your Dailio backup.</span>
        </div>
      </div>
    </label>
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </div>

}