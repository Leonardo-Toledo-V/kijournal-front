'use client'
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

const navigation = {
    categories: [
        {
            name: 'Productos',
            featured: [
                {
                    name: 'Gestión de Stock',
                    href: '/gestion-stock',
                    imageSrc: 'stock.jpeg',
                    imageAlt: 'Gestión de Stock',
                },
                {
                    name: 'Control Financiero',
                    href: '/control-financiero',
                    imageSrc: 'https://images.unsplash.com/photo-1547656807-9733c2b738c2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    imageAlt: 'Control Financiero',
                },
                {
                    name: 'Directorio de Proveedores',
                    href: '/directorio-proveedores',
                    imageSrc: 'https://plus.unsplash.com/premium_photo-1664301713568-896df8967017?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    imageAlt: 'Directorio de Proveedores',
                },
                {
                    name: 'Planes de Suscripción',
                    href: '/planes-suscripcion',
                    imageSrc: 'https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    imageAlt: 'Planes de Suscripción',
                },
            ],
        },
        {
            name: 'Empresa',
            featured: [
                {
                    name: 'Acerca de Nosotros',
                    href: '/acerca-de-nosotros',
                    imageSrc: 'https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    imageAlt: 'Acerca de Nosotros',
                },
                {
                    name: 'Blog',
                    href: '/blog',
                    imageSrc: 'https://images.unsplash.com/photo-1507206130118-b5907f817163?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    imageAlt: 'Blog',
                },
                {
                    name: 'Socios',
                    href: '/socios',
                    imageSrc: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    imageAlt: 'Socios',
                },
                {
                    name: 'Contáctanos',
                    href: '/contacto',
                    imageSrc: 'https://plus.unsplash.com/premium_photo-1661315433346-ff39047c1492?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    imageAlt: 'Contáctanos',
                },
            ],
        },
    ],
};

const collections = [
    {
        name: "Oferta",
        href: '#',
        imageSrc: 'IMG_4331.jpg',
        imageAlt: 'Woman wearing a comfortable cotton t-shirt.',
    },
    {
        name: "Servicios",
        href: '#',
        imageSrc: 'IMG_4332.jpg',
        imageAlt: 'Man wearing a comfortable and casual cotton t-shirt.',
    },
    {
        name: 'Nosotros',
        href: '#',
        imageSrc: 'IMG_4333.jpg',
        imageAlt: 'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
    },
]

const perks = [
    {
        name: 'Gestión de stock',
        imageUrl: 'stock.png',
        description: 'Administra tu inventario de manera eficiente y mantén el control de tus productos en stock en todo momento.',
    },
    {
        name: 'Control financiero',
        imageUrl: 'estadistico.png',
        description:
            'Visualiza tus gastos y ganancias mensuales de forma clara y precisa para tomar decisiones financieras informadas.',
    },
    {
        name: 'Directorio de proveedores',
        imageUrl: 'directorio.png',
        description: 'Accede a un directorio completo de proveedores confiables para abastecer tu negocio de manera eficiente.',
    },
    {
        name: 'Fácil de usar',
        imageUrl: 'facil.png',
        description: 'KiJournal ofrece una interfaz intuitiva y fácil de usar, diseñada para adaptarse a las necesidades de tu empresa.',
    },
];

