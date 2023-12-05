import React, { useState, useEffect } from 'react';
import './event.css';

const TimelineEvent = ({ event }) => (
  <div>
    <div>{event.title}</div>
    <div>
      {event.startTime} - {event.endTime}
    </div>
  </div>
);

const EventApp = ({ eventData }) => {
  const [events, setEvents] = useState(eventData);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({ title: '', startTime: '', endTime: '' });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    const id = events.length + 1;
    setEvents([...events, { ...newEvent, id }]);
    setNewEvent({ title: '', startTime: '', endTime: '' });
  };

  const navigateDay = (days) => {
    setCurrentDate((date) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    });
  };

  const filteredEvents = events.filter((event) =>
      new Date(event.startTime).toDateString() === currentDate.toDateString()
  );


  return (
    <div className="app">
        <h1>CALENDER</h1>
      <div className="header">
        <div>
        <button onClick={() => navigateDay(-1)}>Previous Day</button>
        </div>
        <h1>{currentDate.toDateString()}</h1>
        <div>
        <button onClick={() => navigateDay(1)}>Next Day</button>
        </div>
      </div>
      <div className="timeline">
        {filteredEvents.map((event) => (
          <TimelineEvent key={event.id} event={event} />
        ))}
      </div>
      <div className="add-event">
        <h2>Add New Event</h2>
        <div>
        <input
          type="text"
          placeholder="Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        </div>
        <div>
        <input
          type="datetime-local"
          value={newEvent.startTime}
          onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
        />
        </div>
        <div>
        <input
          type="datetime-local"
          value={newEvent.endTime}
          onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
        />
        </div>
        <button onClick={addEvent} className='event'>Add Event</button>
      </div>
    </div>
  );
};

export default EventApp;
