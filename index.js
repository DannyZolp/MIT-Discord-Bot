const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();

var messageLog = new Array();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} !`);
})

client.on('message', async message => {
    // create our regex
    const regex = new RegExp(/(p)+\w+[is]/g)

    // if our bot sent the message, don't do anything.
    if (message.author.bot /*|| message.author.id !== "467861795676094475"*/) return;

    // creates our compressed message that makes getting around the filter harder
    var compressedMessage = message.content;

    // removes all of the spaces from the string
    compressedMessage = compressedMessage.replace(/\s+/g, '')

    // removes all of the special characters from the string
    compressedMessage = compressedMessage.replace(/[^a-zA-Z ]/g, '')

    // makes the entire string lowercase
    compressedMessage = compressedMessage.toLowerCase();

    // add our message to our log to ensure there is no multi-line penises
    await addMessageToLog(message);

    // actually check the string
    if (regex.test(compressedMessage) || compressedMessage === "pen15") {
        console.log("Deleting!")
        await message.delete()
    } else if (regex.test( await turnMessageLogToString() )) {
        console.log("Deleting Multi-Line!")
        await deleteAllMessagesInLog();
    }
})

async function addMessageToLog(message) {
    if (messageLog.length >= 5) {
        messageLog = await addAndRemoveOverflow(messageLog, message)
    } else {
        messageLog.push(message)
    }

    return;
}

async function turnMessageLogToString() {
    var string = "";
    messageLog.forEach(message => {
        string += message.content;
    })
    return string;
}

async function deleteAllMessagesInLog() {
    messageLog.forEach(async message => {
        await message.delete();
    })
    messageLog = new Array();
    return;
}

async function addAndRemoveOverflow(array, newElement) {
    array.push(newElement)
    array.splice(0, 1);

    if (array >= 5) array = new Array();

    return array;
}

client.login(process.env.DISCORD_KEY)