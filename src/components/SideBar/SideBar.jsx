import Logo from "../../assets/logos/LogoSinTexto.png"
import Letras from "../../assets/logos/LetrasLogo.png"

export default function SideBar() {
    return (
        <div className="flex h-screen overflow-hidden">
            <aside className="absolute bg-[--color-sidebar] left-0 top-0 z-9999 flex h-screen w-[18rem] flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 -translate-x-full text-[--color-texto-sidebar]">
                <div className="flex items-center justify-between gap-2 px-6 py-6 lg:py-6.5">
                    <a href="/" className="w-full flex justify-center items-center gap-4">
                        <img src={Logo} className="w-10 h-11" alt="Chaos Logo"></img>
                        <p>Panel Chaos</p>
                    </a>
                </div>
                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">

                </div>
            </aside>
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
                    <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                        yo
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">

                    </div>
                </main>
            </div>
        </div>
    )
}