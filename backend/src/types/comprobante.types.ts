export interface Comprobante {
    attributes: {
        Version: string;
        Serie?: string;
        Folio?: string;
        Fecha: string;
        Sello: string;
        FormaPago?: string;
        NoCertificado: string;
        Certificado: string;
        SubTotal: string;
        Moneda: string;
        Total: string;
        TipoDeComprobante: string;
        MetodoPago?: string;
        LugarExpedicion: string;
    };
    Emisor: Emisor;
    Receptor: Receptor;
    Conceptos: {
        Concepto: Concepto[];
    };
    Impuestos: {
        Traslados: {
            Traslado: Traslado[];
        };
        attributes: {
            TotalImpuestosTrasladados: string;
        };
    };
    Complemento?: Complemento;
}

export interface Emisor {
    attributes: {
        Rfc: string;
        Nombre: string;
        RegimenFiscal: string;
    };
}

export interface Receptor {
    attributes: {
        Rfc: string;
        Nombre: string;
        UsoCFDI: string;
    };
}

export interface Concepto {
    attributes: {
        ClaveProdServ: string;
        Cantidad: string;
        ClaveUnidad: string;
        Descripcion: string;
        ValorUnitario: string;
        Importe: string;
    };
}

export interface Traslado {
    attributes: {
        Impuesto: string;
        TipoFactor: string;
        TasaOCuota: string;
        Importe: string;
    };
}

export interface TimbreFiscalDigital {
    attributes: {
        Version: string;
        UUID: string;
        FechaTimbrado: string;
        SelloCFD: string;
        SelloSAT: string;
        NoCertificadoSAT: string;
    }
}

export interface Complemento {
    TimbreFiscalDigital?: TimbreFiscalDigital;
}