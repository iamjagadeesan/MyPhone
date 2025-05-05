import React from 'react'
import Event from '../components/Event';
import Applist from '../components/Applist';

function Home({home,setHome,setLockScreen,camera,setCamera,handleTorch}){
    
    return(
        <div className={`absolute ${ !home ? 'opacity-0 z-[-1] transition-opacity duration-500 delay-100' : `opacity-100 ${camera ? 'z-[-1] transition-all duration-200 delay-100' : 'z-10 transition-all duration-200 delay-100' } transition-opacity duration-300 delay-100`} w-full h-full bg-black/20 rounded-4xl`}>
            <div className='relative w-full h-full rounded-4xl pt-24'>
                <Event/>
                <Applist/>
                <div className='m-auto w-full h-12 flex justify-center items-center gap-2'>
                    {[1,2,3,4,5].map((_,i)=><span key={i} className={`size-2  rounded-full ${ i==0?'bg-gray-100/75':'bg-gray-100/25'}`}></span>)}
                </div>
                <ul className='m-auto w-11/12 flex justify-center items-center space-x-8 bg-white/20 rounded-3xl py-3'>
                    <li className={`size-16 rounded-3xl bg-gray-100/25 flex justify-center items-center`}>
                        <span onClick={handleTorch} className={`cursor-pointer scale-150 flex flex-col justify-center items-center gap-[1px] size-12 rounded-full`} >
                            <div className="w-3 h-1 flex justify-center items-center scale-110 bg-white px-0.5">
                            </div>
                            <div className="h-2 w-3.5 bg-white rounded-b-2xl"></div>
                            <div className="h-3 w-1.5 bg-white rounded-b-sm"></div>
                        </span>
                    </li>
                    <li
                    onClick={()=>{
                        setHome(false);
                        setLockScreen(true);
                    }} 
                    className={`size-16 rounded-3xl bg-gray-100/25`}>
                        <span className="relative h-full flex justify-center items-center" >
                            <div className='h-min w-min'>
                                <div className='m-auto h-3 w-5 border-white border-2 border-b-transparent rounded-t-full'></div>
                                <div className='w-9 h-7 bg-white rounded-lg'></div>
                            </div>
                        </span>
                    </li>
                    <li className={`size-16 rounded-3xl bg-gray-100/25 flex justify-center items-center`}>
                        <span
                        onClick={()=>{
                            setCamera(true);
                        }} 
                        className="cursor-pointer size-12 scale-160 rounded-full flex justify-center items-center z-[1]" >
                            <span className="relative h-5 w-7 bg-white rounded-md py-1 px-2 before:content-[''] before:absolute before:w-3 before:h-1.5 before:bg-white before:top-0 before:right-1 before:-translate-1 before:rounded-t-sm  shadow-sm before:z-[2] z-[3]">
                            <div className="w-full h-full bg-white border-1 border-gray-500 rounded-full"></div>
                            </span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Home;