'use client'

import useRentModal from "@/app/hooks/UseRentModal"
import Modal from "./Modals";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Categories";
import CategoryInput from "../input/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../input/Counter";
import ImageUpload from "../input/ImageUpload";
import Input from "../input/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS{
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const[isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category : '', 
            location: null,
            guestCount : 1,
            roomCount : 1,
            bathroomCount: 1,
            imageSrc : '',
            price : 1,
            title: '',
            description : ''
        }
    })

    const categoryValue = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');
    

    const Map = useMemo(()=>dynamic(()=>import('../Map'),{
        ssr: false
    }),[location])


    const setcustomSetValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }
   
    const onBack =() => {
        setStep((value)=> value -1)
    }

    const onNext = () => {
        setStep((value)=> value +1)
    }

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE){
           return onNext();
        }

        setIsLoading(true);
        axios.post('/api/listings', data)
         .then(()=> {
            toast.success('Listing Created!')
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose()
         })
         .catch(()=> {
            toast.error('Something went wrong!')
         }).finally(()=> {
            setIsLoading(false)
         })
    }

    const actionLabel = useMemo(()=> {
     if(step === STEPS.PRICE){
        return 'Create'
     }
     return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(()=> {
      if(step === STEPS.CATEGORY){
        return undefined
      }

      return 'Back'
    },[step])


    let BodyContent = (
        <div className="flex flex-col gap-8">
         <Heading
         title="Which of these best describes your place?"
         subtitle="Pick a category"
         />
         <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto gap-3 max-h-[50vh]">
           {categories.map((category)=> (
            <div key={category.label} className="col-span-1">
                <CategoryInput 
                onClick={(value)=>setcustomSetValue("category", value)}
                selected={categoryValue === category.label}
                label={category.label}
                icon={category.icon}
                />
                </div>
           ))}
         </div>
        </div>
    )

    if(step === STEPS.LOCATION){
        BodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your place located?"
                subtitle="Help guests find you!"/>
                Location Step!
                <CountrySelect 
                onChange={(value) => setcustomSetValue('location', value)}
                value={location}
                />
                <Map
                center={location?.latlng}
                />
            </div>
        )
    }

    if(step === STEPS.INFO){
        BodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some basics about your place"
                subtitle="What amenities do you have?"
                />
                <Counter title="Guests" 
                subtitle="How many guests do you allow?"
                value={guestCount}
                onChange={(value)=> setcustomSetValue('guestCount', value)}
                />
                <hr/>
                <Counter title="Rooms" 
                subtitle="How many rooms do you have?"
                value={roomCount}
                onChange={(value)=> setcustomSetValue('roomCount', value)}
                />
                <hr/>
                <Counter title="Bathrooms" 
                subtitle="How many bathrooms do you have?"
                value={bathroomCount}
                onChange={(value)=> setcustomSetValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES){
        BodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title="Add photo of your place"
                subtitle="Show guests what your place looks like!"
                />
            <ImageUpload 
            value={imageSrc}
            onChange={(value)=> setcustomSetValue('imageSrc',value)}
            />
            </div>
        )
    }

    if(step === STEPS.DESCRIPTION){
        BodyContent = (
           <div className="flex flex-col gap-8">
            <Heading 
            title="How would you describe your place?"
            subtitle="short and sweet works best!"
            />
            <Input 
            id="title"
            label="Title"
            disabled={isLoading}
            required
            errors={errors}
            register={register}
            />
            <hr/>
            <Input 
            id="description"
            label="Description"
            disabled={isLoading}
            required
            errors={errors}
            register={register}
            />
           </div>
        )
    }

    if(step === STEPS.PRICE){
        BodyContent = (
            <div className="flex flex-col gap-8">
            <Heading
            title="Now, set your price!"
            subtitle="how much do you charge for one night?" 
            />
           <Input 
           id="price"
           label="Price"
           register={register}
           errors={errors}
           required
           formatPrice
           disabled={isLoading}
           />
            </div>
        )
    }
   
    return (
       <Modal
        isOpen={rentModal.isOpen}
        title="Airbnb your home!"
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        body={BodyContent}
        />
    )
}

export default RentModal