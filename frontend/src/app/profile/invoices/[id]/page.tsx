'use client'

import {useState, useEffect} from 'react'

const page = ({params}: { params: { id: string } }) => {

    interface invoice {
        id: string;
        fiscalProfileId: string;
        uuid: string;
        serie: string;
        folio: string;
        rfcEmisor: string;
        nombreEmisor: string;
        rfcReceptor: string;
        nombreReceptor: string;
        tipoDeComprobante: string;
        subtotal: number;
        total: number;
        metodoDePago: string;
        formaDePago: string;
        moneda: string;
        xml: string;
        createdAt: Date;
        updatedAt: Date;
    }

    interface ivaCalculo {
        ivaEmitido: string;
        ivaRecibido: string;
        saldoFinalIva: string;
    }

    const [invoices, setInvoices] = useState<invoice[]>([]);
    const [ivaCalculo, setIvaCalculo] = useState<ivaCalculo | undefined>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/v1/facturas?page=1&pageSize=1000&fiscalProfileId=${params.id}`);
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json();
                setInvoices(data.data);
                setLoading(false);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        fetchInvoices()
    }, []);

    useEffect(() => {
        const fetchIvaCalculo = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/v1/iva-calculo/${params.id}`);
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json();
                setIvaCalculo(data)

                setLoading(false);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };
        fetchIvaCalculo();
    }, []);


    if (loading) return <p>Loading invoices...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container-fluid mx-auto p-6">
            <h1 className="text-3xl text-center my-7 font-bold">Invoices</h1>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-500 p-4">IVA adeudado: $ {ivaCalculo?.ivaEmitido}</div>
                <div className="bg-green-500 p-4">IVA a recuperar: $ {ivaCalculo?.ivaRecibido}</div>
                <div className="bg-red-500 p-4">Saldo final: $ {ivaCalculo?.saldoFinalIva}</div>
            </div>


            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Uuid</th>
                                    <th scope="col" className="px-6 py-4">Serie</th>
                                    <th scope="col" className="px-6 py-4">Folio</th>
                                    <th scope="col" className="px-6 py-4">RFC Emisor</th>
                                    <th scope="col" className="px-6 py-4">Nombre Emisor</th>
                                    <th scope="col" className="px-6 py-4">RFC Receptor</th>
                                    <th scope="col" className="px-6 py-4">Nombre Receptor</th>
                                    <th scope="col" className="px-6 py-4">Tipo De Comprobante</th>
                                    <th scope="col" className="px-6 py-4">Metodo De Pago</th>
                                    <th scope="col" className="px-6 py-4">Forma De Pago</th>
                                    <th scope="col" className="px-6 py-4">Moneda</th>
                                </tr>
                                </thead>
                                <tbody>
                                {invoices.map((perfil) => (
                                    <tr key={perfil.id}
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{perfil.id}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.uuid}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.serie}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.folio}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.rfcEmisor}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.nombreEmisor}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.rfcReceptor}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.nombreReceptor}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.tipoDeComprobante}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.metodoDePago}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.formaDePago}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{perfil.moneda}</td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default page;