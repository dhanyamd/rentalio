'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "./Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "../hooks/UseRegister"
import useLoginModal from "../hooks/UseLogin"
import { signOut } from "next-auth/react"
import { SafeUser } from "../types"
import useRentModal from "../hooks/UseRentModal"

interface UserMenuProps{
    currentUser? : SafeUser | null;
}

const UserMenu : React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const[isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal()
    const LoginModal = useLoginModal();
    const rentModal = useRentModal();

    const toggleOpen = useCallback(()=> {
       setIsOpen((value) => !value)
    },[isOpen])

    const onRent = useCallback(()=> {
     if(!currentUser){
       return LoginModal.onOpen()
     }
     // we need to open rent modal if logged in
     rentModal.onOpen();
      
    },[currentUser, LoginModal, rentModal])

    return (
        <div 
        onClick={()=> {}}
        className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent}
                className="hidden md:block text-sm font-semibold py-3 px-4 hover:bg-neutral-100 rounded-full transition cursor-pointer">
                   Airbnb your home 
                </div>
                <div onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 cursor-pointer border-[1px] flex flex-row items-center gap-3 hover:shadow-md transition border-neutral-100 rounded-full"
                    >
                     <AiOutlineMenu onClick={toggleOpen}/>
                     <div className="hidden md:block">
                      <Avatar src={currentUser?.image}/>   
                     </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute shadow-md rounded-xl w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm bg-white">
                     <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                        <>
                                <MenuItem onClick={() => {}}
                                    label="My trips" />
                            
                                    <MenuItem onClick={()=> {}}
                                        label="My favourites" />

                                        
                                    <MenuItem onClick={()=> {}}
                                        label="My reservations" />
                                        
                                    <MenuItem onClick={()=> {}}
                                        label="My properties" />
                                        
                                    <MenuItem onClick={rentModal.onOpen}
                                        label="Airbnb my home" />
                                        <hr/>
                                        
                                    <MenuItem onClick={()=> signOut()}
                                        label="Logout" />
                                </>

                        ): (
        
                          <>
                                    <MenuItem onClick={LoginModal.onOpen}
                                        label="Login" />
                                
                                        <MenuItem onClick={registerModal.onOpen}
                                            label="Signup" />
                                    </>
                        )}
                    
                     </div>
                    </div>
            )}                  

        </div>
    )
}

export default UserMenu