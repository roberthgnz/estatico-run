import S3 from 'aws-sdk/clients/s3.js';
import type { MultiPartData } from 'h3'

export const s3 = new S3({
    endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    token: process.env.CLOUDFLARE_R2_TOKEN as any,
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY as string,
    signatureVersion: 'v4',
});

export const upload = async (key: string, file: MultiPartData) => {
    return new Promise((resolve, reject) => {
        return s3.upload({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET as string,
            Key: key,
            Body: file?.data,
            ContentType: file?.type,
            // Set expiration to 1 day
            Expires: new Date(Date.now() + 86400 * 1000),
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });

    })
}

export const download = async (key: string) => {
    return new Promise((resolve, reject) => {
        return s3.getObject({
            Bucket: process.env.CLOUDFLARE_R2_BUCKET as string,
            Key: key,
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

export const objectOutputToResponse = (file: S3.GetObjectOutput) => {
    const blob = new Blob([file.Body], { type: file.ContentType });
    const options = { status: 200, statusText: 'OK' };
    return new Response(blob, options);
}