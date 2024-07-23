'use client'
import { useCallback, useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io";
import Button from "./Button";

interface ModalProps{
    isOpen? : boolean,
    onClose : () => void,
    onSubmit : () => void,
    title? : string,
    body?: React.ReactElement,
    footer? : React.ReactElement,
    actionLabel: string,
    disabled?: boolean,
    secondaryAction : () => void, 
    secondaryLabel? : string
}

const Modal : React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryLabel
}) => {
    const[showmodal, setshowmodal] = useState(isOpen);

    useEffect(()=> {
       setshowmodal(isOpen)
    },[isOpen])

    const handleClose = useCallback(()=> {
     if(disabled) return 

     setshowmodal(false)
     setTimeout(()=> {
        onClose()
     },300)
    },[disabled, onClose])

    const handleSubmit = useCallback(()=> {
        if(disabled) return 
   
      onSubmit()       
       },[disabled, onSubmit])

    const handleSecondaryAction = useCallback(()=> {
        if(disabled || !secondaryAction) return

        secondaryAction()
    },[disabled, secondaryAction]) 

    if(!isOpen){
        return null
    }

    return (
     <>
     <div className="justify-center items-center overflow-x-hidden overflow-y-auto 
     flex fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-100/70 ">
    <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
     {/* content */} 
    <div  className={`translate duration-300 h-full 
    ${showmodal ? 'translate-y-0' : 'translate-y-full'}
    ${showmodal? 'opacity-100' : 'opacity-0'}
        `}>
            <div className="transalte h-ful lg:h-auto md:h-auto
             border-0 rounded-lg shadow-lg relative flex flex-col outline-none focus:outline-none bg-white w-full">
                { /* Header */}
            <div className="flex items-center justify-center p-6 rounded-t relative border-b-[1px]">
                <button onClick={handleClose}  className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                  <IoMdClose size={18}/>
                </button>
                <div className="text-lg font-semibold">
                  {title}
                </div>
            </div>
            {/*body */}
            <div className="p-6 relative flex-auto">
              {body}
            </div>
            {/** Footer */}
            <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row gap-4 items-center w-full">
                    <Button label="my button"/>
                </div>

            </div>

            </div>

    </div>

 </div>
     </div>
     </>
    )
}

export default Modal