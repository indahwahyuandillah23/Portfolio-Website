import { NextResponse } from "next/server";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Konfigurasi Next.js untuk non-bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Setup Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Bikin helper stream dari buffer
function bufferToStream(buffer: Buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

// Upload ke Cloudinary dan balikin URL
async function uploadToCloudinary(filePath: string) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "projects", // folder di cloudinary
    resource_type: "image",
  });
  return result.secure_url;
}

export async function POST(req: Request) {
  const form = new formidable.IncomingForm({
    multiples: true,
    keepExtensions: true,
  });

  const reqBuffer = Buffer.from(await req.arrayBuffer());
  const reqStream = bufferToStream(reqBuffer);

  const fakeReq = Object.assign(reqStream, {
    headers: Object.fromEntries(req.headers.entries()),
  });

  return new Promise<NextResponse>((resolve, reject) => {
    form.parse(fakeReq as any, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        reject(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
        return;
      }

      try {
        const uploadedFiles = Array.isArray(files.images)
          ? files.images
          : files.images
          ? [files.images]
          : [];

        const urls = [];

        console.log(uploadedFiles);
        

        for (const file of uploadedFiles) {
          const filePath = (file as any).filepath || (file as any).path;
          if (filePath) {
            const url = await uploadToCloudinary(filePath);
            urls.push(url);
          }
        }

        resolve(NextResponse.json({ urls }));
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        reject(NextResponse.json({ error: "Cloudinary upload failed" }, { status: 500 }));
      }
    });
  });
}
