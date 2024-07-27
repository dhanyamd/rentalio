'use client'

import useRentModal from "@/app/hooks/UseRentModal"
import Modal from "./Modals";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Categories";
import CategoryInput from "../input/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../CountrySelect";

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
    const [step, setStep] = useState(STEPS.CATEGORY)

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
            categories : '',
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

    const category = watch('category');

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
           {categories.map((item)=> (
            <div key={item.label} className="col-span-1">
                <CategoryInput 
                onClick={(category)=>setcustomSetValue('category', category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
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
        onSubmit={onNext}
        actionLabel={actionLabel}
        body={BodyContent}
        />
    )
}

export default RentModal