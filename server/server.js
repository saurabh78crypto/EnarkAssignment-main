const express = require('express');
import moment from "moment";
import cors from "cors"
import { Router } from './router';

require('./db/conn');

const app = express();

const { PORT, CORS_ORIGIN, CORS_METHODS } = process.env;
const corsOptions = { 
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type'] 
};

app.use(express.json());

app.listen(PORT, () => {
    console.log(
        `Server is up and running on port ${PORT} on ${moment().format(
            "DD-MMM-YYYY-T-HH:mm:ss.S"
        )}`
    );
});

// Cross Origin setup
app.use(cors(corsOptions));

// Body Parsing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


app.use('/', Router)

export { app }