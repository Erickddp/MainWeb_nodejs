"use server";

import fs from "fs/promises";
import path from "path";

const DRAFT_FILE = path.join(process.cwd(), "src/content/draft.json");

export async function saveDraft(content: any) {
    try {
        await fs.writeFile(DRAFT_FILE, JSON.stringify(content, null, 2), "utf-8");
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

export async function getDraft() {
    try {
        const content = await fs.readFile(DRAFT_FILE, "utf-8");
        return JSON.parse(content);
    } catch (error) {
        return null; // No draft exists
    }
}

export async function clearDraft() {
    try {
        await fs.unlink(DRAFT_FILE);
    } catch (e) { }
}
