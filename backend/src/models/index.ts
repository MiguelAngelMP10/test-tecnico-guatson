import {Sequelize} from 'sequelize-typescript';
import {Invoice} from './Invoice';
import {FiscalProfile} from './FiscalProfile';

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    database: 'test_tecnico_guatson',
    username: 'root',
    password: '159753',
    port: 3306,
    models: [FiscalProfile, Invoice],  // Agregamos los modelos
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
