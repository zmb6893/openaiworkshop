// Grab the express module
const express = require("express");
<<<<<<< Updated upstream

// Import OpenAI
const OpenAI = require("openai");
=======
// IMPORT OPEN AI
>>>>>>> Stashed changes

// Import the apiKey
const apiKey = require("./apiKey")

// For file storage
const path = require("path");
const fs = require("fs");

// Open up a connection to OpenAI
const client = new OpenAI({
	apiKey: apiKey.api_key
});

// Initialize an app using the express module
const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
})

// // Create an endpoint that gets data for your
app.get('/', (res) => {
	res.send('Successful Request');
})

// // Create an endpoint for your first openAI call
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
<<<<<<< Updated upstream
	const speechFile = path.resolve("./sounds/speech.mp3");
	const mp3 = await client.audio.speech.create({
		model: "tts-1",
		voice: "shimmer",
		input: req.query.speech,
		response_format: "mp3"
	  });
	  console.log(mp3);
	  
	  const buffer = Buffer.from(await mp3.arrayBuffer());
  	  await fs.promises.writeFile(speechFile, buffer);
	  //res.send(path);
})
=======
	const speechFile = path.resolve("./speech.mp3");

	// Create a audio speech required fields are model, voice, and input
	const mp3 = "REPLACE ME";
});
>>>>>>> Stashed changes

// Set your server to listen to port 3000 on local host
app.listen(3000, () => console.log("Listening on port 3000"));
