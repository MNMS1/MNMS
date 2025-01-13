import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";
type Session = typeof auth.$Infer.Session;
 
export default async function authMiddleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				//get the cookie from the request
				cookie: request.headers.get("cookie") || "",
			},
		},
	);

	if (!session) {
		const user = await db.query.user.findFirst()
		if (!user){
			return NextResponse.redirect(new URL("/onboarding", request.url));

		}

		return NextResponse.redirect(new URL("/login", request.url));
	}
	return NextResponse.next();
}
 

export const config = {
	matcher: ['/((?!api|onboarding|login|_next/static|_next/image|favicon.ico|placeholder.webp).*)'],
};