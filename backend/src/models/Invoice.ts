import {Model, Column, Table, ForeignKey, BelongsTo, PrimaryKey, Default, DataType} from 'sequelize-typescript';
import {FiscalProfile} from './FiscalProfile';
import sequelizePaginate from 'sequelize-paginate';


@Table
export class Invoice extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @ForeignKey(() => FiscalProfile)
    @Column(DataType.UUID)
    fiscalProfileId!: string;

    @Column(DataType.UUID)
    uuid!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    serie?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    folio!: string;


    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    rfcEmisor!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    nombreEmisor!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    rfcReceptor!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    nombreReceptor!: string;

    @Column({
        type: DataType.STRING(1),
        allowNull: false,
    })
    tipoDeComprobante!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    subtotal!: number;


    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    total!: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    metodoDePago!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    formaDePago!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    moneda?: string;


    @Column(DataType.TEXT)
    xml!: string;

    @BelongsTo(() => FiscalProfile)
    fiscalProfile!: FiscalProfile;


}

// @ts-ignore
sequelizePaginate.paginate(Invoice);
