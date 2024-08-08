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
import { signIn } from 'next-auth/react'
import useLoginModal from '@/app/hooks/UseLogin'

const RegisterModal = () => {
    const[loading, setIsLoading] = useState(false);
    const registerModal = useRegisterModal();
    const LoginModal = useLoginModal()
   
    const {
        register, 
        handleSubmit, 
        formState:{errors}
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
         .then(()=> {
            toast.success('Success!')
            registerModal.onClose()
            LoginModal.onOpen();
         })
         .catch((error)=> {
            toast.error("Something went wrong!")
         })
         .finally(()=> {
            setIsLoading(false)
         })
    } 

    
    const toggle = useCallback(()=> {
        registerModal.onClose();
        LoginModal.onOpen();
    },[LoginModal, registerModal])

    
    const bodyContent = (
     <div className='flex flex-col gap-4'>
           <Heading 
           title='Welcome to Airbnb'
           subtitle='Create an account ' 
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
           id="name"
           label='Name'
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
                        Already have an account?
                    </div>
                    <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>
                        Login
                    </div>
                </div>

            </div>
    </div>   
)


    return (
        <Modal 
        disabled={loading}
        isOpen={registerModal.isOpen}
        title='Register'
        actionLabel='Continue'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
         />
    )
}

export default RegisterModal