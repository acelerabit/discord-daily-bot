import { Message, MessageEmbed, MessageEmbedOptions } from "discord.js";

export function createEmbed(
  message: Message,
  data?: MessageEmbedOptions
): MessageEmbed {
  return new MessageEmbed({
    color: "#591956",
    ...data,
    footer: {
      text: `Espero poder te ajudar! ❤️`,
      iconURL: message.guild.iconURL({
        dynamic: true,
        format: "png",
      }),
    },
  });
}
