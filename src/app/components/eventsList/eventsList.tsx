import styles from "./eventsList.module.scss";
import Event from '../event/event';

export default function EventsList(){
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
    const totalEventsTime = mockData.reduce((accumulator, currentValue) => {
        return accumulator + ((currentValue.endTime.getTime()/1000) - (currentValue.startTime.getTime()/1000))
    }, 0);
    return(<ul id={styles.events}>{
        mockData.map((event, index) => <Event eventInfo={event} isLastElement={index === mockData.length - 1} totalEventsSeconds={totalEventsTime}/>)
    }</ul>)
}