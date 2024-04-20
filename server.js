// Import two packages: express and cors
const express = require("express");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
// (...snippet)

// Create a new Express app
const app = express();

app.use(cors()); // Use the `cors` middleware to enable CORS.
app.use(express.json()); // Use the `express.json()` middleware to parse JSON request bodies.

const chats = [];

app.post("/api/messages", ( req, res) => {
    console.log(req.body);

    const{ message, pin } = req.body;

    // Search for messages with the same pin.
    let pinExists = false;
    let currentChat;
    for (let i = 0; i < chats.length; i++) {
        currentChat = chats[i];
        pinExists = bcryptjs.compareSync(pin, currentChat.pin);

    // Stop the loop once we've found a matching pin. No need to keep searching.
    if (pinExists) {
        break; // Exit the loop.
    }
        // Output for debugging.
        console.log("Found an existing chat session: ", currentChat);

        break; // Exit the loop.
    }
}

    // (...snippet)
,);

// If we can't find a chat with the same pin, create a new chat object.
if (!pinExists) {
    // (...snippet)
} else {
    // The chat already exists. Add the message to the existing chat.
    currentChat.messages.push(message);

    // (...snippet)
    
    const hashedPin = bcryptjs.hashSync(pin);
    console.log("Generated hash and salted pin:", hashedPin);

    // Create a new chat object with the hashed pin and the message.
    const newChat = {
        pin: hashedPin,
        messages: [message],
    };
    // Store the new chat in our chats array.
    chats.push(newChat);

    // Output debugging message.
    console.log("Created a new chat session: ", newChat);

    // Set the current chat to the new chat object.
    currentChat = newChat;
} 

    // Respond with the messages for the chat session.
    res.status(200).send({ messages: newChat.messages });
    // Output debugging message.
    console.log("Sent the messages: ", newChat.messages);
;

// Loop over each chat session in the 'chats' array.
// Get the current chat for this iteration by indexing into 'chats'.
// Check if the current chat's 'pin' matches the 'pin' from the request.
    // If we find a match, then the pin already exists in the database and
    // we can stop looping.
// Otherwise, keep looping. If we reach the end of the array, then the pin
// doesn't exist in the database.

// Run the Express app on port 8000.
app.listen(8000, () => console.log("Running on port 8000"));
