import { Guild } from 'discord.js';
import { logger } from '../utils/logger';
import { Event } from '../types';
import { removeServerFromSheet } from '../utils/googleSheets';

const GuildDeleteEvent: Event = {
  name: 'guildDelete',
  once: false,
  async execute(guild: Guild) {
    logger.info(`Bot removed from server: ${guild.name} (${guild.id})`);
    await removeServerFromSheet(guild.id);
    logger.info(`Removed server entry from Google Sheets for guildId: ${guild.id}`);
  },
};

module.exports = GuildDeleteEvent;
