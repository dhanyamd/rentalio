'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image
        onClick={()=> router.push('/')}
        alt="Logo"
        className="hidden md:block cursor-pointer rounded-sm w-32 h-2/3"
        height="100"
        width="100"
        src="/images/test1.png"
        />
    )
}

export default Logo