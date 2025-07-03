import styles from "./event.module.scss";
import EventInfo from "../../models/event";

export default function Event({ eventInfo, isLastElement, totalEventsSeconds }:{ eventInfo: EventInfo, isLastElement: boolean, totalEventsSeconds: number }){
    const { startTime, endTime, title } = eventInfo;
    const startTimeAsObject = new Date(startTime);
    const endTimeAsObject = new Date(endTime);
    function convertTimeToRGB(value:number, type:string){
        var max_val = type === 'hr' ? 12 : 60;
        return value * 255 / max_val;
    }
    const avgHrAsRgb = convertTimeToRGB(Math.floor((startTimeAsObject.getHours() + endTimeAsObject.getHours())/2), 'hr');
    const avgMinAsRgb = convertTimeToRGB(Math.floor((startTimeAsObject.getMinutes() + endTimeAsObject.getMinutes())/2), 'min');
    const avgSecondsAsRgb = convertTimeToRGB(Math.floor((startTimeAsObject.getSeconds() + endTimeAsObject.getSeconds())/2), 'sec');
    const startAsSeconds = (startTimeAsObject.getTime())/1000;
    const endAsSeconds = (endTimeAsObject.getTime())/1000;
    const eventTimeInSeconds = endAsSeconds - startAsSeconds;
    const eventHeight = (eventTimeInSeconds * 100) / totalEventsSeconds;
    const elementBackgroundColor = `rgb(${avgHrAsRgb}, ${avgMinAsRgb}, ${avgSecondsAsRgb})`;
    if(isLastElement){
        document.documentElement.style.setProperty('--add-event-btn-color', elementBackgroundColor);
    }
    return <li 
        className={styles.colorBar}
        style={{
            backgroundColor: elementBackgroundColor,
            height: `${eventHeight}vh`
        }}>
        <span className={styles.colorBarText}>{title}</span>
    </li>
}