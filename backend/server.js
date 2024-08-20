import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import userRoutes from './routes/user.route.js'; 

dotenv.config(); // for .env

const app = express(); // express app
app.use(express.json()); // for parsing application/json
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(cors()); // Enable CORS

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

const PORT = process.env.PORT || 5000;
// connect to db
const startServer = async () => {
    try {
        await connectDB(); // Connect to DB
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1); // Exit with failure
    }
};

startServer();