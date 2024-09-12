'use client'
import {useState} from 'react'

const CreateProfile = () => {
    const [rfc, setRfc] = useState('');
    const [commercialName, setCommercialName] = useState('');
    const [taxRegimeCode, setTaxRegimeCode] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/v1/perfiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rfc,
                    commercialName,
                    taxRegimeCode,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('Registro creado con éxito');
            } else {
                setMessage('Error al crear el registro');
            }
        } catch (error) {
            setMessage('Error de red');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Crear Nuevo Perfil</h1>
            <form onSubmit={handleSubmit} className="bg-opacity-50 bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="rfc" className="block text-gray-700">RFC</label>
                    <input
                        type="text"
                        id="rfc"
                        value={rfc}
                        onChange={(e) => setRfc(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="commercialName" className="block text-gray-700">Nombre Comercial</label>
                    <input
                        type="text"
                        id="commercialName"
                        value={commercialName}
                        onChange={(e) => setCommercialName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="taxRegimeCode" className="block text-gray-700">Código de Régimen Fiscal</label>
                    <select
                        id="taxRegimeCode"
                        value={taxRegimeCode}
                        onChange={(e) => setTaxRegimeCode(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        required
                    >
                        <option value="" disabled>Selecciona un código</option>
                        <option value="601">601 - General de Ley Personas Morales</option>
                        <option value="603">603 - Personas Morales con Fines no Lucrativos</option>
                        <option value="605">605 - Sueldos y Salarios</option>
                        <option value="606">606 - Arrendamiento</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Crear Registro
                </button>
            </form>
            {message && <p className="mt-4 text-lg text-gray-800">{message}</p>}
        </div>
    );
};

export default CreateProfile;