const footerNavigation = {
    products: [
        { name: 'Gestión de Stock', href: '/gestion-stock' },
        { name: 'Control Financiero', href: '/control-financiero' },
        { name: 'Directorio de Proveedores', href: '/directorio-proveedores' },
        { name: 'Planes de Suscripción', href: '/planes-suscripcion' },
    ],
    company: [
        { name: 'Acerca de Nosotros', href: '/acerca-de-nosotros' },
        { name: 'Blog', href: '/blog' },
        { name: 'Socios', href: '/socios' },
        { name: 'Contáctanos', href: '/contacto' },
        { name: 'Términos y Condiciones', href: '/terminos-condiciones' },
        { name: 'Privacidad', href: '/privacidad' },
    ],
    customerService: [
        { name: 'Soporte', href: '/soporte' },
        { name: 'Preguntas Frecuentes', href: '/preguntas-frecuentes' },
        { name: 'Guía de Inicio Rápido', href: '/guia-inicio-rapido' },
        { name: 'Foro de Usuarios', href: '/foro-usuarios' },
    ],
};


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function page() {
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-white">
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pt-5 pb-2">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <Tab.Group as="div" className="mt-2">
                                    <div className="border-b border-gray-200">
                                        <Tab.List className="-mb-px flex space-x-8 px-4">
                                            {navigation.categories.map((category) => (
                                                <Tab
                                                    key={category.name}
                                                    className={({ selected }) =>
                                                        classNames(
                                                            selected ? 'text-[#468e4d] border-[#468e4d]' : 'text-gray-900 border-transparent',
                                                            'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                                                        )
                                                    }
                                                >
                                                    {category.name}
                                                </Tab>
                                            ))}
                                        </Tab.List>
                                    </div>
                                    <Tab.Panels as={Fragment}>
                                        {navigation.categories.map((category) => (
                                            <Tab.Panel key={category.name} className="space-y-12 px-4 py-6">
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                                                    {category.featured.map((item) => (
                                                        <div key={item.name} className="group relative">
                                                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                                            </div>
                                                            <a href={item.href} className="mt-6 block text-sm font-medium text-gray-900">
                                                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                {item.name}
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative">
                <nav aria-label="Top">
                    <div className="bg-white">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                    <Link href="/">
                                        <Image
                                            className="h-12 w-auto"
                                            src="/namedlogo.png"
                                            alt="kiwi"
                                            width={100}
                                            height={100}
                                        />
                                    </Link>
                                </div>

                                <div className="hidden h-full lg:flex">
                                    <Popover.Group className="inset-x-0 bottom-0 px-4">
                                        <div className="flex h-full justify-center space-x-8">
                                            {navigation.categories.map((category) => (
                                                <Popover key={category.name} className="flex">
                                                    {({ open }) => (
                                                        <>
                                                            <div className="relative flex">
                                                                <Popover.Button
                                                                    className={classNames(
                                                                        open ? 'text-[#468e4d] focus:border-none' : 'text-gray-700 hover:text-gray-800',
                                                                        'relative flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out'
                                                                    )}
                                                                >
                                                                    {category.name}
                                                                    <span
                                                                        className={classNames(
                                                                            open ? 'bg-[#468e4d] focus:border-none' : '',
                                                                            'absolute inset-x-0 -bottom-px z-20 h-0.5 transition duration-200 ease-out'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                </Popover.Button>
                                                            </div>

                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-200"
                                                                enterFrom="opacity-0"
                                                                enterTo="opacity-100"
                                                                leave="transition ease-in duration-150"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >
                                                                <Popover.Panel className="absolute inset-x-0 top-full z-10 bg-white text-sm text-gray-500">
                                                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                                                    {/* Fake border when menu is open */}
                                                                    <div
                                                                        className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                                                                        aria-hidden="true"
                                                                    >
                                                                        <div
                                                                            className={classNames(
                                                                                open ? 'bg-gray-200' : 'bg-transparent',
                                                                                'h-px w-full transition-colors duration-200 ease-out'
                                                                            )}
                                                                        />
                                                                    </div>

                                                                    <div className="relative">
                                                                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                                                            <div className="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                                                                                {category.featured.map((item) => (
                                                                                    <div key={item.name} className="group relative">
                                                                                        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                                                            <img
                                                                                                src={item.imageSrc}
                                                                                                alt={item.imageAlt}
                                                                                                className="object-cover object-center"
                                                                                            />
                                                                                        </div>
                                                                                        <a href={item.href} className="mt-4 block font-medium text-gray-900">
                                                                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                                            {item.name}
                                                                                        </a>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Popover.Panel>
                                                            </Transition>
                                                        </>
                                                    )}
                                                </Popover>
                                            ))}
                                        </div>
                                    </Popover.Group>
                                </div>

                                {/* Mobile menu and search (lg-) */}
                                <div className="flex flex-1 items-center lg:hidden">
                                    <button
                                        type="button"
                                        className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setOpen(true)}
                                    >
                                        <span className="sr-only">Open menu</span>
                                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    {/* Search */}
                                    <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                </div>

                                <Link href="/" className='lg:hidden'>
                                    <Image
                                        className="h-10 w-auto"
                                        src="/namedlogo.png"
                                        alt="kiwi"
                                        width={100}
                                        height={100}
                                    />
                                </Link>

                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <div className="relative">
                    <div aria-hidden="true" className="absolute inset-0 hidden sm:flex sm:flex-col">
                        <div className="relative w-full flex-1 bg-gray-900">
                            <div className="absolute inset-0 overflow-hidden">
                                <Image
                                    src="/background.jpeg"
                                    alt=""
                                    className="h-full w-full object-cover object-center brightness-50"
                                    width={2426}
                                    height={1728}
                                />
                            </div>
                            <div className="absolute inset-0 bg-gray-900 opacity-50" />
                        </div>
                        <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
                    </div>

                    <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
                        <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
                            <div className="relative w-full flex-1 bg-gray-800">
                                <div className="absolute inset-0 overflow-hidden">
                                    <Image
                                        src="/background.jpeg"
                                        alt=""
                                        className="h-full w-full object-cover object-center brightness-50"
                                        width={2426}
                                        height={1728}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gray-900 opacity-50" />
                            </div>
                            <div className="h-48 w-full bg-white" />
                        </div>
                        <div className="relative py-32">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl">KiJournal</h1>
                            <div className="mt-4 sm:mt-6">
                                <a
                                    href="#"
                                    className="inline-block rounded-md border border-transparent bg-[#468e4d] py-3 px-8 font-medium text-white hover:bg-[#47a751] duration-500"
                                >
                                    Conoce nuestro producto
                                </a>
                            </div>
                        </div>
                    </div>

                    <section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0">
                        <h2 id="collection-heading" className="sr-only">
                            Collections
                        </h2>
                        <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-8">
                            {collections.map((collection) => (
                                <div
                                    key={collection.name}
                                    className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-w-3 sm:aspect-h-5 sm:h-auto"
                                >
                                    <div>
                                        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
                                            <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                                                <img
                                                    src={collection.imageSrc}
                                                    alt={collection.imageAlt}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                                        </div>
                                        <div className="absolute inset-0 flex items-end rounded-lg p-6">
                                            <div>
                                                <h3 className="mt-1 font-semibold text-white">
                                                    <a href={collection.href}>
                                                        <span className="absolute inset-0" />
                                                        {collection.name}
                                                    </a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <section aria-labelledby="perks-heading" className="border-t border-gray-200 bg-gray-50">
                    <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
                        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
                            {perks.map((perk) => (
                                <div
                                    key={perk.name}
                                    className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                                >
                                    <div className="md:flex-shrink-0">
                                        <div className="flow-root">
                                            <img className="-my-1 mx-auto h-16 w-auto" src={perk.imageUrl} alt="" />
                                        </div>
                                    </div>
                                    <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                                        <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                                        <p className="mt-3 text-sm text-gray-500">{perk.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer aria-labelledby="footer-heading" className="bg-gray-50">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-gray-200 py-20">
                        <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">

                            <div className="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
                                <img
                                    src="kiwi.png"
                                    alt=""
                                    className="h-16 w-auto"
                                />
                            </div>

                            <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
                                <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Productos</h3>
                                        <ul role="list" className="mt-6 space-y-6">
                                            {footerNavigation.products.map((item) => (
                                                <li key={item.name} className="text-sm">
                                                    <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Empresa</h3>
                                        <ul role="list" className="mt-6 space-y-6">
                                            {footerNavigation.company.map((item) => (
                                                <li key={item.name} className="text-sm">
                                                    <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Servicio al Cliente</h3>
                                    <ul role="list" className="mt-6 space-y-6">
                                        {footerNavigation.customerService.map((item) => (
                                            <li key={item.name} className="text-sm">
                                                <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
                                <h3 className="text-sm font-medium text-gray-900">Suscríbete a nuestro boletín</h3>
                                <p className="mt-6 text-sm text-gray-500">Las últimas ofertas y ahorros, enviados a tu bandeja de entrada semanalmente.</p>
                                <form className="mt-2 flex sm:max-w-md">
                                    <label htmlFor="email-address" className="sr-only">
                                        Dirección de correo electrónico
                                    </label>
                                    <input
                                        id="email-address"
                                        type="text"
                                        autoComplete="email"
                                        required
                                        className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-[#468e4d] focus:outline-none focus:ring-1 focus:ring-[#468e4d]"
                                    />
                                    <div className="ml-4 flex-shrink-0">
                                        <button
                                            type="submit"
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#468e4d] py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-[#47a751] focus:outline-none focus:ring-2 focus:ring-[#468e4d] focus:ring-offset-2 duration-500"
                                        >
                                            Suscribirse
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 py-10 text-center">
                        <p className="text-sm text-gray-500">&copy; 2024 KiJournal. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>

        </div>
    )
}