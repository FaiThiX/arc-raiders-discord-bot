import 'dotenv/config';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Your Google Sheet ID
const SHEET_ID = '180pt5_bRK5PEeisewLXrhpeMOI5hNPnY67F9Rf639Ic';

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!clientEmail || !privateKey) {
  throw new Error('Google API credentials are not set in environment variables.');
}

const auth = new JWT({
  email: clientEmail,
  key: privateKey,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

export async function getSheetData(range: string) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range,
  });
  return res.data.values;
}

export async function updateSheetData(range: string, values: any[][]) {
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: 'RAW',
    requestBody: { values },
  });
}

export async function appendSheetData(range: string, values: any[][]) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: 'RAW',
    requestBody: { values },
  });
}

// Save server info to Google Sheets (tab: ServerInfo, columns: guildId, channelId, serverName)
export async function appendServerInfo(guildId: string, channelId: string, serverName: string) {
  const range = 'ServerInfo!A2:C';
  const values = [[guildId, channelId, serverName]];
  await appendSheetData(range, values);
}