import { useState } from 'react'
import TopicDistribution from '../components/TopicDistribution'
import AnalysisSummary from '../components/AnalysisSummary'
import QuestionsList from '../components/QuestionsList'
import FileUpload from '../components/FileUpload'
import ProgressBar from '../components/ProgressBar'
import SyllabusUpload from '../components/SyllabusUpload'

export default function Documents() {
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleFileUpload = async (files) => {
    setLoading(true)
    setError(null)
    setProgress(0)
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 15
      })
    }, 500)
    
    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files[]', file))
      
      const response = await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Analysis failed')
      }
      
      const data = await response.json()
      setProgress(100)
      console.log('Received data:', data)
      
      const transformedData = {
        analysis: {
          topic_distribution: data.topic_distribution || {},
          all_questions: (data.questions || []).map(q => ({
            text: q.text,
            topic: q.topic,
            type: q.type
          })),
          repeated_questions: data.repeated_questions || [],
          question_clusters: data.similar_groups || []
        },
        summary: {
          total_questions: data.total_questions || 0,
          unique_topics: data.unique_topics || 0,
          similar_questions_count: data.similar_groups?.length || 0,
          repeated_questions_count: data.repeated_questions?.length || 0,
          top_topics: Object.fromEntries(
            Object.entries(data.topic_distribution || {})
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
          ),
          patterns: data.patterns || []
        }
      }
      
      console.log('Transformed data:', transformedData)
      setAnalysisData(transformedData)
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      clearInterval(progressInterval)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Document Analysis</h1>
          <SyllabusUpload />
        </div>
        
        <div className="bg-base-100 rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upload Papers</h2>
          <FileUpload onUpload={handleFileUpload} />
        </div>
        
        {loading && (
          <div className="flex flex-col items-center justify-center mb-8 bg-base-100 rounded-xl shadow-lg p-6">
            <ProgressBar 
              progress={Math.min(Math.round(progress), 100)} 
              status={progress === 100 ? "Processing complete" : "Processing papers..."} 
            />
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        {analysisData && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnalysisSummary summary={analysisData.summary} />
              <TopicDistribution 
                topics={analysisData.analysis.topic_distribution} 
                questions={analysisData.analysis.all_questions}
              />
            </div>
            <QuestionsList 
              questions={analysisData.analysis.repeated_questions}
              allQuestions={analysisData.analysis.all_questions}
              clusters={analysisData.analysis.question_clusters} 
            />
          </div>
        )}
      </div>
    </div>
  )
}