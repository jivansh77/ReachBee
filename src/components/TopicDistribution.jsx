import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useState } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function TopicDistribution({ topics, questions }) {
  const [expandedTopic, setExpandedTopic] = useState(null);
  
  const questionsByTopic = questions?.reduce((acc, q) => {
    if (!acc[q.topic]) {
      acc[q.topic] = [];
    }
    acc[q.topic].push(q);
    return acc;
  }, {}) || {};

  const data = {
    labels: Object.keys(topics),
    datasets: [{
      label: 'Questions',
      data: Object.values(topics),
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(76, 175, 80, 0.7)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(76, 175, 80, 1)',
      ],
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: false 
      },
      title: { 
        display: true, 
        text: 'Distribution of Questions by Topic',
        font: { size: 16, weight: 'bold' },
        padding: 20
      },
      tooltip: {
        callbacks: {
          label: (context) => `Number of questions: ${context.raw}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        },
        title: {
          display: true,
          text: 'Number of Questions',
          font: {
            weight: 'bold'
          }
        }
      },
      x: {
        ticks: {
          display: true,
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600">
        <h2 className="text-2xl font-bold text-white">Topic Distribution</h2>
      </div>
      
      <div className="p-6">
        <div className="h-[400px] mb-8">
          <Bar options={options} data={data} />
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Questions by Topic</h3>
          {Object.entries(questionsByTopic).map(([topic, topicQuestions]) => (
            <div key={topic} className="mb-4">
              <button
                className="w-full px-4 py-2 text-left flex justify-between items-center bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-150 ease-in-out"
                onClick={() => setExpandedTopic(expandedTopic === topic ? null : topic)}
              >
                <div className="flex-1 min-w-0 pr-4">
                  <span className="font-medium text-gray-700 block truncate">
                    {topic}
                  </span>
                </div>
                <div className="flex-shrink-0 whitespace-nowrap">
                  <span className="text-blue-500 font-semibold">
                    {topicQuestions.length} questions
                  </span>
                </div>
              </button>
              
              {expandedTopic === topic && (
                <div className="mt-2 pl-4 space-y-2">
                  {topicQuestions.map((q, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-md shadow-sm border border-gray-200">
                      <p className="text-gray-800">{q.text}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Type: {q.type}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}