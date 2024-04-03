const tf = require('@tensorflow/tfjs-node');

// Load the pre-trained model
/*const loadModel = async () => {
  const model = await tf.loadLayersModel('skincancerdetection/server/trained_model.h5');
  return model;
};*/

let modelPromise = loadModel();

// Controller function to predict skin cancer
const predictSkinCancer = async (req, res) => {
  try {
    const model = await modelPromise;
    const { imageData } = req.body;

    const buffer = Buffer.from(imageData, 'base64');
    const tensor = tf.node.decodeImage(buffer);
    const predictionTensor = model.predict(tensor);
    const prediction = predictionTensor.arraySync();

    // Send the prediction as the response
    res.json({ prediction });
  } catch (error) {
    console.error('Error predicting skin cancer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { predictSkinCancer };