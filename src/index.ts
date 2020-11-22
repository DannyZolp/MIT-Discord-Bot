import { Client, Message } from 'discord.js';
const retext = require('retext');
const spell = require('retext-spell');
const dictionary = require('dictionary-en-gb');

const bot = new Client();

bot.on('ready', () => {
    console.log(`Connected to API as ${bot.user.tag}`)
})

bot.on('message', (message: Message) => {
    retext().use(spell, dictionary).process(message.content, (err, file) => {
        if (message.content.includes('penis') || message.content.includes('pen15')) {
            message.delete();
            return;
        } 
        if (file.messages !== []) {
            file.messages.forEach(element => {
                element.expected.forEach(expected => {
                    if (expected === 'penis') {
                        message.delete()
                    }
                })
            });
        }
    })
})

bot.login(process.env.BOT_TOKEN)