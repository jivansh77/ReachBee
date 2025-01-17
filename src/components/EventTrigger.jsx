import React, { useState, useEffect } from "react";

// Your Modal Component
const TrendingEventModal = ({ event, closeModal }) => {
  if (!event) return null; // Prevent rendering if event is not yet fetched

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

const App = () => {
  const [eventData, setEventData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchTrendingEvent = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/trending-events/");
        const data = await response.json();
        if (data && data.length > 0) {
          setEventData(data[0]); // Get the first event (highest trending score)
        }
      } catch (error) {
        console.error("Error fetching trending events:", error);
      }
    };

    fetchTrendingEvent();
  }, []);

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Event Dashboard</h1>
      <button onClick={openModal}>Show Top Event</button>

      {isModalOpen && (
        <TrendingEventModal event={eventData} closeModal={closeModal} />
      )}
    </div>
  );
};

export default App;
