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
const prisma_1 = require("../../database/prisma");
class AddChannel {
    constructor() {
        this.name = "addChannel";
        this.description = "Comando para adicionar novos canais de texto na lista de canais de alerta";
        this.category = "Alertas";
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.member.permissions.has(["ADMINISTRATOR"])) {
                message.channel.send("Sinto muito, você não tem permissão para isso 🛑");
                return;
            }
            if (!args[0]) {
                message.channel.send("Informe o canal de texto");
            }
            else {
                const channelId = args[0].replace(/[<>#]/g, "");
                const channel = client.channels.cache.get(channelId);
                if (channel.isText()) {
                    yield prisma_1.prisma.alertChannels.create({
                        data: {
                            channelId,
                        },
                    });
                    console.log(channel);
                    message.channel.send(`O canal: ${channel.toString()} foi adicionado na lista de canais de alerta`);
                }
                else {
                    message.channel.send("O canal deve ser de texto");
                }
            }
        });
    }
}
exports.default = new AddChannel();
//# sourceMappingURL=addChannel.command.js.map