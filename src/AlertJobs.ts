import cron from "node-cron";
import { Bot } from "./bot";
import { prisma } from "./database/prisma";

class AlertJobs {
  start(client: Bot) {
    cron.schedule("00 09 * * TUE,WED,THU,FRI", async () => {
      const channelsAlert = (await prisma.alertChannels.findMany()).map(
        (alertChannel) => alertChannel.channelId
      );
      channelsAlert.forEach((channelId) => {
        const channel = client.channels.cache.get(channelId);

        if (channel && channel.isText()) {
          channel.send(
            "Fala @everyone, vamos pra daily! \n\n1) Quais os avanços ontem? \n\n2) Qual o objetivo de hoje?"
          );
        }
      });
    });
  }
}

export default function createAlertJobs() {
  return new AlertJobs();
}
