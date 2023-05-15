require('dotenv').config();
const {S3Client, PutObjectCommand,GetObjectCommand} = require('@aws-sdk/client-s3')
const AWS_BUCKET_NAME=process.env.AWS_BUCKET_NAME
const AWS_PUBLIC_KEY=process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY=process.env.AWS_SECRET_KEY

const fs = require('fs')
const client = new S3Client({
    
    region:'us-east-1',
    credentials:{
        accessKeyId:AWS_PUBLIC_KEY,
        secretAccessKey:AWS_SECRET_KEY
    }
})

async function uploadFile(file){
    console.log('file',file);
    const stream = fs.createReadStream(file.tempFilePath);
    const uploadParams = {
        Bucket:AWS_BUCKET_NAME,
        Key:file.name,
        Body:stream
    }
    const command = new PutObjectCommand(uploadParams);
    return await client.send(command)
}

    async function readData(fileName){
        const command = new GetObjectCommand({
            Bucket:AWS_BUCKET_NAME,
            Key:fileName
        })

        const result  = await client.send(command);
        // const newFile = fs.createWriteStream('./images/newImage.png')
        result.Body.pipe(fs.createWriteStream('./images/newImage.png'))
    }

module.exports = {
    uploadFile,
    readData
}