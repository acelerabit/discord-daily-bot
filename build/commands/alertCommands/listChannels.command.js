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
const embed_1 = require("../../assets/embed");
const prisma_1 = require("../../database/prisma");
class ListChannels {
    constructor() {
        this.name = "listChannels";
        this.description = "Listar todos os canais de alerta";
        this.category = "Alertas";
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.member.permissions.has(["ADMINISTRATOR"])) {
                message.channel.send("Sinto muito, você não tem permissão para isso 🛑");
                return;
            }
            const channelsAlert = (yield prisma_1.prisma.alertChannels.findMany()).map((alertChannel) => alertChannel.channelId);
            const embed = (0, embed_1.createEmbed)(message, {
                title: "Canais de Alerta",
                description: channelsAlert.length !== 0
                    ? "Você pode ver os canais de alerta logo abaixo"
                    : "Não existe nenhum canal de alerta",
                fields: channelsAlert.map((channelId, index) => ({
                    name: `${index + 1}º`,
                    value: `<#${channelId}>`,
                    inline: false,
                })),
            });
            message.channel.send({ embeds: [embed] });
        });
    }
}
exports.default = new ListChannels();
//# sourceMappingURL=listChannels.command.js.map