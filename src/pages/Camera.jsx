import React, { useState, useEffect, useRef } from 'react';
import { IoFlash } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { IoColorFilterSharp } from "react-icons/io5";
import { FaRotate } from "react-icons/fa6";
import image from '/image.png';

function Camera({ camera, setCamera , setLockScreen,home}) {
  
  const [counter, setCounter] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const cameraScreenRef = useRef(null);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);

  useEffect(() => {
    if (camera) {
      setShowImage(false);
      setCounter(3);
    }
  }, [camera]);

  // Countdown logic
  useEffect(() => {
    if (counter === null) return;

    if (counter > 1) {
      document.getElementById('cam').classList.add('bg-conic-custom','animate-rotate-sweep');
      const timer = setTimeout(() => setCounter(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (counter === 1) {
      const timer = setTimeout(() => setCounter("Smile"), 1000);
      return () => clearTimeout(timer);
    } else if (counter === "Smile") {
      const timer = setTimeout(() => {
        document.getElementById('cam').classList.remove('bg-conic-custom','animate-rotate-sweep');
        setCounter(null);
        setShowImage(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  useEffect(() => {
    const screenEl = cameraScreenRef.current;
    if (!screenEl) return;
  
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
  
    const handleTouchEnd = (e) => {
      touchEndY.current = e.changedTouches[0].clientY;
      handleSwipeGesture();
    };
  
    const handleSwipeGesture = () => {
      if (touchStartY.current - touchEndY.current > 40) {
        setCamera(false);
        if(!home){
          setLockScreen(true);
        }
      }
    };
  
    screenEl.addEventListener("touchstart", handleTouchStart);
    screenEl.addEventListener("touchend", handleTouchEnd);
  
    return () => {
      screenEl.removeEventListener("touchstart", handleTouchStart);
      screenEl.removeEventListener("touchend", handleTouchEnd);
    };
  }, [home]);

  return (
    <div
      ref={cameraScreenRef}
      className={`absolute ${camera ? 'opacity-100 scale-100 translate-y-0 translate-x-0 transition-all duration-400 delay-100' : 'opacity-0 scale-10 translate-y-1/3 translate-x-1/3 transition-all duration-300 delay-100'} bg-cover bg-center w-full h-full bg-black rounded-4xl overflow-hidden`}
      style={{ backgroundImage: showImage ? `url('${image}')` : 'none' }}
    >
      <div className={`${camera ? 'opacity-100 transition-opacity duration-900 delay-100' : 'opacity-0'} relative h-full w-full flex flex-col justify-between items-center`}>
        
        {/* Top bar */}
        <div className='h-20 w-full bg-black/40 flex flex-col justify-end'>
          <div className='h-auto w-full px-4 pb-2 text-white flex justify-between items-center'>
            <span className='border-[1px] border-white/50 p-[2px] rounded-full'><IoFlash className='text-md' /></span>
            <span className='border-[1px] border-white/50 rounded-full p-[1px] text-lg'><IoIosArrowUp /></span>
            <span><IoColorFilterSharp className='text-xl' /></span>
          </div>
        </div>

        {/* Counter in center */}
        {counter !== null && !showImage && (
            <div className='text-white text-4xl font-light h-max w-1/2 flex justify-center items-center'>
            {counter}
          </div>
        )}

        {/* Bottom bar */}
          <div className='relative h-32 w-full bg-black/50'>
            <div className='absolute -translate-y-6 w-full text-center text-white flex items-center justify-center gap-2'>
              <span className='text-xs'>0.5</span>
              <span className='text-yellow-400 text-sm'>1x</span>
            </div>
            <div className='[mask-image:linear-gradient(to_right,transparent,white_10%,white_70%,transparent)] -ml-1 w-screen overflow-x-auto flex gap-5 text-nowrap text-sm font-normal text-white font-sans'>
              <p>SLO-MO</p>
              <p>VIDEO</p>
              <p className='text-yellow-400 font-semibold'>PHOTO</p>
              <p>PORTRAIT</p>
              <p>PANAROMA</p>
            </div>
            <div className='flex mt-3 justify-between items-center px-6'>
              <div className='w-8'></div>
              <div className='size-16 bg-white rounded-full p-1'>
                <div className='size-full border-2 border-black rounded-full'></div>
              </div>
              <div className='text-white text-xl p-2 border-1 rounded-full'>
                <FaRotate />
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Camera;