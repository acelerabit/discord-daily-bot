"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const prisma_1 = require("./database/prisma");
class AlertJobs {
    start(client) {
        node_cron_1.default.schedule("30 17 * * MON,TUE,WED,THU,FRI", () => __awaiter(this, void 0, void 0, function* () {
            const channelsAlert = (yield prisma_1.prisma.alertChannels.findMany()).map((alertChannel) => alertChannel.channelId);
            channelsAlert.forEach((channelId) => {
                const channel = client.channels.cache.get(channelId);
                if (channel && channel.isText()) {
                    channel.send("Olá pessoal, boa tarde! Como foi o dia de vocês hoje? Quais foram os avanços? Estão com algum impedimento?");
                }
            });
        }));
    }
}
function createAlertJobs() {
    return new AlertJobs();
}
exports.default = createAlertJobs;
//# sourceMappingURL=AlertJobs.js.map