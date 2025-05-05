import { useState,useEffect,useRef } from 'react';
import Time from './components/Time';
import LockScreen from './pages/LockScreen';
import Camera from './pages/Camera';
import Home from './pages/Home';
import './index.css'

function App() {
  const [home,setHome] = useState(false);
  const [lockScreen,setLockScreen] = useState(true);
  const [passwordScreen,setPasswordScreen] = useState(false);
  const fingerPrint = useRef(null);
  const timerRef = useRef(null);
  const [wifis, setWifis] = useState(true);
  const [torch,setTorch] = useState(false);
  const [camera,setCamera] = useState(false);

  const screenRef = useRef(null);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);

  function handleTorch(){
    setTorch(prev=>!prev);
    toggleTorch(torch);
  }

  function handleCamera(){
    setCamera(true);
    if(home){
      
    }
    else{
    setLockScreen(false);
    }
  }

  const handleVibrate = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([100,50]); 
    } else {
      console.log("Vibration API not supported.");
    }
  };


  useEffect(() => {
    const fingerprintEl = fingerPrint.current;
    if (!fingerprintEl) return;

    const handleMouseDown = () => {
      fingerPrint.current.classList.add('fingerPrintShadow');
      timerRef.current = setTimeout(() => {
        fingerPrint.current.classList.remove('fingerPrintShadow');
        setLockScreen(false);
        setHome(true);
        handleVibrate();
      }, 600);
    };

    const handleMouseUp = () => {
      clearTimeout(timerRef.current);
    };
    
    fingerprintEl.addEventListener("mousedown", handleMouseDown);
    fingerprintEl.addEventListener("mouseup", handleMouseUp);
    fingerprintEl.addEventListener("mouseleave", handleMouseUp);
    fingerprintEl.addEventListener("touchstart", handleMouseDown);
    fingerprintEl.addEventListener("touchend", handleMouseUp);
  
    // Cleanup on unmount
    return () => {
      fingerprintEl.removeEventListener("mousedown", handleMouseDown);
      fingerprintEl.removeEventListener("mouseup", handleMouseUp);
      fingerprintEl.removeEventListener("mouseleave", handleMouseUp);
      fingerprintEl.removeEventListener("touchstart", handleMouseDown);
      fingerprintEl.removeEventListener("touchend", handleMouseUp);
    };
  }, []);
  
  useEffect(() => {
    const screenEl = screenRef.current;
    if (!screenEl) return;
  
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
  
    const handleTouchEnd = (e) => {
      touchEndY.current = e.changedTouches[0].clientY;
      handleSwipeGesture();
    };
  
    const handleSwipeGesture = () => {
      if (touchStartY.current - touchEndY.current > 50) {
        // Swipe up detected
        setLockScreen(false);
        setPasswordScreen(true);
      }
    };
  
    screenEl.addEventListener("touchstart", handleTouchStart);
    screenEl.addEventListener("touchend", handleTouchEnd);
  
    return () => {
      screenEl.removeEventListener("touchstart", handleTouchStart);
      screenEl.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);


    async function toggleTorch(on) {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    const track = stream.getVideoTracks()[0];

    const imageCapture = new ImageCapture(track);
    const capabilities = await imageCapture.getPhotoCapabilities();

    if (capabilities.torch) {
      await track.applyConstraints({ advanced: [{ torch: on }] });
    } else {
      alert("Torch is not supported on this device.");
    }
  } catch (err) {
    console.error("Torch error:", err);
  }
}

  return (
    <>
<div className={`relative ${ torch ? 'bg-black' : 'bg-gray-900'} min-h-dvh flex items-center`}>
  <div className={`relative ${torch?'torch' : ''} shadow-white m-auto w-min h-min bg-white/70 rounded-[2.2rem] p-1 from-red-500 via-pink-500 to-violet-500`} >

    <div className='absolute w-[310px] h-[580px] bg-gradient-to-br from-25% from-violet-700 via-blue-700 to-pink-600 backdrop-blur-xl rounded-4xl overflow-hidden'>
    </div>
    {/* bottom bar */}
    <div className={` z-40 ${lockScreen || camera ? 'opacity-100 transition-opacity duration-300':'opacity-0 transition-opacity duration-300'} absolute bottom-4 translate-x-2/2 -ml-1 rounded-2xl w-1/3 h-1 bg-white/75`}></div>
    {/* speaker */}
    <div className="absolute z-50 translate-x-1/2 -mt-0 rounded-b-2xl  w-1/2 h-3 bg-black/90"></div>
{/* buttons */}
{/* right */}
    <div className="absolute right-0 translate-x-0.5 translate-y-32 h-16 w-0.5 rounded-r-2xl bg-white"></div>
{/* left */}
      <div className="absolute -translate-x-1.5 translate-y-32 h-24 w-0.5 flex flex-col gap-4">
        <div className="w-full h-full bg-white rounded-l-sm"></div>
        <div className="w-full h-full bg-white rounded-l-sm"></div>
    </div>

{/* camera */}
    <div id="cam" className="absolute z-50 translate-4 p-[3px] bg-black/20 rounded-full">
      <div className="size-4 bg-black rounded-full top-4 left-4 "></div>
    </div>
    {/* top */}
    <div className={`absolute z-40 ${passwordScreen || camera ?'opacity-0 transition-opacity duration-300':'opacity-100 transition-opacity duration-300'} w-full mt-4 pl-4 pr-6 flex justify-between items-center`}>
      <span className="pl-7 font-semibold font-sans text-white">{lockScreen?'airtel':<Time/>}</span>
      <div className="flex justify-center items-center w-min gap-2 pr-2">
      { wifis && <span className='wifi h-4 w-6 rounded-t-full bg-white/90 -mr-2'></span> }
        <span className="flex justify-center items-end gap-0.5">
          <span className="h-2 w-1 bg-white rounded-lg"></span>
          <span className="h-3 w-1 bg-white rounded-lg"></span>
          <span className="h-4 w-1 bg-white/50 rounded-lg"></span>
        </span>
        <span className="relative outline-[2px] outline-white h-3.5 w-7 bg-gradient-to-r from-white/40 via-white/30 to-90% rounded-sm before:content-[''] before:absolute before:h-1.5 before:w-0.5 before:bg-white before:right-0 before:top-[4px] lg:before:top-[4px] before:rounded-r-lg before:translate-x-[4px] after:content-['75'] after:text-[.7rem] after:font-semibold after:w-full after:text-white after:text-center after:absolute ">        
        </span>
      </div>
    </div>

{/* screen */}
  <div className='relative w-[310px] h-[580px]'>
{/* lock Screen */}
  <div
  ref={screenRef} 
  className={`absolute ${lockScreen ? 'z-[1] opacity-100 transition-opacity duration-300' : ' z-[-10] opacity-0 transition-opacity duration-600'} w-full h-full bg-black/30 m-auto rounded-4xl p-4`}
  //style={{backgroundImage: "url('https://i.pinimg.com/736x/d3/e6/4b/d3e64bd61d20fd7500e8e8464978c1ec.jpg')"}}
  >
    {/* <div className="absolute bottom-2 translate-x-5/6 rounded-2xl w-1/3 h-1 bg-white/75"></div> */}
   <div></div>

    <Time lockScreen={lockScreen} />

    <div className="h-16 w-full flex justify-between items-center px-1" >
      {/* Torch */}
      <span onClick={handleTorch} className={`cursor-pointer active:scale-105 flex flex-col justify-center items-center gap-[1px] size-12 bg-black/20 rounded-full`} >
        <div className="w-3 h-1 flex justify-center items-center scale-110 bg-white px-0.5">
        </div>
        <div className="h-2 w-3.5 bg-white rounded-b-2xl"></div>
        <div className="h-3 w-1.5 bg-white rounded-b-sm"></div>
      </span>
      {/* fingerPrint */}
      <span ref={fingerPrint} className="cursor-pointer relative size-16 border-[3px] border-white p-1 rounded-full opacity-100 hover:opacity-100 group transition-opacity duration-300 delay-100" >
        <div className="h-full w-full  rounded-full border-[3px] border-white border-t-transparent p-1 rotate-315 group-hover:rotate-0 transition-all duration-300 delay-100" >
        <div className="h-full w-full  rounded-full border-[3px] border-white border-b-transparent p-1.5" >
          <div className="h-full w-full rounded-full border-[3px] border-white" ></div>
        </div>
        </div>
      </span>
      {/* Camera */}
      <span
      onClick={handleCamera} 
      className="cursor-pointer active:scale-105 size-12 bg-black/20 rounded-full flex justify-center items-center z-[1]" >
        <span className="relative h-5 w-7 bg-white rounded-md py-1 px-2 before:content-[''] before:absolute before:w-3 before:h-1.5 before:bg-white before:top-0 before:right-1 before:-translate-1 before:rounded-t-sm  shadow-sm before:z-[2] z-[3]">
          <div className="w-full h-full bg-white border-1 border-gray-500 rounded-full"></div>
        </span>
      </span>
    </div>
  </div>
  {/* password Screen */}
  <LockScreen home={home} setHome={setHome} passwordScreen={passwordScreen} setPasswordScreen={setPasswordScreen} setLockScreen={setLockScreen} />
  {/* Camera */}
  <Camera camera={camera} setCamera={setCamera} setLockScreen={setLockScreen} setHome={setHome} home={home}/>
  {/* Home screen */}
  <Home home={home} setHome={setHome} lockScreen={lockScreen} setLockScreen={setLockScreen} camera={camera} setCamera={setCamera} passwordScreen={passwordScreen} handleTorch={handleTorch} />
</div>

  </div>
</div>    </>
  )
}

export default App;
