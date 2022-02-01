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
class RemoveChannel {
    constructor() {
        this.name = "removeChannel";
        this.description = "Comando para remover canais de texto da lista de canais de alerta";
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
                    const channelAlert = yield prisma_1.prisma.alertChannels.findFirst({
                        where: {
                            channelId,
                        },
                    });
                    if (!!channelAlert) {
                        yield prisma_1.prisma.alertChannels.delete({
                            where: {
                                id: channelAlert.id,
                            },
                        });
                        message.channel.send(`O canal: ${channel.toString()} foi removido da lista de canais de alerta`);
                    }
                    else {
                        message.channel.send(`O canal: ${channel.toString()} precisa estar na lista de canais de alerta`);
                    }
                }
                else {
                    message.channel.send("O canal deve ser de texto");
                }
            }
        });
    }
}
exports.default = new RemoveChannel();
//# sourceMappingURL=removeChannel.command.js.map