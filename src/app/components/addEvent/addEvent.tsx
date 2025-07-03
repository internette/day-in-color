import EventInfo from "../../models/event";

export default function AddEvent({ events, setEvents }:{events: EventInfo[], setEvents: Function}){
    const generateAvailableTimes = ()=> { 
        let time = 0;
        const times = [0];
        const increment = 30;
        const maxTime = 24 * 60;
        while(time < maxTime){
            let shouldAddTime = true;
            time += increment;
            if(time < (events[0].startTime.getHours() * 60 + events[0].startTime.getMinutes()) || time > (events[events.length - 1].endTime.getHours() * 60 + events[events.length - 1].endTime.getMinutes())){
                times.push(time);
            } else {
                for(let event of events){
                    const { startTime, endTime } = event;
                    const startTimeAsMinutes = startTime.getHours() * 60 + startTime.getMinutes();
                    const endTimeAsMinutes = endTime.getHours() * 60 + endTime.getMinutes();
                    shouldAddTime = false
                    if(endTimeAsMinutes > time && time > startTimeAsMinutes){
                        times.push(time);
                    }
                }
            }
        }
        return times;
    }
    console.log(events);
    const times = generateAvailableTimes();
    return <form>
        <div>
            <label htmlFor="title">Event:</label><input id="title" placeholder="Example event name"/>
        </div>
        <div>
            <label htmlFor="start-time">Start time:</label>
            <select id="start-time">{
                times.map(time => {
                    const hr = Math.floor(time/60);
                    const mins = (time - (hr * 60));
                    const dateObj = new Date();
                    dateObj.setHours(hr);
                    dateObj.setMinutes(mins);
                    const timeString = `${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
                    return <option value={timeString}>{timeString}</option>
                })
            }</select>
        </div>
        <div>
            <label htmlFor="end-time">End time:</label>
            <select id="end-time">{
                times.map(time => {
                    const hr = Math.floor(time/60);
                    const mins = (time - (hr * 60));
                    const dateObj = new Date();
                    dateObj.setHours(hr);
                    dateObj.setMinutes(mins);
                    const timeString = `${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
                    return <option value={timeString}>{timeString}</option>
                })
            }</select>
        </div>
        <button>Add Event</button>
    </form>
}