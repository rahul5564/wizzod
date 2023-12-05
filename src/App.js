import { filteredEvents } from './data/data';
import EventApp from "./pages/Event";

const App = () => {
  return <EventApp eventData={filteredEvents} />;
};



export default App;
