'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "./Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "../hooks/UseRegister"
import LoginModal from "./modals/LoginModal"
import useLoginModal from "../hooks/UseLogin"

const UserMenu = () => {
    const[isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal()
    const LoginModal = useLoginModal()

    const toggleOpen = useCallback(()=> {
       setIsOpen((value) => !value)
    },[isOpen])
    return (
        <div 
        onClick={()=> {}}
        className="relative">
            <div className="flex flex-row items-center gap-3">
                <div className="hidden md:block text-sm font-semibold py-3 px-4 hover:bg-neutral-100 rounded-full transition cursor-pointer">
                   Airbnb your home
                </div>
                <div onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 cursor-pointer border-[1px] flex flex-row items-center gap-3 hover:shadow-md transition border-neutral-100 rounded-full"
                    >
                     <AiOutlineMenu onClick={toggleOpen}/>
                     <div className="hidden md:block">
                      <Avatar/>   
                     </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute shadow-md rounded-xl w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm bg-white">
                     <div className="flex flex-col cursor-pointer">
                        <>
                        <MenuItem  onClick={LoginModal.onOpen}
                        label="Login"/>
                        </>
                        <>
                        <MenuItem  onClick={registerModal.onOpen}
                        label="Signup"/>
                        </>
                     </div>
                    </div>
            )}                  

        </div>
    )
}

export default UserMenu