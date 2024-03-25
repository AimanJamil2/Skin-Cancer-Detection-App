//const { PythonShell } = require('python-shell');
const tf = require('@tensorflow/tfjs-node');

// Path to Python preprocessing file
//const preprocessing_script = 'path/to/preprocess_script.py';

// Load the pre-trained model
const loadModel = async () => {
  const model = await tf.loadLayersModel('skincancerdetection/model/trained_model.h5');
  return model;
};

// let model;

// loadModel().then((loadedModel) => {
//   model = loadedModel;
// });

let modelPromise = loadModel();

// Function to preprocess image using Python script
/*const preprocessImage = (imagePath) => {
  return new Promise((resolve, reject) => {
    PythonShell.run(preprocessing_script, { args: [imagePath] }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};*/

// Controller function to predict skin cancer
const predictSkinCancer = async (req, res) => {
  try {
    const model = await modelPromise;
    const { imageData } = req.body;

    const buffer = Buffer.from(imageData, 'base64');

    // Preprocess the image and convert it to TensorFlow.js tensor
    //const preprocessedImage = await preprocessImage(buffer);
    //const imageTensor = tf.node.decodeImage(preprocessedImage);

    const tensor = tf.node.decodeImage(buffer);
    const predictionTensor = model.predict(tensor);
    const prediction = predictionTensor.arraySync();
    //const prediction = model.predict(tensor);
    //const prediction = model.predict(buffer);

    // Send the prediction as the response
    res.json({ prediction });
  } catch (error) {
    console.error('Error predicting skin cancer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { predictSkinCancer };