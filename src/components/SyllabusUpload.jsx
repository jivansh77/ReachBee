import { useState } from 'react';

export default function SyllabusUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('syllabus', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload-syllabus', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload syllabus');
      }

      setSuccess(true);
      setFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs"
      />
      <button
        className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
        onClick={handleUpload}
        disabled={!file || loading}
      >
        {loading ? 'Uploading...' : 'Upload Syllabus'}
      </button>
      
      {success && (
        <div className="text-sm text-success">✓ Uploaded</div>
      )}
      
      {error && (
        <div className="text-sm text-error">{error}</div>
      )}
    </div>
  );
}
