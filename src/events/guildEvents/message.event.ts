import { Message } from "discord.js";
import { Bot } from "../../bot";
import { Command } from "../../interfaces/command";
import { Event } from "../../interfaces/event";

class MessageEvent implements Event {
  public name = "messageCreate";

  public async run(client: Bot, message: Message) {
    const authorIsBot = message.author.bot;
    if (authorIsBot) return;
    const sendInGuild = message.guild;
    if (!sendInGuild) return;
    const prefix = client.config.prefix;
    const messageStartWithBotPrefix = message.content.startsWith(prefix);
    if (!messageStartWithBotPrefix) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const commandName = args.shift();
    const command: Command = client.commands.get(commandName);
    if (!command) return;
    command.run(client, message, args).catch((error) => {
      if (error.name === "CommandError") message.channel.send(error.message);
      else console.log(error);
    });
  }
}

export default new MessageEvent();
