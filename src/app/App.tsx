import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import EventsList from './components/eventsList/eventsList';
import AddEventButton from "./components/addEventButton/addEventButton";
import AddEvent from "./components/addEvent/addEvent";
import './App.css';

function App() {
  const generateTimeObj = (hrs:number, mins:number)=> {
    const mockDate = new Date();
    mockDate.setHours(hrs);
    mockDate.setMinutes(mins);
    return mockDate;
  }
  const mockData = [{
    startTime: generateTimeObj(8, 30),
    endTime: generateTimeObj(10, 30),
    title: "Event 1"
  }, {
    startTime: generateTimeObj(11, 30),
    endTime: generateTimeObj(12, 30),
    title: "Event 2"
  }, {
    startTime: generateTimeObj(13, 30),
    endTime: generateTimeObj(15, 30),
    title: "Event 3"
  }]
  const [events, setEvents] = useState(mockData);
  return (
    <BrowserRouter>
      <main className="App">
      <Routes>
        <Route path="/" element={<>
          <EventsList events={events}/>
          <AddEventButton/>
        </>} />
        <Route path="/add-event" element={<AddEvent events={events} setEvents={setEvents}/>}/>
      </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
