import {Comprobante} from "../types/comprobante.types";
import {parseStringPromise, processors} from "xml2js";

export async function parseCFDI(xmlString: string): Promise<Comprobante | undefined> {
    try {
        const options = {
            explicitArray: false,
            attrkey: 'attributes',
            tagNameProcessors: [processors.stripPrefix],
            attrNameProcessors: [processors.stripPrefix]
        };

        const result = await parseStringPromise(xmlString, options) as { Comprobante: Comprobante };
        return result.Comprobante;
    } catch (error) {
        console.error('Error al parsear el XML:', error);
        return undefined;
    }
}
