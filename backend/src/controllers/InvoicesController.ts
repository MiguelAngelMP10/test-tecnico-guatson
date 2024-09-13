import {Request, Response} from 'express';
import {install} from '@nodecfdi/cfdiutils-common';
import {Cleaner} from '@nodecfdi/cfdi-cleaner';
import {DOMImplementation, DOMParser, XMLSerializer} from '@xmldom/xmldom';
import {Invoice} from '../models/Invoice';
import unzipper from 'unzipper';
import {PassThrough} from 'stream';
import {parseCFDI} from "../helpers/ParseCFDI"

export const getInvoices = async (req: Request, res: Response) => {

    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;

        const options = {
            page,
            paginate: pageSize,
            order: [['createdAt', 'DESC']],
            where: { fiscalProfileId: req.query.fiscalProfileId },
        };

        // @ts-ignore
        const {docs, pages, total} = await Invoice.paginate(options);

        res.json({
            data: docs,
            totalItems: total,
            totalPages: pages,
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({message: 'Error al obtener invoices', error});
    }
};


export const uploadZip = (req: Request, res: Response) => {
    // @ts-ignore
    install(new DOMParser(), new XMLSerializer(), new DOMImplementation());

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // Crear un flujo de lectura a partir del buffer del archivo
        const zipStream = unzipper.Parse();
        const bufferStream = new PassThrough();
        bufferStream.end(req.file.buffer);

        const fileContents: { [filename: string]: string } = {};

        bufferStream
            .pipe(zipStream)
            .on('entry', async (entry: any) => {
                const fileName = entry.path;
                const type = entry.type; // 'Directory' or 'File'

                if (type === 'File') {
                    // Leer el contenido del archivo
                    const chunks: Buffer[] = [];
                    entry.on('data', (chunk: Buffer) => chunks.push(chunk));
                    entry.on('end', async () => {
                        const fileBuffer = Buffer.concat(chunks);
                        fileContents[fileName] = fileBuffer.toString('utf8');
                        const xml = fileBuffer.toString('utf8');
                        const resultCleaned = Cleaner.staticClean(xml);
                        let cfdi = await parseCFDI(resultCleaned)

                        let data = {
                            'fiscalProfileId': req.body.fiscalProfileId,
                            'uuid': cfdi?.Complemento?.TimbreFiscalDigital?.attributes.UUID,
                            'serie': cfdi?.attributes.Serie,
                            'folio': cfdi?.attributes.Folio,
                            'rfcEmisor': cfdi?.Emisor.attributes.Rfc,
                            'nombreEmisor': cfdi?.Emisor.attributes.Nombre,
                            'rfcReceptor': cfdi?.Emisor.attributes.Rfc,
                            'nombreReceptor': cfdi?.Emisor.attributes.Nombre,
                            'tipoDeComprobante': cfdi?.attributes.TipoDeComprobante,
                            'subtotal': cfdi?.attributes.SubTotal,
                            'total': cfdi?.attributes.Total,
                            'metodoDePago': cfdi?.attributes.MetodoPago,
                            'formaDePago': cfdi?.attributes.FormaPago,
                            'moneda': cfdi?.attributes.Moneda,
                            'xml': xml

                        };
                        const invoice = await Invoice.create(data);
                    });
                } else {
                    entry.autodrain();
                }
            })
            .on('finish', () => {

                const fileNames = Object.keys(fileContents);
                const response = {
                    totalFiles: fileNames.length,
                    fileNames: fileNames
                };

                res.json({
                    status: 200,
                    message: 'Successfully uploaded',
                    data: response,
                });
            })
            .on('error', (error: any) => {
                console.error('Error al procesar el archivo ZIP:', error);
                res.status(500).send('Error al procesar el archivo ZIP.');
            });

    } catch (error) {
        console.error('Error al procesar el archivo ZIP:', error);
        res.status(500).send('Error al procesar el archivo ZIP.');
    }
};


