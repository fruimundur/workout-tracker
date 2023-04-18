import Header from "./header";
import Footer from "./footer";

export default function Layout({children}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow bg-[url('../../public/gym.jpg')] bg-no-repeat bg-top bg-black">{children}</main>
            <Footer/>
        </div>
    )
}