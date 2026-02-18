import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const slug = slugify(body.title, { lower: true, strict: true });
  const service = await prisma.service.create({
    data: { ...body, slug },
  });
  return NextResponse.json(service, { status: 201 });
}
