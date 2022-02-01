import { EmbedFieldData, Message } from "discord.js";
import { createEmbed } from "../../assets/embed";
import { Bot } from "../../bot";
import { Command } from "../../interfaces/command";

class Help implements Command {
  public name = "help";
  public description = "Listar todos os comandos do bot";

  public async run(client: Bot, message: Message, args) {
    if (!args[0]) {
      const categories = [...client.categories];
      const fields = this.groupCommandsInCategories(client);
      const embed = createEmbed(message, {
        title: "Lista de Comandos",
        description: `Você pode ver os detalhes de um comando usando \`${
          client.config.prefix
        }help <nome do comando>\``,
        fields,
      });
      message.channel.send({ embeds: [embed] });
    } else {
      const command = client.commands.get(args[0]);
      if (!command) {
        message.channel.send("❌ - Comando não identificado!");
        return;
      }
      const embed = createEmbed(message, {
        title: `Comando: ${command.name}`,
        description: command.description,
        fields: [
          {
            name: "Categoria",
            value: command.category,
            inline: true,
          },
          {
            name: "Chamada",
            value: `${client.config.prefix}${command.name}`,
            inline: true,
          },
        ],
      });
      message.channel.send({ embeds: [embed] });
    }
  }

  private groupCommandsInCategories(client: Bot) {
    const categories = [...client.categories];
    const groups: Array<EmbedFieldData> = categories.map((category) => {
      const commands = client.commands;
      let commandsBelonginToCurrentCategory: string[] = [];
      commands.forEach((command) => {
        if (command.category == category && command.name !== "help") {
          commandsBelonginToCurrentCategory.push(`\`${command.name}\``);
        }
      });
      return {
        name: `${category}:`,
        value: commandsBelonginToCurrentCategory.join(", "),
      };
    });
    return groups;
  }
}

export default new Help();
