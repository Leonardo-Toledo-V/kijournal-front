'use client'
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

interface Finance {
    id: number;
    gastos: number;
    ventas: number;
    ganancias: number;
}

export default function Finances() {
    const [currentPage, setCurrentPage] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [newExpense, setNewExpense] = useState('');
    const [newSale, setNewSale] = useState('');
    const [finances, setFinances] = useState<Finance[]>([]);
    const [selectedFinance, setSelectedFinance] = useState<Finance | null>(null);

    useEffect(() => {
        const storedFinances = localStorage?.getItem('finances');
        if (storedFinances) {
            try {
                const parsedFinances = JSON.parse(storedFinances);
                setFinances(parsedFinances);
            } catch (error) {
                console.error('Error parsing stored finances:', error);
            }
        } else {
            setFinances([]);
        }
    }, []);

    useEffect(() => {
        if (finances.length > 0) {
            localStorage?.setItem('finances', JSON.stringify(finances));
        }
    }, [finances]);

    const itemsPerPage = 6;
    const totalPages = Math.ceil(finances.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, finances.length);
    const currentFinances = finances.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setNewExpense('');
        setNewSale('');
    };

    const addFinance = () => {
        if (newExpense.trim() === '' || isNaN(parseFloat(newExpense)) || parseFloat(newExpense) <= 0 ||
            newSale.trim() === '' || isNaN(parseFloat(newSale)) || parseFloat(newSale) <= 0) {
            return;
        }
        const newId = finances.length > 0 ? finances[finances.length - 1].id + 1 : 1;
        const newFinanceObject = {
            id: newId,
            gastos: parseFloat(newExpense),
            ventas: parseFloat(newSale),
            ganancias: parseFloat(newSale) - parseFloat(newExpense),
        };

        setFinances([...finances, newFinanceObject]);
        closeModal();
    };

    const openEditModal = (finance: Finance) => {
        setSelectedFinance(finance);
        setNewExpense(finance.gastos.toString());
        setNewSale(finance.ventas.toString());
        setModalOpen(true);
    };

    const editFinance = () => {
        if (selectedFinance && newExpense.trim() !== '' && !isNaN(parseFloat(newExpense)) && parseFloat(newExpense) > 0 &&
            newSale.trim() !== '' && !isNaN(parseFloat(newSale)) && parseFloat(newSale) > 0) {
            const updatedFinances = finances.map((finance) => {
                if (finance.id === selectedFinance.id) {
                    return {
                        ...finance,
                        gastos: parseFloat(newExpense),
                        ventas: parseFloat(newSale),
                        ganancias: parseFloat(newSale) - parseFloat(newExpense),
                    };
                }
                return finance;
            });
            setFinances(updatedFinances);
            closeModal();
        } else if (!selectedFinance && newExpense.trim() !== '' && !isNaN(parseFloat(newExpense)) && parseFloat(newExpense) > 0 &&
            newSale.trim() !== '' && !isNaN(parseFloat(newSale)) && parseFloat(newSale) > 0) {
            const newId = finances.length > 0 ? finances[finances.length - 1].id + 1 : 1;
            const newFinanceObject = {
                id: newId,
                gastos: parseFloat(newExpense),
                ventas: parseFloat(newSale),
                ganancias: parseFloat(newSale) - parseFloat(newExpense),
            };
            setFinances([...finances, newFinanceObject]);
            closeModal();
        }
    };

    const deleteFinance = (financeId: number) => {
        const updatedFinances = finances.filter(finance => finance.id !== financeId);
        setFinances(updatedFinances);
    };

    const deleteAllFinances = () => {
        localStorage?.removeItem('finances');
        setFinances([]);
        window.location.reload();
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-16">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Finanzas</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Aquí puedes llevar un registro de tus gastos y ventas.
                    </p>
                    <div className="mt-4 flex justify-start">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className="bg-[#468e4d] text-white px-1 py-1 text-sm rounded-md mr-2 cursor-pointer"
                        >
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                            className="bg-[#468e4d] text-white px-1 py-1 text-sm rounded-md cursor-pointer"
                        >
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        onClick={openModal}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#468e4d] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#468e4d] focus:outline-none focus:ring-2 focus:ring-[#468e4d] focus:ring-offset-2 sm:w-auto duration-300 transition-all"
                    >
                        Añadir
                    </button>
                    <button
                        type="button"
                        onClick={deleteAllFinances}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#8e4646] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#c66060] focus:outline-none focus:ring-2 focus:ring-[#8e4646] focus:ring-offset-2 sm:w-auto duration-300 transition-all ml-4"
                    >
                        Borrar todo
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Gastos
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Ventas
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Ganancias
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Editar</span>
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Eliminar</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {currentFinances.length > 0 ? (
                                        currentFinances.map((finance) => (
                                            <tr key={finance.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {finance.gastos.toLocaleString('es-MX', {
                                                        style: 'currency',
                                                        currency: 'MXN'
                                                    })}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                                    {finance.ventas.toLocaleString('es-MX', {
                                                        style: 'currency',
                                                        currency: 'MXN'
                                                    })}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                                    {finance.ganancias.toLocaleString('es-MX', {
                                                        style: 'currency',
                                                        currency: 'MXN'
                                                    })}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <button
                                                        className="text-[#468e4d] hover:text-[#468e4d]"
                                                        onClick={() => openEditModal(finance)}
                                                    >
                                                        Editar
                                                    </button>
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <button
                                                        className="text-[#468e4d] hover:text-[#468e4d]"
                                                        onClick={() => deleteFinance(finance.id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="text-center py-4 text-gray-500">No hay finanzas disponibles</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                                <div className="pb-2 mx-auto mr-4">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Registrar finanza</h3>
                                        <div className="mt-2">
                                            <form className="space-y-6">
                                                <div>
                                                    <label htmlFor="expense" className="block text-sm font-medium text-gray-700">
                                                        Gastos
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="number"
                                                            name="expense"
                                                            id="expense"
                                                            autoComplete='off'
                                                            className="shadow-sm focus:ring-[#468e4d] focus:border-[#468e4d] block w-full sm:text-sm border-gray-300 rounded-md"
                                                            placeholder="Gasto generado MXN"
                                                            value={newExpense}
                                                            onChange={(e) => setNewExpense(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="sale" className="block text-sm font-medium text-gray-700">
                                                        Ventas
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="number"
                                                            name="sale"
                                                            id="sale"
                                                            autoComplete='off'
                                                            className="shadow-sm focus:ring-[#468e4d] focus:border-[#468e4d] block w-full sm:text-sm border-gray-300 rounded-md"
                                                            placeholder="Ventas generadas MXN"
                                                            value={newSale}
                                                            onChange={(e) => setNewSale(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                {selectedFinance ? (
                                    <>
                                        <button
                                            onClick={editFinance}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#468e4d] text-base font-medium text-white hover:bg-[#2f693e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#468e4d] sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={addFinance}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#468e4d] text-base font-medium text-white hover:bg-[#2f693e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#468e4d] sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
