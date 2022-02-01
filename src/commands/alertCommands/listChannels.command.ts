import { EmbedFieldData, Message } from "discord.js";
import { createEmbed } from "../../assets/embed";
import { Bot } from "../../bot";
import { prisma } from "../../database/prisma";
import { Command } from "../../interfaces/command";

class ListChannels implements Command {
  public name = "listChannels";
  public description = "Listar todos os canais de alerta";
  public category = "Alertas";

  public async run(client: Bot, message: Message, args) {
    if (!message.member.permissions.has(["ADMINISTRATOR"])) {
      message.channel.send("Sinto muito, você não tem permissão para isso 🛑");
      return;
    }

    const channelsAlert = (await prisma.alertChannels.findMany()).map(
      (alertChannel) => alertChannel.channelId
    );

    const embed = createEmbed(message, {
      title: "Canais de Alerta",
      description:
        channelsAlert.length !== 0
          ? "Você pode ver os canais de alerta logo abaixo"
          : "Não existe nenhum canal de alerta",
      fields: channelsAlert.map(
        (channelId, index): EmbedFieldData => ({
          name: `${index + 1}º`,
          value: `<#${channelId}>`,
          inline: false,
        })
      ),
    });
    message.channel.send({ embeds: [embed] });
  }
}

export default new ListChannels();
