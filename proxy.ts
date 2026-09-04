export function proxy() {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }
}

export const config = {
  matcher: "/api/jobs/:path*",
};
