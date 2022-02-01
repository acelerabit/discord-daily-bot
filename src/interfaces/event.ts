import { Bot } from "../bot";


export interface Execution {
  (client: Bot, ...args: unknown[]): Promise<unknown>
}

export interface Event {
  name: string;
  run: Execution
}