const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client();

var messageLogs = {};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag} !`);
});

client.on("message", async (message) => {
  // create our regex
  const regex = new RegExp(/(p)+\w+(is)/g);

  // if our bot sent the message, don't do anything.
  if (message.author.bot /*|| message.author.id !== "456099370799202304"*/)
    return;

  // creates our compressed message that makes getting around the filter harder
  var compressedMessage = await removeExtraBits(message.content);

  // add our message to our log to ensure there is no multi-line penises
  await addMessageToLog(message);

  // make sure the boy can say piss
  if (compressedMessage === "piss") return;

  // check our messages for penises
  if (regex.test(compressedMessage) || compressedMessage === "pen15") {
    // if a singular message has penis

    console.log("Deleting!");
    await message.delete();
    messageLogs[message.author.id] = new Array();
  } else if (
    regex.test(
      await removeExtraBits(
        await turnArrayToString(messageLogs[message.author.id])
      )
    )
  ) {
    // if a multi-line penis

    console.log("Deleting Multi-Line!");
    messageLogs[message.author.id] = await deleteAllMessages(messageLogs[message.author.id]);
  }
});

/**
 *
 * @param {Discord.Message} message
 */
async function addMessageToLog(message) {
  // Grabs the array we want to work with, or creates a new array for the user.
  var messageLog =
    messageLogs[message.author.id] === undefined
      ? new Array()
      : messageLogs[message.author.id];

  if (messageLog.length >= 5) {
    // makes sure our array isn't storing more than 5 things, and then deletes overflow
    messageLog = await addAndRemoveOverflow(messageLog, message);
  } else {
    // justs adds the message to the array
    messageLog.push(message);
  }

  // adds our modified array back to the object
  messageLogs[message.author.id] = messageLog;

  // returns to complete the promise
  return;
}

/**
 *
 * @param {Array<Discord.Message>} array
 */
async function turnArrayToString(array) {
  // creates a string for concatination
  var string = "";

  // goes through our array
  array.forEach((message) => {
    // adds each of the message's content to our string
    string += message.content;
  });

  // returns the string
  return string;
}

/**
 *
 * @param {Array<Discord.Message>} array
 */
async function deleteAllMessages(array) {
  // goes through our array
  array.forEach(async (message) => {
    try {
      // deletes all of the messages
      await message.delete();
    } catch (e) {
      console.log(e);
    }
  });

  // returns a new array
  return new Array();
}

/**
 *
 * @param {Array} array
 * @param {*} newElement
 */
async function addAndRemoveOverflow(array, newElement) {
  // adds the new element to the array
  array.push(newElement);

  // remvoes the first element from the array
  array.splice(0, 1);

  // returns our modified array
  return array;
}

/**
 *
 * @param {String} string
 */
async function removeExtraBits(string) {
  // removes all of the spaces from the string
  string = string.replace(/\s+/g, "");

  // removes all of the special characters from the string
  string = string.replace(/[^a-zA-Z ]/g, "");

  // makes the entire string lowercase
  string = string.toLowerCase();

  return string;
}

// Login to Discord
client.login(process.env.DISCORD_KEY);
