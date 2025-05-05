import React,{useState,useEffect} from 'react'
import { IoMoon } from "react-icons/io5";
import { MdSunny } from "react-icons/md";

function Event(){
    const [event,setEvent] = useState('');
    const date = new Date();
    const hour = date.getHours();

    useEffect(()=>{
        if(hour>=3 && hour<12){
            setEvent('morning');
        }
        else if(hour>=12 && hour<17){
            setEvent('afternoon');
        }
        else if(hour>=17 && hour<21){
            setEvent('evening');
        }
        else{
            setEvent('night');
        }
    },[]);
    return (
        <div className={`relative backdrop-blur-xl overflow-hidden m-auto w-11/12 h-32 bg-gradient-to-br rounded-3xl  ${event=='morning' ? 'from-blue-400 via-blue-500 to-yellow-400': event=='afternoon' ? 'from-orange-100 via-orange-300 to-orange-500  ': event=='evening'?'from-pink-300 via-pink-500 to-blue-900':'from-gray-400 via-slate-700 to-slate-900' } `}>
            { event=='night' && <IoMoon className='absolute text-white text-4xl translate-8' />}
            { event!='night'  && <MdSunny className={`absolute text-4xl ${event=='morning' ? 'text-yellow-400/80 translate-8' : event=='afternoon' ? 'text-white/80 translate-x-32 translate-y-6' : event=='evening' ? 'text-orange-400/80 translate-x-[14rem] translate-y-20' : 'text-gray-400/80 translate-8'} `} />}
            <h1 className='absolute z-20 text-gray-100 text-2xl font-semibold capitalize text-center w-full bottom-2'>{event}</h1>
            <div className='absolute z-10 h-2/4 w-2/4 translate-x-3/6 bg-white/20 bottom-0 rounded-t-full'></div>
            <div className='bg-black/10 w-full h-full'></div>
        </div>
    )
}

export default Event;
