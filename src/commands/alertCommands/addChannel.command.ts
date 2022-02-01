import { Message } from "discord.js";
import { Bot } from "../../bot";
import { prisma } from "../../database/prisma";
import { Command } from "../../interfaces/command";

class AddChannel implements Command {
  public name = "addChannel";
  public description =
    "Comando para adicionar novos canais de texto na lista de canais de alerta";
  public category = "Alertas";

  public async run(client: Bot, message: Message, args) {
    if (!message.member.permissions.has(["ADMINISTRATOR"])) {
      message.channel.send("Sinto muito, você não tem permissão para isso 🛑");
      return;
    }

    if (!args[0]) {
      message.channel.send("Informe o canal de texto");
    } else {
      const channelId = args[0].replace(/[<>#]/g, "");
      const channel = client.channels.cache.get(channelId);
      if (channel.isText()) {
        await prisma.alertChannels.create({
          data: {
            channelId,
          },
        });
        console.log(channel);
        message.channel.send(
          `O canal: ${channel.toString()} foi adicionado na lista de canais de alerta`
        );
      } else {
        message.channel.send("O canal deve ser de texto");
      }
    }
  }
}

export default new AddChannel();
