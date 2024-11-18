import express from "express"; //This line imports the Express module, a framework for building web servers in Node.js.
import fetch from "node-fetch"; //Imports fetch from the node-fetch package, allowing the server to make HTTP requests to external APIs.
import dotenv from "dotenv"; // Imports the dotenv module, which is used to load environment variables from a .env file into process.env, making it easy to access sensitive information like API keys.
import cors from "cors"; //Imports the cors (Cross-Origin Resource Sharing) middleware, which enables the server to handle requests from different origins, such as a frontend running on a different port.

dotenv.config(); // This line loads the environment variables from the .env file
const app = express(); //Creates an Express application instance, which is the main object used to define routes and configure middleware.
const apiKey = process.env.NY_TIMES_API_KEY // Accessing the API key from the environment variables


//Applies the CORS middleware to the app, allowing requests from the specified origin (http://localhost:3001).
//This enables the frontend (running on a different port) to communicate with this server.
app.use(
    cors({
        origin: "http://localhost:3000"
    })
)

app.get("/api/data", async(req, res) =>{ //Defines a route handler for GET requests to the /api/data endpoint. This function is asynchronous, allowing the use of await to handle asynchronous operations.
    const {begin_date} = req.query; //Extracts the month query parameter from the incoming request URL, which specifies the month of data to retrieve from the external API.
    const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${begin_date}&api-key=${apiKey}`);
    const data = await response.json(); //Sends the JSON data back to the client as the response to the original GET request.
    res.json(data)
})


app.listen(3000, () => console.log("Server is running on port 3000")); //Starts the server on port 3000 and logs a message to the console indicating that the server is running.