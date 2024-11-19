import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const apiKey = process.env.NYT_API_KEY // Accessing the API key from the environment variables


//Applies the CORS middleware to the app, allowing requests from the specified origin (http://localhost:3001).
//This enables the frontend (running on a different port) to communicate with this server.
app.use(
    cors({
        origin: "http://localhost:3001"
    })
)

app.get("/api/data", async(req, res) =>{
    const {begin_date} = req.query;
    const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=${begin_date}&api-key=${apiKey}`);
    const data = await response.json();
    res.json(data)
})

app.listen(3000, () => console.log("Server is running on port 3000"));