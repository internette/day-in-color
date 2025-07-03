import AddEvent from './components/addEvent/addEvent';
import EventsList from './components/eventsList/eventsList';
import './App.css';

function App() {
  return (
    <main className="App">
      <EventsList />
      <AddEvent/>
    </main>
  );
}

export default App;
