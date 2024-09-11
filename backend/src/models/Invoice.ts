import { Model, Column, Table, ForeignKey, BelongsTo, PrimaryKey, Default, DataType } from 'sequelize-typescript';
import { FiscalProfile } from './FiscalProfile';

@Table
export class Invoice extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;

    @ForeignKey(() => FiscalProfile)
    @Column(DataType.UUID)
    fiscalProfileId!: string;

    @Column(DataType.JSON)
    details!: object;

    @BelongsTo(() => FiscalProfile)
    fiscalProfile!: FiscalProfile;
}
