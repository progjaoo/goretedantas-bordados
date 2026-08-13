import { PortfolioItem } from "@/types/portfolio";
import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";
import initialPortfolio from "./initialPortfolio.json";

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/portfolioData.json");

// In-memory cache for serverless invocations
let memoryCache: PortfolioItem[] | null = null;

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
    // In serverless environments fs write might be disabled, so we rely on memory/Blob
  }
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

export function savePortfolioItems(items: PortfolioItem[]): boolean {
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
    put("data/portfolioData.json", JSON.stringify(items, null, 2), {
      access: "public",
      addRandomSuffix: false,
    }).catch((err) => {
      console.error("Error saving portfolio data to Vercel Blob:", err);
    });
  }

  return true;
}

export function addPortfolioItem(item: Omit<PortfolioItem, "id" | "createdAt">): PortfolioItem {
  const items = [...getPortfolioItems()];
  const newItem: PortfolioItem = {
    ...item,
    id: `item-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  items.unshift(newItem);
  savePortfolioItems(items);
  return newItem;
}

export function updatePortfolioItem(id: string, updates: Partial<PortfolioItem>): PortfolioItem | null {
  const items = [...getPortfolioItems()];
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    ...updates,
  };
  savePortfolioItems(items);
  return items[index];
}

export function deletePortfolioItem(id: string): boolean {
  const items = getPortfolioItems();
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;
  savePortfolioItems(filtered);
  return true;
}
