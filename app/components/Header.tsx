import Image from "next/image";

const Header = () => {

    return (
        <header className="w-full mb-3">
            <div className="flex justify-between items-center bg-black text-orange-500 py-2 px-2 lg:px-20">
                <p>info@fuelmap.com</p>
                <p>C/De la Tecnología, 5 P.I Los Olivos (Madrid)</p>
            </div>
            <div className="flex items-center px-2 lg:px-20 py-2 gap-8">
                <div className="relative w-[277px] h-[44px]">
                    <Image src="/images/ircongas.png" alt="ircongas" fill />
                </div>
                <nav className="grow flex items-center">
                    <ul className="flex items-center w-full justify-between">
                        <li>Quienes somos</li>
                        <li>Marcas</li>
                        <li>Taxis / VTC</li>
                        <li>Talleres</li>
                        <li>Faq&apos;s</li>
                        <li>Noticias</li>
                        <li>Contacto</li>
                    </ul>
                </nav>
                <div className="flex items-center gap-6">
                    <button className="bg-orange-500 text-white font-bold h-[52px] px-4 rounded-[10px]">Solicitar presupuesto</button>
                    <div className="relative size-[52px]">
                        <Image src="/images/user-icon.png" alt="user-icon" fill />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;