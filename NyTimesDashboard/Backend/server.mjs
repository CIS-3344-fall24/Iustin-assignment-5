import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // This line loads the environment variables from the .env file
const app = express(); // Creates an Express application instance
const apiKey = process.env.NYT_API_KEY // Accessing the API key from the environment variables

