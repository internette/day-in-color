import styles from "./eventsList.module.scss";
import Event from '../event/event';
import EventInfo from "../../models/event";

export default function EventsList({ events }:{events: EventInfo[]}){
    const totalEventsTime = events.reduce((accumulator, currentValue) => {
        return accumulator + ((currentValue.endTime.getTime()/1000) - (currentValue.startTime.getTime()/1000))
    }, 0);
    return(<ul id={styles.events}>{
        events.map((event, index) => <Event key={`event-${index}`} eventInfo={event} isLastElement={index === events.length - 1} totalEventsSeconds={totalEventsTime}/>)
    }</ul>)
}