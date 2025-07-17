import { useContext } from "react"; 
import styles from "./eventsList.module.scss";
import Event from '../event/event';
import { EventsContext } from "../../contexts/events";

export default function EventsList(){
    const { events } = useContext(EventsContext);
    const totalEventsTime = events.reduce((accumulator, currentValue) => {
        return accumulator + ((currentValue.endTime.getTime()/1000) - (currentValue.startTime.getTime()/1000))
    }, 0);
    return(<ul id={styles.events}>{
        events.map((event, index) => <Event eventInfo={event} isLastElement={index === events.length - 1} totalEventsSeconds={totalEventsTime}/>)
    }</ul>)
}