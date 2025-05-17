import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching admin projects:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, technologies, images, githubUrl, liveUrl } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Parse technologies: string => array of objects
    const parsedTechnologies =
      typeof technologies === "string"
        ? technologies.split(",").map((entry: string) => {
            const [name, icon] = entry.split(":").map((s) => s.trim());
            return { name, icon };
          })
        : technologies;

    // Pastikan images array of string
    const parsedImages =
      Array.isArray(images) && images.every((img) => typeof img === "string")
        ? images
        : [];

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        technologies: parsedTechnologies,
        images: parsedImages,
        githubUrl,
        liveUrl,
      },
    });

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
