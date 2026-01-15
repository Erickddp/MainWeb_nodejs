import { login } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { password } = await req.json();
        const success = await login(password);

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
