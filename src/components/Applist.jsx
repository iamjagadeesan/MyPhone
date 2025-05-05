import { TbMessage2Filled } from "react-icons/tb";
import { HiMail } from "react-icons/hi";
import { GrSettingsOption } from "react-icons/gr";
import { IoVideocam } from "react-icons/io5";
import { IoImage } from "react-icons/io5";
import { MdCall } from "react-icons/md";

function Applist(){
    const style = 'size-20 bg-white/20 rounded-3xl text-white text-5xl flex justify-center items-center';
    return(
        <div className="w-full">
            <ul className="mt-8 rounded-4xl w-11/12 h-auto m-auto grid grid-cols-3 place-items-center text-center gap-3">
                <li className={`${style}`}><TbMessage2Filled /></li>
                <li className={`${style}`}><HiMail /></li>
                <li className={`${style}`}><GrSettingsOption /></li>
                <li className={`${style}`}><IoVideocam /></li>
                <li className={`${style}`}><IoImage /></li>
                <li className={`${style}`}><MdCall /></li>
            </ul>
        </div>
    )
}

export default Applist;