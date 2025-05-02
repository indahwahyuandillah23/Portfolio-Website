import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                id: "desc"
            }
        });
        return NextResponse.json(projects);
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return NextResponse.json({ error: "Failed to fetch projects"}, { status: 500 });
    }
}