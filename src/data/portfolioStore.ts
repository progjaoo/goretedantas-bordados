import { PortfolioItem } from "@/types/portfolio";
import { list, put } from "@vercel/blob";
import fs from "fs";
import path from "path";
import initialPortfolio from "./initialPortfolio.json";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/portfolioData.json");

// In-memory cache for serverless instances
let memoryCache: PortfolioItem[] | null = null;
let blobSynced = false;

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(initialPortfolio, null, 2), "utf-8");
    }
  } catch (err) {
    // In serverless environments fs write might be disabled
  }
}

export async function syncFromVercelBlob(): Promise<PortfolioItem[] | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: "data/portfolioData.json" });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as PortfolioItem[];
        if (Array.isArray(data) && data.length > 0) {
          memoryCache = data;
          blobSynced = true;
          return data;
        }
      }
    }
  } catch (err) {
    console.error("Error syncing portfolio from Vercel Blob:", err);
  }
  return null;
}

export function getPortfolioItems(): PortfolioItem[] {
  if (memoryCache && memoryCache.length > 0) {
    return memoryCache;
  }

  ensureDataFile();

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(content) as PortfolioItem[];
      memoryCache = parsed;
      return parsed;
    }
  } catch (err) {
    console.error("Error reading portfolio data from disk:", err);
  }

  memoryCache = initialPortfolio as unknown as PortfolioItem[];
  return memoryCache;
}

export async function getPortfolioItemsAsync(): Promise<PortfolioItem[]> {
  if (!blobSynced && process.env.BLOB_READ_WRITE_TOKEN) {
    const fromBlob = await syncFromVercelBlob();
    if (fromBlob) return fromBlob;
  }
  return getPortfolioItems();
}

export async function savePortfolioItems(items: PortfolioItem[]): Promise<boolean> {
  memoryCache = items;

  // 1. Try local filesystem (development)
  try {
    ensureDataFile();
    if (fs.existsSync(path.dirname(DATA_FILE_PATH))) {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(items, null, 2), "utf-8");
    }
  } catch (err) {
    // In serverless environments this is expected to be read-only
  }

  // 2. Try Vercel Blob persistence (production on Vercel)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put("data/portfolioData.json", JSON.stringify(items, null, 2), {
        access: "public",
        addRandomSuffix: false,
      });
      blobSynced = true;
    } catch (err) {
      console.error("Error saving portfolio data to Vercel Blob:", err);
    }
  }

  return true;
}

export async function addPortfolioItem(item: Omit<PortfolioItem, "id" | "createdAt">): Promise<PortfolioItem> {
  const currentItems = await getPortfolioItemsAsync();
  const newItem: PortfolioItem = {
    ...item,
    id: `item-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updatedList = [newItem, ...currentItems];
  await savePortfolioItems(updatedList);
  return newItem;
}

export async function updatePortfolioItem(id: string, updates: Partial<PortfolioItem>): Promise<PortfolioItem | null> {
  const currentItems = await getPortfolioItemsAsync();
  const index = currentItems.findIndex((i) => i.id === id);
  if (index === -1) return null;

  currentItems[index] = {
    ...currentItems[index],
    ...updates,
  };
  await savePortfolioItems(currentItems);
  return currentItems[index];
}

export async function deletePortfolioItem(id: string): Promise<boolean> {
  const currentItems = await getPortfolioItemsAsync();
  const filtered = currentItems.filter((i) => i.id !== id);
  if (filtered.length === currentItems.length) return false;
  await savePortfolioItems(filtered);
  return true;
}
