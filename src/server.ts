'use strict';

//core modules
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as fs from 'fs';

// Utility classes and middleware
import { Logger } from './utils/logger';
import { AllowCORS } from './express-middleware/allow-cors';

// Routes
import * as userRoutes from './routes/user.routes';

class Server {
    public app: express.Application;

    // configures the server and registers routes
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config() {
        this.app.use(bodyParser.json());

        // Allow Cross Origin Resource Sharing
        let allowCORS = new AllowCORS();
        this.app.use(allowCORS.allowCrossDomainRequests);

        // Configurations from the root location
        const Config = require(path.resolve(__dirname, '../config.json'));

        // Initialize servers for the app
        let httpServer = http.createServer(this.app);
        mongoose.connect('mongodb://localhost/story-board');
        mongoose.connection.on('error', function() {
            console.log('error');
        });
        mongoose.connection.once('open', function () {
            console.log('open');
        });
        // Listed on http port
        Logger.setDebugMode(Config.debug);
        httpServer.listen(Config.http.port, () => {
            Logger.log('Http Server is listening on port ' + Config.http.port);
        });
    }

    //Register routes for the server
    private routes() {
        this.app.use('/user', userRoutes);
    }
}

const server = new Server();
export = server.app;
