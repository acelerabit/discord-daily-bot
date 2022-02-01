"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmbed = void 0;
const discord_js_1 = require("discord.js");
function createEmbed(message, data) {
    return new discord_js_1.MessageEmbed(Object.assign(Object.assign({ color: "#591956" }, data), { footer: {
            text: `Espero poder te ajudar! ❤️`,
            iconURL: message.guild.iconURL({
                dynamic: true,
                format: "png",
            }),
        } }));
}
exports.createEmbed = createEmbed;
//# sourceMappingURL=embed.js.map