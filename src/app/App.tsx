import AddEvent from './components/addEvent/addEvent';
import EventsList from './components/eventsList/eventsList';
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main className="App">
      <Routes>
        <Route path="/" element={<>
          <EventsList />
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
