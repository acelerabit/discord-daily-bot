import { Message } from 'discord.js';
import { Bot } from '../bot';

export interface Execution {
  (client: Bot, message: Message, args: string[]): Promise<unknown>
}

export interface Command {
  name: string;
  category?: string;
  description?: string;
  run: Execution;
}