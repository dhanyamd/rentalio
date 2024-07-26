'use client'

import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import Container from "./Container"
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import CategoryBox from "./CategoryBox"
import { usePathname, useSearchParams } from "next/navigation"
import { FaSkiing } from "react-icons/fa"
import { BsSnow } from "react-icons/bs"
import { IoDiamond } from "react-icons/io5"

export const categories = [
    {
        label : 'Beach',
        icon : TbBeach,
        description : 'This property is closed to the beach!'
    },
    {
        label : 'Windmills',
        icon : GiWindmill,
        description: 'This property has windmills!'
    },
    {
        label : 'Modern',
        icon : MdOutlineVilla,
        description: 'This property is Modern!'
    },
    {
        label : 'Countryside',
        icon : TbMountain,
        description: 'This property is the countryside!'
    },
    {
        label : 'Pool',
        icon : TbPool,
        description: 'This property is for pools!'
    },
    {
        label : 'Island',
        icon : GiIsland,
        description: 'This property is on island!'
    },
    {
        label : 'Lake',
        icon : GiBoatFishing,
        description: 'This property is near a lake!'
    },
    {
        label : 'Skiing',
        icon : FaSkiing,
        description: 'This property is for skiing places!'
    },
    {
        label : 'Castles',
        icon : GiCastle,
        description: 'This property is in a Castle!'
    },
    {
        label : 'Camping',
        icon : GiForestCamp,
        description: 'This property is for Camping activities!'
    },
    {
        label : 'Artic',
        icon : BsSnow,
        description: 'This property is near the Artic region!'
    },
    {
        label : 'Cave',
        icon : GiCaveEntrance,
        description: 'This property is ocated near the Caves!'
    },
    {
        label : 'Desert',
        icon : GiCactus,
        description: 'This property is located at the Desert area!'
    },
    {
        label : 'Barn',
        icon : GiBarn,
        description: 'This property is near Barns!'
    },
    {
        label : 'Lux',
        icon : IoDiamond,
        description: 'This property is luxurious!'
    }

]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    
    const isMainPage = pathname === '/'
    if(!isMainPage){
        return null
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row justify-between items-center overflow-x-auto">
                {categories.map((item)=> (
                    <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected={category === item.label}
                    icon={item.icon}
                    />
                ))}
            </div>
        </Container>
       
    )
}

export default Categories