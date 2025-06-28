import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    nodeVersion: process.version,
    npmVersion: process.env.npm_version || "未知",
    platform: process.platform,
    arch: process.arch,
    environment: process.env.NODE_ENV,
  })
}
