'use client'

import React, { useState } from 'react';
import axios from 'axios';
const Page = ({ params }: { params: { id: string } }) => {


    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState('Selecciona un archivo ZIP');


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;


        if (!file) {
            alert('Por favor sube el archivo ZIP y proporciona el fiscalProfileId');
            return;
        }

        // Crear un objeto FormData para enviar el archivo y el fiscalProfileId
        const formData = new FormData();
        formData.append('zipFile', file);
        formData.append('fiscalProfileId', params.id);
        try {
            // Realizar la solicitud POST usando axios o fetch
            const response = await axios.post(`${apiUrl}/api/v1/facturas`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Respuesta del servidor:', response.data);
            alert('Factura subida con éxito');
        } catch (error) {
            console.error('Error subiendo la factura:', error);
            alert('Hubo un error al subir la factura');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Subir Factura</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Archivo ZIP:</label>
                    <div className="flex items-center space-x-4">
                        <label className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer">
                            Seleccionar Archivo
                            <input
                                type="file"
                                accept=".zip"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        <span
                            className="text-gray-700">{fileName}</span>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Subir Factura
                </button>
            </form>
        </div>
    );
};

export default Page;