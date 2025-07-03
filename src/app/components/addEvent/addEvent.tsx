import React from 'react';
import { useNavigate } from "react-router";
import EventInfo from "../../models/event";

export default function AddEvent({ events, setEvents }:{events: EventInfo[], setEvents: Function}){
    const navigate = useNavigate();
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
    const times = generateAvailableTimes();
    const submitForm = async (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let formJson = Object.fromEntries(formData.entries());
        const parsedStartTime = formJson.startTime.toString().split(':');
        const newStartTime = new Date();
        newStartTime.setHours(parseInt(parsedStartTime[0]));
        newStartTime.setMinutes(parseInt(parsedStartTime[1]));
        const parsedEndTime = formJson.endTime.toString().split(':');
        const newEndTime = new Date();
        newEndTime.setHours(parseInt(parsedEndTime[0]));
        newEndTime.setMinutes(parseInt(parsedEndTime[1]));
        const newEntry = {
            title: formJson.title,
            startTime: newStartTime,
            endTime: newEndTime
        }
        const newEvents = [...events, newEntry].sort((a, b)=> {
            return a.startTime.getTime()/1000 < b.startTime.getTime()/1000 ? -1 : 1
        });
        await setEvents(newEvents);
        return navigate('/');
    }
    return <form onSubmit={submitForm}>
        <div>
            <label htmlFor="title">Event:</label><input id="title" name="title" placeholder="Example event name"/>
        </div>
        <div>
            <label htmlFor="start-time">Start time:</label>
            <select id="start-time" name="startTime">{
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
            <select id="end-time" name="endTime">{
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
        <button type="submit">Add Event</button>
    </form>
}