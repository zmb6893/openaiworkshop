// Grab the express module
const express = require("express");

// Import OpenAI
const OpenAI = require("openai");

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

// Set your server to listen to port 3000 on local host
app.listen(3000, () => console.log("Listening on port 3000"));
