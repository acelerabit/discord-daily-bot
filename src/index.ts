import createAlertJobs from "./AlertJobs";
import createBot from "./bot";
import "dotenv/config";

const bot = createBot(
  { intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] },
  process.env.BOT_TOKEN,
  process.env.PREFIX || "$"
);

const alertJobs = createAlertJobs();

bot.init();
alertJobs.start(bot);
