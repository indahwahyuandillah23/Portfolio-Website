import { NextResponse  } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({error: 'All fields are required' }, { status: 400 });
        }

        const newMessage = await prisma.message.create({
            data: {
                name,
                email,
                message
            },
        });

        return NextResponse.json({ success: true, data: newMessage });
    } catch (error) {
        console.error("Contact from error:", error);
        return NextResponse.json({error: 'Internal Server Error'}, { status: 500})
    }
}