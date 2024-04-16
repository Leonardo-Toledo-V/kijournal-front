import Image from "next/image"
import Link from "next/link"
export default function Page404() {
    return (
        <>
            <div className="flex min-h-full flex-col bg-white pb-12 pt-32">
                <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
                    <div className="py-28">
                        <div className="text-center">
                            <Image
                                className="mx-auto h-20 w-auto"
                                src="/kiwi.png"
                                alt="Your Company"
                                width={540}
                                height={462}
                            />
                            <p className="text-base font-bold text-[#368d3f] mt-2">404</p>
                            <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#47a751] sm:text-5xl">Página no encontrada.</h1>
                            <p className="mt-2 text-base text-gray-500">Lo sentimos, no pudimos encontrar la página que estabas buscando.</p>
                            <div className="mt-6">
                                <Link href="/" className="text-base font-medium text-[#2e7135] hover:text-[#2e7135]">
                                    Regresar al inicio
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
