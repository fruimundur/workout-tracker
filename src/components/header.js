import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return(
        <>
            <header className="h-24 bg-slate-800 flex items-center justify-center">
                <Link href="/">
                    <div className="flex flex-row">
                        <Image
                        className="mr-2"
                        src="/dumbbell.svg"
                        alt="dumbbell logo"
                        width={30}
                        height={30}
                        />
                        <h1 className="text-white text-xl">GainsKeeper</h1>
                    </div>
                </Link>
            </header>
        </>
    )
}