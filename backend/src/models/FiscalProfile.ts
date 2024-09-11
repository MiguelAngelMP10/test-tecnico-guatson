import {Model, Column, Table, HasMany, PrimaryKey, Default, DataType} from 'sequelize-typescript';
import {Invoice} from './Invoice';

@Table
export class FiscalProfile extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @Column(DataType.STRING)
    rfc!: string;

    @Column(DataType.STRING)
    commercialName!: string;

    @Column(DataType.STRING)
    taxRegimeCode!: string;

    @HasMany(() => Invoice)
    invoices!: Invoice[];
}
