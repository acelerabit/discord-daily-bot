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
class Help {
    constructor() {
        this.name = "help";
        this.description = "Listar todos os comandos do bot";
    }
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0]) {
                const categories = [...client.categories];
                const fields = this.groupCommandsInCategories(client);
                const embed = (0, embed_1.createEmbed)(message, {
                    title: "Lista de Comandos",
                    description: `Você pode ver os detalhes de um comando usando \`${client.config.prefix}help <nome do comando>\``,
                    fields,
                });
                message.channel.send({ embeds: [embed] });
            }
            else {
                const command = client.commands.get(args[0]);
                if (!command) {
                    message.channel.send("❌ - Comando não identificado!");
                    return;
                }
                const embed = (0, embed_1.createEmbed)(message, {
                    title: `Comando: ${command.name}`,
                    description: command.description,
                    fields: [
                        {
                            name: "Categoria",
                            value: command.category,
                            inline: true,
                        },
                        {
                            name: "Chamada",
                            value: `${client.config.prefix}${command.name}`,
                            inline: true,
                        },
                    ],
                });
                message.channel.send({ embeds: [embed] });
            }
        });
    }
    groupCommandsInCategories(client) {
        const categories = [...client.categories];
        const groups = categories.map((category) => {
            const commands = client.commands;
            let commandsBelonginToCurrentCategory = [];
            commands.forEach((command) => {
                if (command.category == category && command.name !== "help") {
                    commandsBelonginToCurrentCategory.push(`\`${command.name}\``);
                }
            });
            return {
                name: `${category}:`,
                value: commandsBelonginToCurrentCategory.join(", "),
            };
        });
        return groups;
    }
}
exports.default = new Help();
//# sourceMappingURL=help.command.js.map