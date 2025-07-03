import { useState } from "react";
import AddEvent from './components/addEvent/addEvent';
import EventsList from './components/eventsList/eventsList';
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';

function App() {
  const mockData = [{
    startTime: new Date("December 25, 2024 8:30:00"),
    endTime: new Date("December 25, 2024 10:30:00"),
    title: "Event 1"
  }, {
    startTime: new Date("December 25, 2024 11:30:00"),
    endTime: new Date("December 25, 2024 12:30:00"),
    title: "Event 2"
  }, {
    startTime: new Date("December 25, 2024 13:30:00"),
    endTime: new Date("December 25, 2024 15:30:00"),
    title: "Event 3"
  }]
  const [events, setEvents] = useState(mockData);
  return (
    <BrowserRouter>
      <main className="App">
      <Routes>
        <Route path="/" element={<>
          <EventsList events={events}/>
          <AddEvent/>
        </>} />
        <Route path="/add-event" element={
          <div>This is where Add Event Page goes</div>
        }/>
      </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
