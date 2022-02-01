"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AlertJobs_1 = __importDefault(require("./AlertJobs"));
const bot_1 = __importDefault(require("./bot"));
require("dotenv/config");
const bot = (0, bot_1.default)({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] }, process.env.BOT_TOKEN, process.env.PREFIX || "$");
const alertJobs = (0, AlertJobs_1.default)();
bot.init();
alertJobs.start(bot);
//# sourceMappingURL=index.js.map