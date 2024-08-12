'use client'

import { BiSearch } from "react-icons/bi"
import useSearchModal from "../hooks/useSearch"
import { useSearchParams } from "next/navigation";
import useCountries from "../hooks/UseCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const Search = () => {

  const SearchModal = useSearchModal();
  const params = useSearchParams();
  const {getByValue} = useCountries();

  const locationValue =  params.get('locationValue')
  const startDate =  params.get('startDate')
  const endDate =  params.get('endDate')
  const guestCount =  params.get('guestCount')

  const locationLabel = useMemo(() => {
      if(locationValue){
        return getByValue(locationValue as string)?.label
      }
      return 'Anywhere'
  },[locationValue, getByValue])

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

     return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

    return (
        <div onClick={SearchModal.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="flex flex-row items-center justify-between">
            <div className="font-semibold text-sm px-6">
                {locationLabel}
            </div>
            <div className="hidden sm:block px-4 flex-1 font-semibold text-sm text-center border-x-[1px] ">
             {durationLabel}
            </div>
            <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block">{guestLabel}</div>
            <div className="p-2 bg-rose-500 rounded-full text-white">
              <BiSearch size={18}/>
            </div>
            </div>

          </div>
        </div>
    )
}

export default Search