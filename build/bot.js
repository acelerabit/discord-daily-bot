"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const glob_1 = __importDefault(require("glob"));
class Bot extends discord_js_1.Client {
    constructor(options, token, prefix) {
        super(options);
        this.login(token);
        this.config = { prefix };
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.commands = new discord_js_1.Collection();
            this.events = new discord_js_1.Collection();
            this.categories = new Set();
            this.loadCommandsFiles();
            this.loadEventsFiles();
        });
    }
    loadCommandsFiles() {
        const commandsFiles = glob_1.default.sync(__dirname + "/commands/**/*.command{.js,.ts}");
        const commands = new discord_js_1.Collection();
        const categories = new Set();
        commandsFiles.map((file) => __awaiter(this, void 0, void 0, function* () {
            const command = (yield Promise.resolve().then(() => __importStar(require(file)))).default;
            commands.set(command.name, command);
            if (command.category)
                categories.add(command.category);
        }));
        this.commands = commands;
        this.categories = categories;
    }
    loadEventsFiles() {
        const eventsFiles = glob_1.default.sync(__dirname + "/events/**/*.event{.js,.ts}");
        const events = new discord_js_1.Collection();
        eventsFiles.map((file) => __awaiter(this, void 0, void 0, function* () {
            const event = (yield Promise.resolve().then(() => __importStar(require(file)))).default;
            events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        }));
        this.events = events;
    }
}
exports.Bot = Bot;
function createBot(options, token, prefix) {
    return new Bot(options, token, prefix);
}
exports.default = createBot;
//# sourceMappingURL=bot.js.map