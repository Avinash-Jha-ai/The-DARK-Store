import ImageKit from "imagekit"; 
import { config } from '../configs/config.js';

const client = new ImageKit({
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

export async function uploadFile({ buffer, fileName, folder = "E-commerce" }) {
    const result = await client.upload({
        file: buffer.toString("base64"), // ✅ convert buffer to base64
        fileName,
        folder
    });

    return result;
}