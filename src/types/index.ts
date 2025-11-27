import { SlashCommandBuilder, ChatInputCommandInteraction, Client, ClientEvents } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface Event {
  name: keyof ClientEvents;
  once?: boolean;
  execute: (...args: any[]) => Promise<void> | void;
}

export interface MapRotation {
  hour: number;
  damMinor: string;
  damMajor: string;
  buriedCityMinor: string;
  buriedCityMajor: string;
  spaceportMinor: string;
  spaceportMajor: string;
  blueGateMinor: string;
  blueGateMajor: string;
  stellaMontisMinor: string;
  stellaMontisMajor: string;
}

export interface MessageData {
  channelId: string;
  messageId: string;
  lastUpdated: string;
}

export interface MessageDataStore {
  [key: string]: MessageData;
}
