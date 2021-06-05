import fs from 'fs';
import os from 'os';
import util from 'util';

const accessFile = util.promisify(fs.access);
const readFile = util.promisify(fs.readFile);

/**
 * Reads and resolves with seed data from the file at the given path
 * or defaultValue if the file does not exist.
 * @param {string} filePath path to seed file
 * @param {*} defaultValue value if no seed exists
 * @return {Promise}
 */
export async function readSeed(filePath, defaultValue) {
  try { await accessFile(filePath); }
  catch (er) { return defaultValue; }

  const text = await readFile(filePath, 'utf8');
  return text.trim().split(os.EOL).map(JSON.parse);
}
