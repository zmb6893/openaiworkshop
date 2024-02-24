// Import the required modules
const express = require("express");
const OpenAI = require("openai");

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

	// Make a request to the OpenAI with your message prompt!
	const response = await client.chat.completions.create({
		model: "gpt-4",
		temperature: 1,
		messages: [
			{role: "user", content: contentInput}
		]
	})

	// Send the http response (This will make it appear in your browser!)
	res.send(response);
})


app.get('/generateImage', async(req, res) => {
	const image = await client.images.generate(
		{ 
			model: "dall-e-3", 
			prompt: req.query.prompt
		}
	);
	res.send(image)
})

app.get('/textToSpeech', async (req, res) => {
	try{
		const mp3 = await client.audio.speech.create({
			model: "tts-1",
			voice: "alloy",
			input: req.query.speech,
		  });
		  console.log(speechFile);
		  const buffer = Buffer.from(await mp3.arrayBuffer());
		  await fs.promises.writeFile(speechFile, buffer);
	}
	catch {}
	
	res.send();
})

// Set your server to listen to port 3000 on local host
app.listen(3000, () => console.log("Listening on port 3000"));
