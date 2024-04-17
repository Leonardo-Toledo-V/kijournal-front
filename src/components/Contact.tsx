import React, { useState, useEffect } from 'react';
import { EnvelopeIcon, PhoneIcon, TrashIcon } from '@heroicons/react/20/solid';


// Define el tipo de datos para una persona
interface Person {
    name: string;
    title: string;
    role: string;
    email: string;
    telephone: string;
}

// Define los datos iniciales de las personas
const initialPeople: Person[] = [
    {
        name: 'Alejandra García',
        title: 'Gerente de Ventas',
        role: 'Admin',
        email: 'alejandragarcia@example.com',
        telephone: '+52-55-1234-5678',
    },

];

export default function Contact() {
    const [modalOpen, setModalOpen] = useState(false);
    const [people, setPeople] = useState<Person[]>(initialPeople);
    const [newPerson, setNewPerson] = useState<Person>({
        name: '',
        title: '',
        role: '',
        email: '',
        telephone: '',
    });

    useEffect(() => {
        const storedPeople = localStorage.getItem('people');
        if (storedPeople) {
            try {
                const parsedPeople = JSON.parse(storedPeople);
                console.log('Personas cargadas del localStorage:', parsedPeople);
                setPeople(parsedPeople);
            } catch (error) {
                console.error('Error parsing stored people:', error);
            }
        } else {
            setPeople([]);
        }
    }, []);

    useEffect(() => {

    }, [people]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setNewPerson({
            name: '',
            title: '',
            role: '',
            email: '',
            telephone: '',
        });
    };

    const addPerson = () => {
        if (
            newPerson.name.trim() === '' ||
            newPerson.title.trim() === '' ||
            newPerson.role.trim() === '' ||
            newPerson.email.trim() === '' ||
            newPerson.telephone.trim() === ''
        ) {
            return;
        }
        setPeople((prevPeople) => {
            const updatedPeople = [...prevPeople, newPerson];
            localStorage.setItem('people', JSON.stringify(updatedPeople));
            return updatedPeople;
        });
        closeModal();
        setNewPerson({
            name: '',
            title: '',
            role: '',
            email: '',
            telephone: '',
        });
    };

    const deletePerson = (index: number) => {
        const updatedPeople = [...people];
        updatedPeople.splice(index, 1);
        setPeople(updatedPeople);
        localStorage.setItem('people', JSON.stringify(updatedPeople));
    };

    return (
        <div>
            <div className="sm:flex sm:items-center mb-6">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Proveedores</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Lista de proveedores de la empresa.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        onClick={openModal}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#468e4d] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#468e4d] focus:outline-none focus:ring-2 focus:ring-[#468e4d] focus:ring-offset-2 sm:w-auto"
                    >
                        Añadir proveedor
                    </button>
                    {/* Botón para borrar todo */}
                </div>
            </div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {people.map((person, index) => (
                    <li key={index} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
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
                            <button
                                type="button"
                                onClick={() => deletePerson(index)}
                                className="text-red-600 hover:text-red-900"
                            >
                                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
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
            {modalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                                <div className="pb-2 mx-auto mr-4">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Añadir Proveedor</h3>
                                        <div className="mt-2">
                                            <form className="space-y-6">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                        Nombre
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            autoComplete="off"
                                                            className="shadow-sm focus:ring-[#468e4d] focus:border-[#468e4d] block w-full sm:text-sm border-gray-300 rounded-md"
                                                            value={newPerson.name}
                                                            onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                        Título
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            id="title"
                                                            autoComplete="off"
                                                            className="shadow-sm focus:ring-[#468e4d] focus:border-[#468e4d] block w-full sm:text-sm border-gray-300 rounded-md"
                                                            value={newPerson.title}
                                                            onChange={(e) => setNewPerson({ ...newPerson, title: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                                        Rol
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            name="role"
                                                            id="role"
                                                            autoComplete="off"
                                                            className="shadow-sm focus:ring-[#468e4d] focus:border-[#468e4d] block w-full sm:text-sm border-gray-300 rounded-md"
                                                            value={newPerson.role}
                                                            onChange={(e) => setNewPerson({ ...newPerson, role: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                        Email
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            autoComplete="off"
                                                            className="shadow-sm focus:ring-[#468e4d] focus:border-[#468e4d] block w-full sm:text-sm border-gray-300 rounded-md"
                                                            value={newPerson.email}
                                                            onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                                                        Teléfono
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="text"
                                                            name="telephone"
                                                            id="telephone"
                                                            autoComplete="off"
                                                            className="shadow-sm focus:ring-[#468e4d] focus:border-[#468e4d] block w-full sm:text-sm border-gray-300 rounded-md"
                                                            value={newPerson.telephone}
                                                            onChange={(e) => setNewPerson({ ...newPerson, telephone: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={addPerson}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#468e4d] text-base font-medium text-white hover:bg-[#3c7d43] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#468e4d] sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Añadir
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
