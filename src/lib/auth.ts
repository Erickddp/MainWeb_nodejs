import { cookies } from "next/headers";

const AUTH_COOKIE = "evorix-session";

export async function isAuthenticated() {
    const session = cookies().get(AUTH_COOKIE);
    if (!session) return false;

    // In a real app, we'd verify the token. 
    // Here we'll just check if it matches our "session" string for simplicity 
    // as per the "simple & safe" requirement.
    return session.value === process.env.ADMIN_PASSWORD;
}

export async function login(password: string) {
    if (password === process.env.ADMIN_PASSWORD) {
        cookies().set(AUTH_COOKIE, password, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });
        return true;
    }
    return false;
}

export async function logout() {
    cookies().delete(AUTH_COOKIE);
}
