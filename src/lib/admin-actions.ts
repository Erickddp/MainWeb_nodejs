"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "./auth";

const CONTENT_DIR = path.join(process.cwd(), "src/content");
const DRAFTS_DIR = path.join(CONTENT_DIR, "drafts");

export async function saveDraft(filename: string, data: any) {
    if (!(await isAuthenticated())) throw new Error("Unauthorized");

    try {
        await fs.mkdir(DRAFTS_DIR, { recursive: true });
        const filePath = path.join(DRAFTS_DIR, `${filename}.json`);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to save draft." };
    }
}

export async function getContent(filename: string, useDraft = true) {
    const draftPath = path.join(DRAFTS_DIR, `${filename}.json`);
    const mainPath = path.join(CONTENT_DIR, `${filename}.json`);

    try {
        if (useDraft) {
            try {
                const content = await fs.readFile(draftPath, "utf-8");
                return JSON.parse(content);
            } catch (e) {
                // if no draft, fallback to main
                const content = await fs.readFile(mainPath, "utf-8");
                return JSON.parse(content);
            }
        } else {
            const content = await fs.readFile(mainPath, "utf-8");
            return JSON.parse(content);
        }
    } catch (error) {
        return null;
    }
}

export async function publishAll() {
    if (!(await isAuthenticated())) throw new Error("Unauthorized");
    if (process.env.IS_DEMO_MODE === "true") return { success: false, message: "Demo mode: Publish disabled." };

    try {
        const files = await fs.readdir(DRAFTS_DIR);
        for (const file of files) {
            const srcPath = path.join(DRAFTS_DIR, file);
            const destPath = path.join(CONTENT_DIR, file);
            await fs.copyFile(srcPath, destPath);
        }
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Publish failed." };
    }
}
