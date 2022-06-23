import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const imagesCollectionUrl = require('./json/imagesCollectionUrl.json');

import ffmpeg from "fluent-ffmpeg";
import axios from "axios";
import fs from 'fs';

console.time();

const pathFromDisk = `${process.cwd()}/src`;
const resultFiles = [];

if (!fs.existsSync('./src/images')){
  fs.mkdirSync('./src/images');
}

if (!fs.existsSync('./src/webp')){
  fs.mkdirSync('./src/webp');
}

for (let image of imagesCollectionUrl) {
  const imageUrl = image.url || Object.values(image)[0];

  let result = {
    image: imageUrl
  }

  try {
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'stream'
    });

    const fileName = response.request.path.split('/').pop();
    
    const downloadedFileName = await new Promise((resolve, reject) => {
      const pathFileName = `src/images/${fileName}`;

      response.data.pipe(fs.createWriteStream(pathFileName))
        .on('error', reject)
        .once('close', () => {
          var { size } = fs.statSync(pathFileName);
          result.sourceSize = (size / 1024).toFixed(2);
          
          console.log(`A new image has been downloaded ${fileName}`);

          resolve(fileName);
        });    
    });
    
    const imageSource = `${pathFromDisk}/images/${downloadedFileName}`;
    const newFileWebpName = `${downloadedFileName.split('.').slice(0, -1).toString()}.webp`;
    const imageOutPut = `${pathFromDisk}/webp/${newFileWebpName}`;
    
    await new Promise((resolve, error) => {
      ffmpeg()
        .input(imageSource)
        .saveToFile(imageOutPut)
        .on('end', () => {
          var { size } = fs.statSync(imageOutPut);
          result.webpSize = (size / 1024).toFixed(2);

          console.log(`A new image has been converted ${newFileWebpName}`);
          resolve(true);
        })
        .on('error', error)
    });
  } catch (err) {
    console.error(`Error to process a image from url: ${imageUrl}`);
    continue;
  }

  resultFiles.push(result);
}

console.log(`It was finished.`);

fs.writeFileSync(
  './src/json/result.json', 
  JSON.stringify(resultFiles), 
  (err) => {
    if (err) return console.error(err);
    console.log("Output result has been created!");
  }
);

console.timeEnd();