import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "./lib/supabase";
import { checkUserDetails } from "./utils/functions/checkUserDetails";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const url = new URL(req.nextUrl);
  if (!session) {
    if (
      url.pathname.startsWith("/bill") ||
      url.pathname.startsWith("/profile") ||
      url.pathname.startsWith("/report")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (session) {
    const { data, error } = await supabase
      .from("roles")
      .select("*")
      .eq("id", session?.user.id);
    let superAdmin = false;
    let volunteer = false;
    if (data) {
      for (const obj of data!) {
        if (obj.role === "super_admin") {
          superAdmin = true;
        } else if (obj.role === "volunteer") {
          volunteer = true;
        } else {
          superAdmin = false;
          volunteer = false;
        }
      }
    }
    if (!superAdmin && url.pathname.startsWith("/report")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if ((volunteer || superAdmin) && url.pathname.startsWith("/bill")) {
      return NextResponse.next();
    }
    if ((!volunteer || !superAdmin) && url.pathname.startsWith("/bill")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    const userDetails = await supabase
      .from("users")
      .select()
      .eq("id", session?.user.id);
    if (
      !checkUserDetails(userDetails?.data?.[0]!) &&
      url.pathname !== "/profile"
    ) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
  ],
};
