import AWS from 'aws-sdk';
import { createReadStream } from 'fs';
import { Video } from '../../models/video';
import { generateShortID } from '../url';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.BUCKET_REGION,
});

export const uploadVideo_AWS_S3 = async (videoId: string, file: Buffer) => {
    const s3 = new AWS.S3();
    const fileType = 'video/mp4';
    const fileNameCoded = generateShortID();
    const stream = file;
    const s3Params = {
        Bucket: process.env.VIDEO_BUCKET!,
        Key: fileNameCoded,
        ContentType: fileType,
        Body: stream,
        ACL: 'public-read',
    };

    const returnData: any = {
        url: null,
    };
    await new Promise((resolve, reject) => {
        s3.upload(s3Params, (err: any, data: any) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => {
        returnData.url = `https://${process.env.VIDEO_BUCKET}.s3.amazonaws.com/${fileNameCoded}`;
    });

    await Video.findOneAndUpdate(
        { _id: videoId },
        {
            S3_url: returnData.url,
        }
    );

    return returnData;
};
