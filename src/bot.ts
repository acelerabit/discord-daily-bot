import { Client, ClientOptions, Collection } from "discord.js";
import glob from "glob";
import { Command } from "./interfaces/command";
import { Event } from "./interfaces/event";
import Config from "./interfaces/config";

export class Bot extends Client {
  public config: Config;
  public commands: Collection<string, Command>;
  public events: Collection<string, Event>;
  public categories: Set<string>;

  public constructor(options: ClientOptions, token: string, prefix: string) {
    super(options);

    this.login(token);
    this.config = { prefix };
  }

  public async init() {
    this.commands = new Collection();
    this.events = new Collection();
    this.categories = new Set();
    this.loadCommandsFiles();
    this.loadEventsFiles();
  }

  private loadCommandsFiles() {
    const commandsFiles = glob.sync(
      __dirname + "/commands/**/*.command{.js,.ts}"
    );
    const commands: Collection<string, Command> = new Collection();
    const categories: Set<string> = new Set();
    commandsFiles.map(async (file: string) => {
      const command: Command = (await import(file)).default;
      commands.set(command.name, command);
      if (command.category) categories.add(command.category);
    });
    this.commands = commands;
    this.categories = categories;
  }

  private loadEventsFiles() {
    const eventsFiles = glob.sync(__dirname + "/events/**/*.event{.js,.ts}");
    const events: Collection<string, Event> = new Collection();
    eventsFiles.map(async (file: string) => {
      const event: Event = (await import(file)).default;
      events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));
    });
    this.events = events;
  }
}

export default function createBot(
  options: ClientOptions,
  token: string,
  prefix: string
) {
  return new Bot(options, token, prefix);
}
