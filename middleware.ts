import { validateToken } from "@/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  switch (req.nextUrl.pathname) {
    case "/admin/users":
    case "/admin/category":
    case "/admin/sub-category":
    case "/admin/collection":
      return validateRoleAdmin(req);
    case "/admin/material":
    case "/admin/movements":
    case "/admin/purchase":
    case "/admin/purchase/:id":
    case "/admin/entry-guide":
    case "/admin/reception":
    case "/admin/purchase/reception/:id":
      return validateRoleGrocerOrAdmin( req );
    case "/admin/grocer":
    case "/admin/carrier":
    case "/admin/product":
    case "/admin/supplier":
    case "/admin/orders":
    case "/admin/orders/shipping":
    case "/admin/orders/preparation":
      return validateRoleCarrierGrocerOrAdmin( req );
    case "/auth/login":
      return validateAuth(req);
    case "/profile":
    case "/orders":
    case "/orders/:id":
    case "/cart/checkout":
    case "/cart/checkout/confirm":
      return validateSession(req);
    default:
      return NextResponse.next();
  }
}

const validateRoleAdmin = async (req: NextRequest) => {
  const session = await validateToken(req.cookies.get("token")?.value + "");
  if (!session?.success || session === undefined || session === null) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.search = `prevPage=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const validRole = "ROLE_ADMIN";
  if (session && !session.content.roles.includes(validRole)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

const validateRoleGrocerOrAdmin = async (req: NextRequest) => {
  const session = await validateToken(req.cookies.get("token")?.value + "");
  if (!session?.success || session === undefined || session === null) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.search = `prevPage=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const validRoles = ["ROLE_ADMIN","ROLE_WAREHOUSE"];

  let isRoleValid = false;
  session.content.roles.forEach( r => {
    if( validRoles.includes(r) ){
      isRoleValid = true;
    }
  });

  if (session && !isRoleValid) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

const validateRoleCarrierGrocerOrAdmin = async (req: NextRequest) => {
  const session = await validateToken(req.cookies.get("token")?.value + "");
  if (!session?.success || session === undefined || session === null) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.search = `prevPage=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const validRoles = ["ROLE_ADMIN","ROLE_WAREHOUSE","ROLE_TRANSPORT"];

  let isRoleValid = false;
  session.content.roles.forEach( r => {
    if( validRoles.includes(r) ){
      isRoleValid = true;
    }
  });

  if (session && !isRoleValid) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

const validateSession = async (req: NextRequest) => {
  const session = await validateToken(req.cookies.get("token")?.value + "");
  if (!session?.success || session === undefined || session === null) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.search = `prevPage=${requestedPage}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

const validateAuth = async (req: NextRequest) => {
  const session = await validateToken(req.cookies.get("token")?.value + "");
  if (session && session.success ) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/admin/users",
    "/admin/category",
    "/admin/sub-category",
    "/admin/collection",
    "/admin/material",
    "/admin/grocer",
    "/admin/carrier",
    "/admin/product",
    "/admin/orders",
    "/admin/supplier",
    "/admin/movements",
    "/admin/purchase",
    "/admin/purchase/:id",
    "/admin/entry-guide",
    "/admin/reception",
    "/admin/purchase/reception/:id",
    "/admin/orders/preparation",
    "/admin/orders/shipping",
    "/auth/login",
    "/cart/checkout",
    "/cart/checkout/confirm",
    "/profile",
    "/orders",
    "/orders/:id",
  ],
};
