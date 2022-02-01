import cron from "node-cron";
import { Bot } from "./bot";
import { prisma } from "./database/prisma";

class AlertJobs {
  start(client: Bot) {
    cron.schedule("30 17 * * MON,TUE,WED,THU,FRI", async () => {
      const channelsAlert = (await prisma.alertChannels.findMany()).map(
        (alertChannel) => alertChannel.channelId
      );
      channelsAlert.forEach((channelId) => {
        const channel = client.channels.cache.get(channelId);

        if (channel && channel.isText()) {
          channel.send(
            "Olá pessoal, boa tarde! Como foi o dia de vocês hoje? Quais foram os avanços? Estão com algum impedimento?"
          );
        }
      });
    });
  }
}

export default function createAlertJobs() {
  return new AlertJobs();
}
