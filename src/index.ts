import dotenv from "dotenv";
dotenv.config();
import { Client, Message } from "discord.js";
import retext from "retext";
import spell from "retext-spell";
import dictionary from "dictionary-en-gb";
import { remove } from "diacritics";

const bot = new Client();

bot.on("ready", () => {
  console.log(`Connected to API as ${bot.user.tag}`);
});

bot.on("message", (message: Message) => {
  const text = remove(message.content);

  retext()
    .use(spell, dictionary)
    .process(text, (err, file) => {
      if (
        text.includes("deez") ||
        text.includes("nuts") ||
        (text.includes("sus") && !text.includes("suspicious")) ||
        (text.includes("among") && text.includes("us"))
      ) {
        message.delete();
        return;
      }
      if (file.messages !== []) {
        file.messages.forEach((element) => {
          console.log(element.expected);
          element.expected.forEach((expected) => {
            switch (expected) {
              case "jeez":
                message.delete();
                break;
              case "Dee":
                message.delete();
                break;
              case "nuts":
                message.delete();
                break;
              case "amigos":
                message.delete();
                break;
              case "suss":
                message.delete();
              default: {
                return;
              }
            }
          });
        });
      }
    });
});

bot.login(process.env.BOT_TOKEN);
