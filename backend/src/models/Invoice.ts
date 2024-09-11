import {Model, Column, Table, ForeignKey, BelongsTo, PrimaryKey, Default, DataType} from 'sequelize-typescript';
import {FiscalProfile} from './FiscalProfile';

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
        allowNull: false,
    })
    nombreEmisor!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    rfcReceptor!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
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
        allowNull: false,
    })
    ivaTrasladado!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    total!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    metodoDePago!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    formaDePago!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true, // Opcional
    })
    moneda?: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: true, // Opcional
    })
    tipoDeCambio?: number;

    @Column(DataType.TEXT)
    xml!: string;

    @BelongsTo(() => FiscalProfile)
    fiscalProfile!: FiscalProfile;
}
