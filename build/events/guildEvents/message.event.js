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
Object.defineProperty(exports, "__esModule", { value: true });
class MessageEvent {
    constructor() {
        this.name = "messageCreate";
    }
    run(client, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorIsBot = message.author.bot;
            if (authorIsBot)
                return;
            const sendInGuild = message.guild;
            if (!sendInGuild)
                return;
            const prefix = client.config.prefix;
            const messageStartWithBotPrefix = message.content.startsWith(prefix);
            if (!messageStartWithBotPrefix)
                return;
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const commandName = args.shift();
            const command = client.commands.get(commandName);
            if (!command)
                return;
            command.run(client, message, args).catch((error) => {
                if (error.name === "CommandError")
                    message.channel.send(error.message);
                else
                    console.log(error);
            });
        });
    }
}
exports.default = new MessageEvent();
//# sourceMappingURL=message.event.js.map