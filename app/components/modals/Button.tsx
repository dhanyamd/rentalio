'use client'
import { IconType } from "react-icons"

interface ButtonProps{
    label: string,
    onClick : (e:React.MouseEvent<HTMLButtonElement>) => void,
    outline? : boolean,
    disabled? : boolean,
    small?: boolean,
    icon?: IconType
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    outline,
    disabled,
    small,
    icon: Icon
}) => {
    return (
       <button 
       onClick={onClick}
       disabled={disabled}
       className={`relative disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 rounded-lg transition w-full
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'bg-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
       ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
        `}
       >
          {Icon && (
            <Icon size={24}
            className="absolute left-4 top-3"
             />
          )}

        {label}
       </button>
    )
}

export default Button