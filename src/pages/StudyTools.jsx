import React, { useState } from 'react';
import { Upload, ZoomIn, ZoomOut } from 'lucide-react';

const ConceptMap = () => {
  const [concepts, setConcepts] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze PDF');
      }

      const data = await response.json();
      setConcepts(data.concepts);
      setRelationships(data.relationships);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Upload Section */}
      <div className="mb-8">
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="h-12 w-12 text-gray-400 mb-2" />
            <span className="text-gray-600">Upload your PDF notes</span>
            <span className="text-blue-500">Click to browse</span>
          </label>
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Analyzing PDF and generating concept map...</p>
        </div>
      )}

      {/* Concept Map */}
      {concepts.length > 0 && (
        <div className="border rounded-lg p-4">
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={zoomOut}
              className="p-2 rounded hover:bg-gray-100"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <button
              onClick={zoomIn}
              className="p-2 rounded hover:bg-gray-100"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
          </div>
          
          <div className="overflow-auto border rounded-lg"
               style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}>
            <svg
              width="1200"
              height={Math.max(800, concepts.length * 100)}
              viewBox={`0 0 1200 ${Math.max(800, concepts.length * 100)}`}
              className="concept-map"
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#2563EB" />
                </marker>
              </defs>
              
              {/* Draw relationships */}
              {relationships.map((rel, index) => {
                const sourceIndex = concepts.indexOf(rel.source);
                const targetIndex = concepts.indexOf(rel.target);
                const sourceX = 200 + (sourceIndex % 3) * 400;
                const sourceY = 100 + Math.floor(sourceIndex / 3) * 150;
                const targetX = 200 + (targetIndex % 3) * 400;
                const targetY = 100 + Math.floor(targetIndex / 3) * 150;
                
                return (
                  <g key={`rel-${index}`}>
                    <path
                      d={`M ${sourceX} ${sourceY} Q ${(sourceX + targetX)/2} ${(sourceY + targetY)/2 - 50} ${targetX} ${targetY}`}
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  </g>
                );
              })}
              
              {/* Draw concepts */}
              {concepts.map((concept, index) => {
                const x = 200 + (index % 3) * 400;
                const y = 100 + Math.floor(index / 3) * 150;
                
                return (
                  <g key={`concept-${index}`}>
                    <rect
                      x={x - 100}
                      y={y - 25}
                      width="200"
                      height="50"
                      rx="25"
                      fill="#EFF6FF"
                      stroke="#2563EB"
                      strokeWidth="2"
                    />
                    <text
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      className="text-sm font-medium"
                      fill="#1E3A8A"
                    >
                      {concept.length > 25 ? concept.substring(0, 25) + '...' : concept}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConceptMap;