import {Request, Response} from 'express';
import {install} from '@nodecfdi/cfdiutils-common';
import {
    DOMImplementation,
    XMLSerializer,
    DOMParser
} from '@xmldom/xmldom';
// @ts-ignore
import {JsonConverter} from '@nodecfdi/cfdi-to-json';

import unzipper from 'unzipper';
import {PassThrough} from 'stream';


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
                    entry.on('end', () => {
                        const fileBuffer = Buffer.concat(chunks);
                        fileContents[fileName] = fileBuffer.toString('utf8');

                        const xml = fileBuffer.toString('utf8');
                        const json = JsonConverter.convertToJson(xml);
                        console.log(json, req.body.fiscalProfileId);





                    });
                } else {
                    entry.autodrain(); // Ignorar directorios
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