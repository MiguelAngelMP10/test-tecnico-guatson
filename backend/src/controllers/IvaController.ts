import {Request, Response} from 'express';
import {Comprobante, Traslado} from "../types/comprobante.types";
import {FiscalProfile} from "../models/FiscalProfile";
import {Invoice} from "../models/Invoice";
import {parseCFDI} from "../helpers/ParseCFDI"

export const ivaCalculation = async (req: Request, res: Response) => {
    try {
        const fiscalProfile = await FiscalProfile.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Invoice,
                as: "invoices",
            }]
        });

        if (!fiscalProfile || !fiscalProfile.invoices) {
            res.status(404).json({message: 'No se encontraron facturas emitidas'});
            return;
        }

        const ivaEmitido = await calcularIVAEmitido(fiscalProfile.invoices);
        const ivaRecibido = await calcularIVARecibido(fiscalProfile.invoices);

        res.json({ivaEmitido, ivaRecibido, saldoFinalIva: ivaEmitido - ivaRecibido});
    } catch (error) {
        res.status(500).json({message: 'Error del servidor', error});
    }


};


const calcularIVAEmitido = async (facturasEmitidas: any[]): Promise<number> => {
    let ivaAdeudado = 0.0;

    for (const factura of facturasEmitidas) {
        const cfdi = await parseCFDI(factura.xml);

        if (cfdi?.attributes.TipoDeComprobante === 'I' && Array.isArray(cfdi?.Impuestos?.Traslados?.Traslado)) {
            cfdi.Impuestos.Traslados.Traslado.forEach((traslado: Traslado) => {
                if (traslado.attributes.Impuesto === '002' && traslado.attributes.TipoFactor === 'Tasa') {
                    ivaAdeudado += parseFloat(traslado.attributes.Importe);
                }
            });
        }
    }

    return ivaAdeudado;
};
const calcularIVARecibido = async (facturasRecibidas: any[]): Promise<number> => {
    let ivaARecuperar = 0;

    for (const factura of facturasRecibidas) {
        const cfdi = await parseCFDI(factura.xml);

        // Verificar que el tipo de comprobante sea 'I' (Ingreso) o 'E' (Egreso)
        if (['E', 'I',].includes(<string>cfdi?.attributes.TipoDeComprobante) && Array.isArray(cfdi?.Impuestos?.Traslados?.Traslado)) {
            cfdi?.Impuestos.Traslados.Traslado.forEach((traslado: Traslado) => {
                if (traslado.attributes.Impuesto === '002' && traslado.attributes.TipoFactor === 'Tasa') {
                    ivaARecuperar += parseFloat(traslado.attributes.Importe);
                }
            });
        }
    }

    return ivaARecuperar;
};
