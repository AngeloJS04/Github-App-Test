import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import appConfig from "./config";
import { authRoutes, protectedRoutes } from "./utils/middleware/protected-routes";
import { GithubAuthProvider, signInWithCredential } from "firebase/auth";
import formatCookiesUtils from "./utils/formatCookies.utils";


export interface ValidateAuthI {
    cookies: string | null;
    req: NextRequest;
}

export async function middleware(request: NextRequest) {
    let url = request.nextUrl.clone();
    if (url.pathname.indexOf(".") != -1 || typeof window !== "undefined") return;

    const isFileRegex = /(_next\/static|_next\/image|favicon\.ico|\/_next)/;
    if (isFileRegex.test(url.pathname)) return;

    const response = NextResponse.next();
    const isPathAuth = authRoutes.find((path: string) => url.pathname.includes(path));

    const user = await getUser({
        cookies: request.headers.get("Cookie"),
        req: request,
    });
 
    if (user && isPathAuth?.length) {
        url.pathname = "/";
        return NextResponse.redirect(url);
    } else if (!user && !isPathAuth?.length) {
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }

    if (user) {
        response.headers.set("X-USER-DATA", JSON.stringify(user));
    }
    return response;
}

export const returnUrl = (req: NextRequest, path: string, params: string = "") => {
    const url = req.nextUrl.clone();
    const urlFormatted = `${url.origin}${path}?${params}`;
    return urlFormatted;
};

export const getUser = async ({ cookies, req }: ValidateAuthI): Promise<object | null> => {
    const formattedCookies = formatCookiesUtils(`${cookies}`);
    const authToken = formattedCookies["auth-token"];

    console.log({ formattedCookies });


    const githubUserUrl = 'https://api.github.com/user'; // GitHub API endpoint for retrieving authenticated user data

    try {
      const response = await fetch(githubUserUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (response.ok) {
        const userData = await response.json();
        return userData;
      } else {
        console.error('GitHub API error:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching GitHub user:', error);
      return null;
    }
};

