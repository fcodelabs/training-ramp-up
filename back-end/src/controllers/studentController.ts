import express from 'express';
import { Request, Response } from 'express';

const app = express();
async function test(req:Request, res:Response) {
    console.log("test");
    res.send('Application works!');
    
}

module.exports = {test};	