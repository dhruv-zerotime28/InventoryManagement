import express from 'express';
import helmet from 'helmet';
import cookieParser from "cookie-parser"
import { ConnectDb } from './db/db.connection.js';
import productRoutes from './routes/products.routes.js';
import Errorhandler from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import cors from "cors";

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 
    'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
    }

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cookieParser())

app.use(helmet())

ConnectDb()

app.use(cors(corsOptions))

app.get("/api/test",(req,res)=>{
    res.status(200).json({msg:"Connected "})
})
app.use('/api',productRoutes);

app.use('/api/auth',authRoutes);

app.use(Errorhandler);


export default app;   