import { getSheetData } from './googleSheets';
import { logger } from './logger';
import { ServerConfig } from '../types';

/**
 * Reads all server configurations from Google Sheets.
 * @returns {Promise<ServerConfig>} The server configurations.
 */
export async function getServerConfigs(): Promise<ServerConfig> {
  try {
    const rows = await getSheetData('ServerInfo!A2:C');
    if (!rows || rows.length === 0) return {};
    const configs: ServerConfig = {};
    for (const row of rows) {
      const [guildId, channelId, serverName] = row;
      if (guildId && channelId) {
        configs[guildId] = { channelId, serverName };
      }
    }
    return configs;
  } catch (error) {
    logger.error({ err: error }, 'Error reading server configurations from Google Sheets');
    return {};
  }
}
