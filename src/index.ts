import { Hono } from "hono";
import { DatabaseManager } from "server/DbManagement";
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT; 
