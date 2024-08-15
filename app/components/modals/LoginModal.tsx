'use client'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useRegisterModal from '@/app/hooks/UseRegister'
import Modal from './Modals'
import Heading from '../Heading'
import Input from '../input/Input'
import toast from 'react-hot-toast'
import Button from './Button'
import useLoginModal from '@/app/hooks/UseLogin'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginModal = () => {
    const router = useRouter();
    const[loading, setIsLoading] = useState(false);
    const LoginModal = useLoginModal();
    const registerModal = useRegisterModal()
   
    const {
        register, 
        handleSubmit, 
        formState:{errors}
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

       signIn('credentials',{
        ... data,
        redirect: false
       })
       .then((callback)=> {
        setIsLoading(false)

        if(callback?.ok){
            toast.success('Logged in')
            router.refresh();
            LoginModal.onClose()
        }
        
        if(callback?.error){
            toast.error('Something went wrong')
        }
       })
       
    } 

    const toggle = useCallback(()=> {
        LoginModal.onClose();
        registerModal.onOpen();
    },[LoginModal, registerModal])
    
    const bodyContent = (
     <div className='flex flex-col gap-4'>
           <Heading 
           title='Welcome Back!'
           subtitle='Login to your account ' 
           />
           <Input 
           id="email"
           label='Email'
           disabled={loading}
           register={register}
           errors={errors}
           required
           />
              <Input 
           id="password"
           label='Password'
           disabled={loading}
           register={register}
           errors={errors}
           type='password'
           required
           />
        </div>
    )

    const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
        <hr/>
        <Button onClick={()=>signIn('google')} outline label='Continue with Google' icon={FcGoogle}/>
        <Button onClick={()=>signIn('github')} outline label='Continue with Github' icon={AiFillGithub}/>
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row justify-center items-center gap-2'>
                    <div>
                        First time using Rentalio?
                    </div>
                    <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>
                        Create an account
                    </div>
                </div>

            </div>
    </div>   
)


    return (
        <Modal 
        disabled={loading}
        isOpen={LoginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={LoginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
         />
    )
}

export default LoginModal