import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return(
        <>
            <header className="h-16 bg-slate-800 flex items-center justify-center">
            {/* <Image
                src="../../public/dumbbell.svg"
                alt="dumbbell logo"
                width={40}
                height={40}
            /> */}
            <Link href="/"><h1 className="text-white">GainsKeeper</h1></Link>
            </header>
        </>
    )
}