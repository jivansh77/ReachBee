import { useState } from 'react'
import jsPDF from 'jspdf'

export default function QuestionsList({ questions = [], allQuestions = [], clusters = [] }) {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedCluster, setSelectedCluster] = useState(null)
  // Get unique repeated questions count
  const uniqueRepeatedCount = new Set(questions.map(q => q.question)).size;

  const downloadPDF = (data, title) => {
    const doc = new jsPDF()
    let yPos = 20
    const pageWidth = doc.internal.pageSize.width
    const margin = 20
    const maxWidth = pageWidth - (margin * 2)
    const seenQuestions = new Set() // Track seen questions

    // Add title
    doc.setFontSize(16)
    doc.text(title, margin, yPos)
    yPos += 15

    // Reset font size for content
    doc.setFontSize(12)
    let questionNumber = 1

    data.forEach((item) => {
      // Check if we need a new page
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }

      const mainQuestion = item.text || item.question || item
      
      // Skip if we've seen this question before
      if (seenQuestions.has(mainQuestion)) {
        return
      }

      // Add main question to seen set
      seenQuestions.add(mainQuestion)

      // Print main question
      const questionText = `${questionNumber}. ${mainQuestion}`
      const splitQuestion = doc.splitTextToSize(questionText, maxWidth)
      doc.text(splitQuestion, margin, yPos)
      yPos += (splitQuestion.length * 7)

      // If there are similar questions, add them below
      if (item.similar && item.similar.length > 0) {
        doc.setFontSize(10)
        doc.setTextColor(128, 128, 128) // Grey color

        item.similar.forEach(similarQ => {
          // Skip if we've seen this similar question before
          if (!seenQuestions.has(similarQ)) {
            seenQuestions.add(similarQ)
            const splitSimilar = doc.splitTextToSize(similarQ, maxWidth - 10)
            doc.text(splitSimilar, margin + 5, yPos)
            yPos += (splitSimilar.length * 5)
          }
        })

        // Reset text properties
        doc.setFontSize(12)
        doc.setTextColor(0, 0, 0) // Back to black
      }
      
      yPos += 8 // Reduced space between questions
      questionNumber++
    })

    doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`)
  }

  const renderDownloadButton = (data, title) => (
    <button
      onClick={() => downloadPDF(data, title)}
      className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Download {title} PDF
    </button>
  )

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-teal-600">
        <h2 className="text-2xl font-bold text-white">Question Analysis</h2>
      </div>
      
      <div className="p-6">
        <div className="flex space-x-4 mb-6">
          {['all', 'repeated', 'clusters'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg transition duration-150 ease-in-out ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'all' && `All (${allQuestions.length})`}
              {tab === 'repeated' && `Repeated (${uniqueRepeatedCount})`}
              {tab === 'clusters' && `Similar (${clusters.length})`}
            </button>
          ))}
        </div>

        {activeTab === 'all' && allQuestions.length === 0 && (
          <p className="text-gray-500 text-center py-8">No questions found</p>
        )}

        {activeTab === 'all' && allQuestions.length > 0 && (
          <div>
            <div className="space-y-4">
              {allQuestions.map((question, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                  <p className="font-medium text-gray-800">{question.text || question.question}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm text-gray-500">Topic: {question.topic}</p>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {question.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {renderDownloadButton(allQuestions, 'All Questions')}
          </div>
        )}

        {activeTab === 'repeated' && questions.length === 0 && (
          <p className="text-gray-500 text-center py-8">No repeated questions found</p>
        )}

        {activeTab === 'repeated' && questions.length > 0 && (
          <div>
            <div className="space-y-4">
              {questions.reduce((filteredQuestions, question) => {
                const isDuplicate = filteredQuestions.some(
                  q => q.question === question.question
                );

                if (!isDuplicate) {
                  return [...filteredQuestions, question];
                }
                return filteredQuestions;
              }, []).map((question, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                  <p className="font-medium text-gray-800">{question.question}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm text-gray-500">Topic: {question.topic}</p>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {question.type}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Frequency: {question.frequency}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {renderDownloadButton(questions, 'Repeated Questions')}
          </div>
        )}

        {activeTab === 'clusters' && clusters.length > 0 && (
          <div>
            <div className="space-y-4">
              {clusters.reduce((filteredClusters, cluster, index) => {
                const previousQuestions = new Set(
                  filteredClusters.flatMap(c => c.all_questions || [])
                );
                
                const hasNewQuestions = ![cluster.main_question, ...cluster.similar_questions]
                  .every(q => previousQuestions.has(q));

                if (hasNewQuestions) {
                  const filteredSimilarQuestions = cluster.similar_questions
                    .filter(q => !previousQuestions.has(q));

                  return [...filteredClusters, {
                    ...cluster,
                    similar_questions: filteredSimilarQuestions
                  }];
                }
                return filteredClusters;
              }, []).map((cluster, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                  <div 
                    className="cursor-pointer"
                    onClick={() => setSelectedCluster(selectedCluster === index ? null : index)}
                  >
                    <p className="font-medium text-gray-800">{cluster.main_question}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-sm text-gray-500">Topic: {cluster.topic}</p>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        Similar: {cluster.similar_questions.length}
                      </span>
                    </div>
                  </div>
                  
                  {selectedCluster === index && (
                    <div className="mt-4 pl-4 border-l-2 border-blue-200 space-y-3">
                      {cluster.similar_questions.map((question, sIndex) => (
                        <div key={sIndex} className="text-sm text-gray-700 p-2 bg-gray-50 rounded-md">
                          <p>{question}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {renderDownloadButton(
              clusters.map(cluster => ({
                text: cluster.main_question,
                similar: cluster.similar_questions
              })),
              'Similar Questions'
            )}
          </div>
        )}
      </div>
    </div>
  )
}