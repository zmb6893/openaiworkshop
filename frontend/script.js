

function chatRequest() {
	// Get the message
	const message = document.getElementById("message").value;

	// Create the HTTP Request
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:3000/myFirstOpenAICall?message=" + encodeURIComponent(message);
	xhr.open("GET", url, true);

	// Update the chat section
	xhr.onreadystatechange = async function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
		let jsonResponse = JSON.parse(xhr.responseText);
		let chat = `${jsonResponse.choices[0]?.message.role}: ${jsonResponse.choices[0]?.message.content}\n`;
		const update = document.getElementById("chat");
		update.innerText = chat;
		console.log(jsonResponse);
	}
	};

	// Send the request
	xhr.send();
}


function imageRequest() {
	// Get the propmt
	const prompt = document.getElementById("prompt").value;

	// Create the HTTP Request
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:3000/generateImage?prompt=" + encodeURIComponent(prompt);
	xhr.open("GET", url, true);

	// Update the chat section
	xhr.onreadystatechange = async function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
		let jsonResponse = JSON.parse(xhr.responseText);
		let image = jsonResponse.data[0].url;
		let description = jsonResponse.data[0].revised_prompt;
		document.getElementById("image").setAttribute("src", image)
		document.getElementById("imageDescription").innerText = description;
		console.log(jsonResponse);
	}
	};

	// Send the request
	xhr.send();
}

function ttsRequest() {
	// Get the speech
	var message = document.getElementById("speech").value;

	// Create the http request
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:3000/textToSpeech?speech=" + encodeURIComponent(message);
	xhr.open("GET", url, true);

	// Find the location of the mp3
	xhr.onreadystatechange = function () {
	if (xhr.readyState == 4 && xhr.status == 200) {
		// Handle the response here
		document.getElementById("fileLocation").setInnerText = xhr.responseText;
	}
	};

	xhr.send();

}