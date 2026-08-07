import { NextResponse } from "next/server";
import ImageKit from "imagekit";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

    if (!publicKey || !privateKey || !urlEndpoint) {
      return NextResponse.json({ error: "ImageKit credentials are not configured" }, { status: 500 });
    }

    const imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to ImageKit
    const response = await new Promise((resolve, reject) => {
      imagekit.upload(
        {
          file: buffer,
          fileName: file.name,
          folder: "/portfolio_projects", // Optional: organizes uploads into a specific folder
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
