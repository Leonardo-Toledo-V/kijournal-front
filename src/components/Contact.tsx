import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';

const people = [
    {
        name: 'Alejandra García',
        title: 'Gerente de Ventas',
        role: 'Admin',
        email: 'alejandragarcia@example.com',
        telephone: '+52-55-1234-5678',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Josefa Hernández',
        title: 'Analista de Marketing',
        role: 'User',
        email: 'josehernandez@example.com',
        telephone: '+52-55-8765-4321',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        name: 'Mario Rodríguez',
        title: 'Desarrollador Web',
        role: 'User',
        email: 'mariarodriguez@example.com',
        telephone: '+52-55-2468-1357',
        imageUrl: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        name: 'Juan Morales',
        title: 'Especialista en Finanzas',
        role: 'User',
        email: 'juanmorales@example.com',
        telephone: '+52-55-3698-7412',
        imageUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        name: 'Gabriel Martínez',
        title: 'Diseñador Gráfico',
        role: 'User',
        email: 'gabrielamartinez@example.com',
        telephone: '+52-55-9876-5432',
        imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        name: 'Luis Vargas',
        title: 'Asistente Administrativo',
        role: 'User',
        email: 'luisavargas@example.com',
        telephone: '+52-55-6543-9876',
        imageUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];


export default function Contact() {

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((person) => (
                <li key={person.email} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                        <div className="flex-1 truncate">
                            <div className="flex items-center space-x-3">
                                <h3 className="truncate text-sm font-medium text-gray-900">{person.name}</h3>
                                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                    {person.role}
                                </span>
                            </div>
                            <p className="mt-1 truncate text-sm text-gray-500">{person.title}</p>
                        </div>
                        <Image
                            width={500}
                            height={500}
                            className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 object-cover" src={person.imageUrl} alt="" />
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                                <a
                                    href={`mailto:${person.email}`}
                                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                                >
                                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-3">Email</span>
                                </a>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                                <a
                                    href={`tel:${person.telephone}`}
                                    className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                                >
                                    <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-3">Call</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
