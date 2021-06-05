import fortune from 'fortune';
import path from 'path';
import { readSeed } from './helpers.js';

/**
 * Seedable in-memory adapter for Fortune.
 * @extends fortune.Adapter.DefaultAdapter
 */
export default class SeedableMemoryAdapter extends fortune.Adapter.DefaultAdapter {
  async connect() {
    await super.connect();

    const { dbPath } = this.options;
    if (!dbPath) return;

    const primaryKey = this.keys.primary;
    const seedReducer = (prev, cur) => (
      cur[primaryKey]
        ? { ...prev, [cur[primaryKey]]: cur }
        : prev
    );

    for (const type in this.db) {
      const seedPath = path.join(dbPath, `${type}.jsonl`);
      const data = await readSeed(seedPath, []);
      this.db[type] = data.reduce(seedReducer, {});
    }
  }
}
