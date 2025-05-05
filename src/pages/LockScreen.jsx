import React,{useState,useEffect} from 'react';

function LockScreen({setHome, passwordScreen,setPasswordScreen,setLockScreen}){
    const [password,setPassword] = useState([]);
    const numbers = [1,2,3,4,5,6,7,8,9,0];

    useEffect(()=>{
        if(password.length==4){
            setPassword([]);
            setPasswordScreen(false);
            setHome(true);
        }
    },[password]);
 
    return(
    <div className={`absolute ${passwordScreen ? 'opacity-100 scale-100 translate-y-0 transition-all duration-400' : 'opacity-0 scale-50 translate-y-1/3 transition-all duration-400 delay-100' } flex flex-col justify-end text-white w-full h-full bg-black/50 m-auto rounded-4xl p-4`}>
        <div className="relative h-5/6 w-full flex flex-col justify-start items-center space-y-4 gap-2 px-6">
        <p className=''>Enter Passcode</p>
        <div className='flex justify-around items-center w-full px-6'>
            {[1,2,3,4].map((passCode,index)=>
                <span key={index} className={`${password.length>index?'bg-white':'bg-transparent'} size-3 border-1 border-white rounded-full`}></span>)}
        </div>
        <div 
        className='pt-4 grid grid-cols-3 w-full gap-6 justify-items-center'>
        {numbers.map((num,index)=>
                <button
                onClick={()=>setPassword(prev=>[...prev,num])} 
                key={index} className={`active:scale-110 active:bg-white/20 ${numbers.length==index+1 ? 'col-start-2 justify-self-center' : '' } size-14 border-1 border-white bg-transparent rounded-full flex justify-center items-center text-2xl text-semibold`}>{num}</button>)}
                
        </div>
        <div className='flex justify-between items-center w-full px-0 text-sm'>
            <button>Emergency</button> 
            <button
            onClick={()=>{
                if(password.length==0){
                    setPasswordScreen(false);
                    setLockScreen(true);
                }else{
                    if(password.length>0){
                        setPassword(prev => prev.slice(0, -1));
                    }
                }
            }} 
            >Cancel</button>
        </div>
        </div>
      </div>
      )
}

export default LockScreen;