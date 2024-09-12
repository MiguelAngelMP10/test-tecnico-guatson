'use client'

import {useState, useEffect} from 'react'

interface Perfil {
    id: string;
    rfc: string;
    commercialName: string;
    taxRegimeCode: string;
    createdAt: Date;
    updatedAt: Date;

}

export default function Page() {
    const [perfiles, setPerfiles] = useState<Perfil[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPerfiles = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/v1/perfiles');
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json();
                setPerfiles(data);
                setLoading(false);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        fetchPerfiles()
    }, []);

    if (loading) return <p>Cargando perfiles...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-6">

            <h1 className="text-2xl text-center my-7">Lista de Perfiles</h1>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">RFC</th>
                                    <th scope="col" className="px-6 py-4">Commercial Name</th>
                                    <th scope="col" className="px-6 py-4">Regimen Code</th>
                                </tr>
                                </thead>
                                <tbody>
                                {perfiles.map((perfil) => (
                                    <tr key={perfil.id}
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{perfil.id}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.rfc}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.commercialName}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.taxRegimeCode}</td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ul>


            </ul>
        </div>

    );
}
