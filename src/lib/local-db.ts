import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

export interface SessionRecord {
  id: string;
  userId: string;
  token: string;
  createdAt: string;
  expiresAt: string;
}

export interface WorkflowRecord {
  id: string;
  userId: string;
  title: string;
  description: string;
  prompt: string;
  uiSchema: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface LocalStoreData {
  users: UserRecord[];
  sessions: SessionRecord[];
  workflows: WorkflowRecord[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

export function getLocalStore(): LocalStoreData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const initial: LocalStoreData = { users: [], sessions: [], workflows: [] };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    const initial: LocalStoreData = { users: [], sessions: [], workflows: [] };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }
}

export function saveLocalStore(store: LocalStoreData) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

function extractValue(obj: any): string | null {
  if (!obj) return null;
  if (typeof obj === "string") return obj;
  if (obj.val !== undefined) return String(obj.val);
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const res = extractValue(item);
      if (res) return res;
    }
  }
  if (typeof obj === "object") {
    for (const key of Object.keys(obj)) {
      const res = extractValue(obj[key]);
      if (res) return res;
    }
  }
  return null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const localDbAdapter: any = {
  select: (fieldsSelect?: any) => ({
    from: (tableObj: any) => {
      const tableName = tableObj?.dbName || tableObj?._?.name || "users";

      const chainable = {
        where: (condition: any) => ({
          limit: async (n?: number) => {
            const store = getLocalStore();
            let records = (store as any)[tableName] || [];
            const targetVal = extractValue(condition);

            if (targetVal) {
              records = records.filter(
                (r: any) =>
                  r.email === targetVal ||
                  r.id === targetVal ||
                  r.token === targetVal ||
                  r.userId === targetVal
              );
            }
            if (n) records = records.slice(0, n);
            return records;
          },
          orderBy: async (orderClause?: any) => {
            const store = getLocalStore();
            let records = (store as any)[tableName] || [];
            const targetVal = extractValue(condition);
            if (targetVal) {
              records = records.filter((r: any) => r.userId === targetVal);
            }
            return records.sort(
              (a: any, b: any) =>
                new Date(b.updatedAt || b.createdAt).getTime() -
                new Date(a.updatedAt || a.createdAt).getTime()
            );
          },
          then: (resolve: any) => {
            const store = getLocalStore();
            let records = (store as any)[tableName] || [];
            const targetVal = extractValue(condition);
            if (targetVal) {
              records = records.filter(
                (r: any) =>
                  r.email === targetVal ||
                  r.userId === targetVal ||
                  r.id === targetVal
              );
            }
            resolve(records);
          },
        }),
        innerJoin: (otherTable: any, onClause: any) => ({
          where: (condition: any) => ({
            limit: async (n?: number) => {
              const store = getLocalStore();
              const now = new Date();

              // Get active session
              const validSession = store.sessions.find(
                (s) => new Date(s.expiresAt) > now
              );
              if (!validSession) return [];

              const user = store.users.find((u) => u.id === validSession.userId);
              if (!user) return [];

              return [{ id: user.id, email: user.email, name: user.name }];
            },
          }),
        }),
        orderBy: async (orderClause?: any) => {
          const store = getLocalStore();
          return (store as any)[tableName] || [];
        },
        then: (resolve: any) => {
          const store = getLocalStore();
          resolve((store as any)[tableName] || []);
        },
      };
      return chainable;
    },
  }),
  insert: (tableObj: any) => ({
    values: (data: any) => {
      const tableName = tableObj?.dbName || tableObj?._?.name || "users";
      const store = getLocalStore();
      const newRecord = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!store[tableName as keyof LocalStoreData]) {
        (store as any)[tableName] = [];
      }
      (store as any)[tableName].push(newRecord);
      saveLocalStore(store);

      return {
        returning: async (fields?: any) => [newRecord],
        then: (resolve: any) => resolve([newRecord]),
      };
    },
  }),
  delete: (tableObj: any) => ({
    where: (condition: any) => {
      const tableName = tableObj?.dbName || tableObj?._?.name || "sessions";
      const store = getLocalStore();
      const targetVal = extractValue(condition);

      if (tableName === "sessions") {
        if (targetVal) {
          store.sessions = store.sessions.filter((s) => s.token !== targetVal);
        } else {
          store.sessions = [];
        }
        saveLocalStore(store);
      } else if (tableName === "workflows" && targetVal) {
        store.workflows = store.workflows.filter((w) => w.id !== targetVal);
        saveLocalStore(store);
      }
      return Promise.resolve();
    },
  }),
};
