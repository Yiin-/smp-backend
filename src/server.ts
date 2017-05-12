import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import { NestFactory } from 'nest.js';
import { ApplicationModule } from './modules/app.module';

const instance = express();
instance.use(bodyParser.json());
instance.use(cors());

const app = NestFactory.create(ApplicationModule, instance);
const port = 3000;

app.listen(port, () => {
    console.log('Application listen on port:', port);
    // process.exit();
});