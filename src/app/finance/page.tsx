'use client'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { classNames } from '@/utilities/classNames'
import {
    Bars3Icon,
    UserGroupIcon,
    XMarkIcon,
    ArchiveBoxIcon,
    BanknotesIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import Finances from '@/components/Finances'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

const navigation = [
    { name: 'Inventario', href: '/inventory', icon: ArchiveBoxIcon, current: false },
    { name: 'Finanzas', href: '/finance', icon: BanknotesIcon, current: true },
    { name: 'Proovedores', href: '/suppliers', icon: UserGroupIcon, current: false },
]

export default function FinancePage() {
    const router = useRouter();

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

    const [userLogged, setUserLogged] = useState<any>({})

    useEffect(() => {
        const user = localStorage.getItem("userLogged");
        setUserLogged(JSON.parse(user || "{}"));
    }, [])

    if (userLogged.email === undefined) { return <div>Debes iniciar sesión</div> }

    const handleLogout = () => {
        localStorage.removeItem("userLogged");
        setTimeout(() => {
            router.push("/")
        }, 1000);
    }



    return (
        <div className='h-screen'>
            <div className="flex h-full">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                        <div className="flex flex-shrink-0 items-center px-4">
                                            <Image
                                                className="h-10 w-auto"
                                                src="/kiwi.png"
                                                alt="kiwi"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <nav aria-label="Sidebar" className="mt-5">
                                            <div className="space-y-1 px-2">
                                                {navigation.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-gray-100 text-gray-900'
                                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                        )}
                                                    >
                                                        <item.icon
                                                            className={classNames(
                                                                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                                'mr-4 h-6 w-6'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </nav>
                                    </div>
                                    <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                                        <div className="flex items-center justify-between">
                                            <Link href="/profile" className='flex items-center'>
                                                <div>
                                                    <Image
                                                        className="inline-block h-10 w-10 rounded-full object-cover"
                                                        src="/kiwi-profile.png"
                                                        alt="kiwi"
                                                        width={1408}
                                                        height={1080}
                                                    />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{userLogged.email}</p>
                                                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                                                </div>
                                            </Link>
                                            <button onClick={handleLogout} className='flex flex-end'>
                                                <ArrowRightStartOnRectangleIcon className='w-auto h-6 text-red-400' />
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="w-14 flex-shrink-0" aria-hidden="true">
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
                <div className="hidden lg:flex lg:flex-shrink-0">
                    <div className="flex w-64 flex-col">
                        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100">
                            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                                <div className="flex justify-center items-center px-4">
                                    <Link
                                        href="/"
                                        className='cursor-pointer'
                                    >
                                        <Image
                                            className="h-16 w-auto"
                                            src="/kiwi.png"
                                            alt="kiwi"
                                            width={100}
                                            height={100}
                                        />
                                    </Link>
                                </div>
                                <nav className="mt-5 flex-1" aria-label="Sidebar">
                                    <div className="space-y-1 px-2">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-200 text-gray-900'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                        'mr-3 h-6 w-6'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </nav>
                            </div>
                            <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                                <div className="group block w-full flex-shrink-0">
                                    <div className="flex items-center justify-between">
                                        <Link href="/profile" className='flex items-center'>
                                            <div>
                                                <Image
                                                    className="inline-block h-10 w-10 rounded-full object-cover"
                                                    src="/kiwi-profile.png"
                                                    alt="kiwi"
                                                    width={1408}
                                                    height={1080}
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{userLogged.email}</p>
                                                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                                            </div>
                                        </Link>
                                        <button onClick={handleLogout} className='flex flex-end'>
                                            <ArrowRightStartOnRectangleIcon className='w-auto h-6 text-red-400' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                    <div className="lg:hidden">
                        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
                            <div>
                                <Image
                                    className="h-8 w-auto"
                                    src="/kiwi.png"
                                    alt="Your Company"
                                    width={500}
                                    height={500}
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <span className="sr-only">Open sidebar</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-0 flex flex-1 overflow-hidden">
                        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
                            <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                                <Finances />
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}