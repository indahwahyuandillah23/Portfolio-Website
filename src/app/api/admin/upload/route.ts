import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public/uploads/projects");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

function bufferToStream(buffer: Buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

export async function POST(req: Request) {
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir,
    keepExtensions: true,
  });

  const reqBuffer = Buffer.from(await req.arrayBuffer());
  const reqStream = bufferToStream(reqBuffer);

  // Buat objek fake IncomingMessage yang punya stream dan headers
  const fakeReq = Object.assign(reqStream, {
    headers: Object.fromEntries(req.headers.entries()),
  });

  return new Promise<NextResponse>((resolve, reject) => {
    form.parse(fakeReq as any, (err, fields, files) => {
      if (err) {
        reject(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
        return;
      }

      const uploadedFiles = Array.isArray(files.images)
        ? files.images
        : files.images
        ? [files.images]
        : [];

      const urls = uploadedFiles
      .filter((file): file is formidable.File => !!file && typeof (file as any).path === "string")
      .map(file => `/uploads/projects/${path.basename((file as any).path)}`);

      resolve(NextResponse.json({ urls }));
    });
  });
}
