import {Sequelize} from 'sequelize-typescript';
import {Invoice} from './Invoice';
import {FiscalProfile} from './FiscalProfile';
import * as dotenv from 'dotenv';

dotenv.config();
export const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT as any,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    models: [FiscalProfile, Invoice],
});

// Sincronizar los modelos con la base de datos
export const connectDB = async () => {
    try {
        await sequelize.sync({force: false}); // No forzamos recreación de tablas
        console.log('Base de datos conectada y sincronizada');
    } catch (error) {
        console.error('Error conectando la base de datos:', error);
    }
};
