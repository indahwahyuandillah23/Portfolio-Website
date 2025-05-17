import { NextResponse  } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

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

        try {
            const emailResponse = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'indahwahyuandillah930@gmail.com',
                subject: `New message from ${name}`,
                html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br/>${message}</p>
                `,
        });
            console.log("Email sent response:", emailResponse);
        } catch (e) {
            console.error("Error sending email:", e);
            throw e;
        }


        return NextResponse.json({ success: true, data: newMessage });
    } catch (error) {
        console.error("Contact from error:", error);
        return NextResponse.json({error: 'Internal Server Error'}, { status: 500})
    }
}