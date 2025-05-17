export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const id = parseInt(params.id);
    const body = await req.json();
    const { title, description, technologies, images, githubUrl, liveUrl } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const parsedTechnologies =
      typeof technologies === "string"
        ? technologies.split(",").map((entry: string) => {
            const [name, icon] = entry.split(":").map((s) => s.trim());
            return { name, icon };
          })
        : technologies;

    const parsedImages = Array.isArray(images) ? images : [];

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        technologies: parsedTechnologies,
        images: parsedImages,
        githubUrl,
        liveUrl,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: {id: string} }) {
  try {
    const { params } = context;
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid project ID"}, { status: 400 });
    }

    const deletedProject = await prisma.project.delete({
      where: {id},
    });

    return NextResponse.json({ message: "Project deleted cuccessfully", data: deletedProject });
  } catch (error) {
    console.error("Error deleteing project:", error);
    return NextResponse.json({ error: "Internal server error"}, { status: 500 });
  }
}
