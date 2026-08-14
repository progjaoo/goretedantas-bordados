import { CategoryItem } from "@/types/portfolio";
import { list, put } from "@vercel/blob";
import fs from "fs";
import path from "path";
import initialCategories from "./initialCategories.json";

const CATEGORIES_FILE_PATH = path.join(process.cwd(), "src/data/categoriesData.json");

// In-memory cache for serverless instances
let categoriesCache: CategoryItem[] | null = null;
let categoriesBlobSynced = false;

function ensureCategoriesFile() {
  try {
    if (!fs.existsSync(CATEGORIES_FILE_PATH)) {
      const dir = path.dirname(CATEGORIES_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(CATEGORIES_FILE_PATH, JSON.stringify(initialCategories, null, 2), "utf-8");
    }
  } catch (err) {
    // In serverless environments fs write might be disabled
  }
}

export async function syncCategoriesFromBlob(): Promise<CategoryItem[] | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: "data/categoriesData.json" });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as CategoryItem[];
        if (Array.isArray(data) && data.length > 0) {
          categoriesCache = data;
          categoriesBlobSynced = true;
          return data;
        }
      }
    }
  } catch (err) {
    console.error("Error syncing categories from Vercel Blob:", err);
  }
  return null;
}

export function getCategories(): CategoryItem[] {
  if (categoriesCache && categoriesCache.length > 0) {
    return categoriesCache;
  }

  ensureCategoriesFile();

  try {
    if (fs.existsSync(CATEGORIES_FILE_PATH)) {
      const content = fs.readFileSync(CATEGORIES_FILE_PATH, "utf-8");
      const parsed = JSON.parse(content) as CategoryItem[];
      categoriesCache = parsed;
      return parsed;
    }
  } catch (err) {
    console.error("Error reading categories from disk:", err);
  }

  categoriesCache = initialCategories as unknown as CategoryItem[];
  return categoriesCache;
}

export async function getCategoriesAsync(): Promise<CategoryItem[]> {
  if (!categoriesBlobSynced && process.env.BLOB_READ_WRITE_TOKEN) {
    const fromBlob = await syncCategoriesFromBlob();
    if (fromBlob) return fromBlob;
  }
  return getCategories();
}

export async function saveCategories(categories: CategoryItem[]): Promise<boolean> {
  categoriesCache = categories;

  // 1. Local filesystem
  try {
    ensureCategoriesFile();
    if (fs.existsSync(path.dirname(CATEGORIES_FILE_PATH))) {
      fs.writeFileSync(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2), "utf-8");
    }
  } catch (err) {
    // Serverless fallback
  }

  // 2. Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put("data/categoriesData.json", JSON.stringify(categories, null, 2), {
        access: "public",
        addRandomSuffix: false,
      });
      categoriesBlobSynced = true;
    } catch (err) {
      console.error("Error saving categories to Vercel Blob:", err);
    }
  }

  return true;
}

export async function addCategory(category: Omit<CategoryItem, "id"> & { id?: string }): Promise<CategoryItem> {
  const currentCategories = await getCategoriesAsync();
  const slugId = category.id || category.label.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  
  // Ensure unique ID
  let uniqueId = slugId;
  let counter = 1;
  while (currentCategories.some((c) => c.id === uniqueId)) {
    uniqueId = `${slugId}-${counter}`;
    counter++;
  }

  const newCategory: CategoryItem = {
    id: uniqueId,
    label: category.label,
    tag: category.tag || "Personalizado",
    description: category.description || "",
    icon: category.icon || "Sparkles",
    order: category.order || currentCategories.length + 1,
  };

  const updatedList = [...currentCategories, newCategory];
  await saveCategories(updatedList);
  return newCategory;
}

export async function updateCategory(id: string, updates: Partial<CategoryItem>): Promise<CategoryItem | null> {
  const currentCategories = await getCategoriesAsync();
  const index = currentCategories.findIndex((c) => c.id === id);
  if (index === -1) return null;

  currentCategories[index] = {
    ...currentCategories[index],
    ...updates,
    id: currentCategories[index].id, // Keep ID immutable
  };

  await saveCategories(currentCategories);
  return currentCategories[index];
}

export async function deleteCategory(id: string): Promise<boolean> {
  const currentCategories = await getCategoriesAsync();
  const filtered = currentCategories.filter((c) => c.id !== id);
  if (filtered.length === currentCategories.length) return false;
  await saveCategories(filtered);
  return true;
}
