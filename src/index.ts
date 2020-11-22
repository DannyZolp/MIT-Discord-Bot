import { Client, Message } from 'discord.js';
const retext = require('retext');
const spell = require('retext-spell');
const dictionary = require('dictionary-en-gb');
const http = require('http');

const bot = new Client();

bot.on('ready', () => {
    console.log(`Connected to API as ${bot.user.tag}`);
});

bot.on('message', (message: Message) => {
    retext()
        .use(spell, dictionary)
        .process(message.content, (err, file) => {
            if (message.content.includes('penis') || message.content.includes('pen15')) {
                message.delete();
                return;
            }
            if (file.messages !== []) {
                file.messages.forEach((element) => {
                    element.expected.forEach((expected) => {
                        if (expected === 'penis') {
                            message.delete();
                        }
                    });
                });
            }
        });
});

bot.login(process.env.BOT_TOKEN);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Connected to API as ${bot.user.tag}`);
});

server.listen(process.env.PORT, '127.0.0.1', () => {
    console.log('Health check successfully initialized');
});
