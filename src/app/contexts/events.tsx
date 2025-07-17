import { createContext, useState, ReactNode } from 'react';
import EventInfo from '../models/event';

const defaultEvents:EventInfo[] = [{
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
}];

export type EventsContextType = {
  events: EventInfo[];
  setEvents: (events: EventInfo[]) => void;
};

export const EventsContext = createContext<EventsContextType>({
  events: defaultEvents,
  setEvents: () => console.warn('no events provided'), // Default fallback
});

type EventsProviderProps = {
  children: ReactNode;
};

export const EventsProvider = ({ children }: EventsProviderProps) => {
  const [events, setEvents] = useState<EventInfo[]>(defaultEvents);

  const contextValue: EventsContextType = {
    events,
    setEvents
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};