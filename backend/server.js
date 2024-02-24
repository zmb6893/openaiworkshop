// Import the required modules
const express = require("express");
// IMPORT OPEN AI

// Import file system modules (used for mp3)
const path = require("path");
const fs = require("fs");

// Grab the apiKey
const apiKey = require("./apiKey")

// Open up a connection to OpenAI
const client = new OpenAI({
	apiKey: apiKey.api_key
});

// Initialize an app using the express module to make HTTP requests
const app = express();

// Avoid CORS error by including the following header
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
})

// Test enpoint to make sure your api works
app.get('/', (res) => {
	res.send('Successful Request');
})

// Create an endpoint for your first openAI call
app.get('/myFirstOpenAICall', async (req, res) => {
	// Get the message and role from the query parameters
	const contentInput = req.query.message; 

	// Create a new chat completions: required fields model, messages
	// Make a request to the OpenAI with your message prompt!
	const response = "REPLACE ME";

	// Send the http response (This will make it appear in your browser!)
	res.send(response);
})


app.get('/generateImage', async(req, res) => {
	// Generate a new image: required fields model, prompt
	const image = "REPLACE ME";
	res.send(image)
})

app.get('/textToSpeech', async (req, res) => {

	const speechFile = path.resolve("./speech.mp3");

	// Create a audio speech required fields are model, voice, and input
	const mp3 = "REPLACE ME";
});

// Set your server to listen to port 3000 on local host
app.listen(3000, () => console.log("Listening on port 3000"));
