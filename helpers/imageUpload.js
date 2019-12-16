import loadImage from 'blueimp-load-image';
import { IMAGE_UPLOAD_LINK } from './graphql/upload';
import graphQLClient from './graphQLClient';
import { getInfoToken } from './token';

// prevent ssr problems due to missing window on server
let dataURLtoBlob;
const isWindow = typeof window !== 'undefined';
if (isWindow) dataURLtoBlob = require('blueimp-canvas-to-blob');

const blobToFile = (theBlob, fileName) => {
  // https://stackoverflow.com/questions/27159179/how-to-convert-blob-to-file-in-javascript
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
};

const upload = file => {
  // Reject non-image files
  if (file.type.split('/')[0] !== 'image') return;

  // eslint-disable-next-line consistent-return
  return new Promise(resolve => {
    const infoToken = getInfoToken();

    const variables = {
      filename: file.name,
      size: file.size,
      infoToken,
    };

    // eslint-disable-next-line consistent-return
    graphQLClient(IMAGE_UPLOAD_LINK, variables).then(data => {
      if (!data || !data.imageUploadLink || !data.imageUploadLink.success) {
        return;
      }
      const { fileName, uploadUrl } = data.imageUploadLink;

      const xhr = new XMLHttpRequest();
      xhr.open('PUT', uploadUrl, true);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file); // `file` is a File object here

      // eslint-disable-next-line consistent-return
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // File uploaded successfully
          resolve(`https://img.travelfeed.io/${encodeURIComponent(fileName)}`);
        }
      };
    });
  });
};

const uploadFile = async (localfile, options) => {
  return new Promise((resolve, reject) => {
    if (
      localfile.size < 1000000 ||
      localfile.type === 'image/gif' ||
      options.allowFullSize
    ) {
      // Upload files under 1MB directly. Also don't resize gifs since that would break animations
      upload(localfile)
        .then(result => {
          resolve(result);
        })
        .catch(() => reject(new Error('Image could not be uploaded')));
    } else {
      // Resize large images before uploading
      const canvasId = 'hiddenResizeCanvas';
      const imgId = 'hiddenUploadedImage';
      loadImage(
        localfile,
        async resimg => {
          resimg.id = imgId;
          resimg.style.display = 'none'; // Make sure the image is hidden
          document.body.appendChild(resimg);
          const img = document.getElementById(imgId);
          const { height, width, naturalWidth } = img;
          // don't resize images smaller than the allowed size
          if (naturalWidth < 1920) {
            upload(localfile)
              .then(result => {
                resolve(result);
              })
              .catch(() => reject(new Error('Image could not be uploaded')));
          }
          const canvas = document.createElement('canvas'); // Dynamically Create a Canvas Element
          canvas.id = canvasId; // Give the canvas an id
          canvas.width = width; // Set the width of the Canvas
          canvas.height = height; // Set the height of the Canvas
          canvas.style.display = 'none'; // Make sure your Canvas is hidden
          document.body.appendChild(canvas); // Insert the canvas into your page
          const c = document.getElementById(canvasId); // Get canvas from page
          const ctx = c.getContext('2d'); // Get the "CTX" of the canvas
          ctx.drawImage(img, 0, 0, width, height); // Draw your image to the canvas
          const durl = c.toDataURL(localfile.type); // This will save your image as a
          const blob = await dataURLtoBlob(durl);
          // jpeg file in the base64 format.
          let resfile = await blobToFile(blob, localfile.name);
          // Upload original file instead if the resizing saves less than 25%
          if (resfile.size > localfile.size * 0.75) resfile = localfile;
          c.parentNode.removeChild(c);
          img.parentNode.removeChild(img);

          upload(resfile)
            .then(result => {
              resolve(result);
            })
            .catch(() => reject(new Error('Image could not be uploaded')));
        },
        { maxWidth: 1920 },
      );
    }
  });
};

export default uploadFile;
