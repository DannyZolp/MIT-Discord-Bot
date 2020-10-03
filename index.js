const Discord = require('discord.js');
const http = require('http');
// require('dotenv').config(); | for development only

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} !`);
})

client.on('message', async message => {
    // create our regex
    const regex = new RegExp(/(p)+\w+[is]/g)

    // if our bot sent the message, don't do anything.
    if (message.author.bot) return;

    // creates our compressed message that makes getting around the filter harder
    var compressedMessage = message.content;

    // removes all of the spaces from the string
    compressedMessage = compressedMessage.replace(/\s+/g, '')

    // removes all of the special characters from the string
    compressedMessage = compressedMessage.replace(/[^a-zA-Z ]/g, '')

    // makes the entire string lowercase
    compressedMessage = compressedMessage.toLowerCase();

    // actually check the string
    if (regex.test(compressedMessage)) {
        console.log("Deleting!")
        await message.delete()
    }
})

client.login(process.env.DISCORD_KEY)

const httpServerSoHerokuWorks = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Heroku can go fuck itself!")
}).listen(process.env.PORT)