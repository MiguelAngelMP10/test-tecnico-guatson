import express from 'express';
import cors from 'cors';
import routes from "./routes";
import {connectDB} from './models';

import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar CORS de forma predeterminada (permite todas las solicitudes)
app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});
