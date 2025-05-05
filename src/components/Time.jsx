import React,{useState,useEffect} from 'react'

function Time({lockScreen}){
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    })
    .replace(/ AM| PM/, ""));

      useEffect(() => {
        const interval = setInterval(() => {
        const newDate = new Date();
        setDate(newDate);
        setTime(
            newDate
            .toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
            })
            .replace(/ AM| PM/, "")
        );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return(lockScreen?<div className="h-4/5 w-full bg-transparent flex flex-col justify-center items-center" >
        <h3 className="text-white/80 font-normal " > { `${date.toLocaleString('en-US', { weekday: 'long' })}, ${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}`} </h3>
        <h1 className="text-7xl text-white/80 font-semibold" >{time}</h1>
        </div>:<div className='' >{time}</div>)
}

export default Time;