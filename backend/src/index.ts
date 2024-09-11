import express from 'express';
import routes from "./routes";
import {connectDB} from './models';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1', routes);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});
