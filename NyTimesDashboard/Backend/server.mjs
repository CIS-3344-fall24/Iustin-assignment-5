import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import api from "express/lib/application.js";

dotenv.config(); // This line loads the environment variables from the .env file
const app = express(); // Creates an Express application instance
const apiKey = process.env.NYT_API_KEY // Accessing the API key from the environment variables

app.use(
    cors({
        origin: "http://localhost:3001"
    })
)

// Defines a route handler for GET requests to the `/api/data endpoint`
// Function is asynchronous, which allows the use of await to handle asynchronous operations.
app.get("/api/data", async (req, res) => {
    // Extracts the query and filter parameter from the incoming request URL, which specifies the month of data to retrieve from the external API.
    const {month} = req.query;
    const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${month}&api-key=${apiKey}`)
    //Sends the JSON data back to the client as the response to the original GET request
    const data = await response.json();
    res.json(data)
})

api.listen(3000, () =>
    console.log(
        ('Server running on port 3000')
    )
);

