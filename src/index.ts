import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';


dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('API is running on port', PORT);
    console.log('TURSO_URL:', process.env.TURSO_URL);
})