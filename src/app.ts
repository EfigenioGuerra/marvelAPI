import express from 'express';
import mongoose from 'mongoose';
import { routes } from './routes';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.database();
        this.setupRoutes(); 
    }

    public middleware() {
        this.express.use(express.json());
    }

    public async database() {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/marvel-ultron-api');
            console.log("Sucesso ao conectar-se com o banco de dados");
        } catch (error) {
            console.error("Falha ao conectar-se com o banco de dados/ error: ", error);
        }
    }

    public setupRoutes() { 
        this.express.use(routes);
    }
}

export default new App().express;