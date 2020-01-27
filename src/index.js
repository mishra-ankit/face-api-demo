import "./styles.css";
import * as faceapi from "face-api.js";

console.log(faceapi.nets);

async function init() {
  const t = await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
}

async function uploadImage() {
  const imgFile = document.getElementById("myFileUpload").files[0];
  // create an HTMLImageElement from a Blob
  const img = await faceapi.bufferToImage(imgFile);
  document.getElementById("myImg").src = img.src;

  const detections = await faceapi.detectAllFaces(img);
  console.log(detections);

  const displaySize = { width: img.width, height: img.height };
  // resize the overlay canvas to the input dimensions
  const canvas = document.getElementById("overlay");
  faceapi.matchDimensions(canvas, displaySize);

  // resize the detected boxes in case your displayed image has a different size than the original
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  // draw detections into the canvas
  faceapi.draw.drawDetections(canvas, resizedDetections);

  const results = document.getElementById("results");
  results.innerText = `Found ${detections.length} faces.`;
}

init();

const uploadBtn = document.getElementById("myFileUpload");
uploadBtn.onchange = uploadImage;
