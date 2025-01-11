export default function AnalysisSummary({ summary }) {
  if (!summary) return null;

  // Get top 3 topics
  const topThreeTopics = Object.entries(summary.top_topics || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600">
        <h2 className="text-2xl font-bold text-white">Analysis Summary</h2>
      </div>
      
      <div className="p-6">
        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-600 mb-1">Total Questions</p>
            <p className="text-3xl font-bold text-blue-800">{summary.total_questions || 0}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-sm text-purple-600 mb-1">Similar Questions</p>
            <p className="text-3xl font-bold text-purple-800">
              {summary.similar_questions_count || 0}
            </p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 text-center">
            <p className="text-sm text-indigo-600 mb-1">Repeated Questions</p>
            <p className="text-3xl font-bold text-indigo-800">
              {summary.repeated_questions_count || 0}
            </p>
          </div>
        </div>

        {/* Unique Topics */}
        <div className="mb-8">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm text-green-600 mb-1">Unique Topics</p>
              <p className="text-3xl font-bold text-green-800">{summary.unique_topics || 0}</p>
            </div>
          </div>
        </div>

        {/* Top Topics */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Top Topics</h3>
          <div className="grid grid-cols-1 gap-3">
            {topThreeTopics.map(([topic], index) => (
              <div 
                key={topic} 
                className="flex items-center bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm"
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-800 rounded-full mr-4">
                  <span className="text-sm font-bold">#{index + 1}</span>
                </div>
                <div className="flex-grow">
                  <p className="text-lg font-semibold text-gray-800 break-words">
                    {topic}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Patterns */}
        {summary.patterns && summary.patterns.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Identified Patterns</h3>
            <ul className="space-y-2">
              {summary.patterns.map((pattern, index) => (
                <li 
                  key={index} 
                  className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 border border-yellow-100 hover:bg-yellow-100 transition-colors"
                >
                  {pattern}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}