import { Event } from "../../interfaces/event";

class Ready implements Event {
  public name = "ready";

  public async run(client) {
    console.log("🤖 : Estou vivo!!!");
    client.user.setActivity(`${client.config.prefix}help`);
  }
}

export default new Ready();
