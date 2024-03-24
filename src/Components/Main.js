import React, { useState } from 'react';
import axios from 'axios';

const Main = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('/api/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='bg_cont'>
      <div className='navbar'>
        <h1>Skin Cancer Detection</h1>
      </div>
      <div className='main-container'>
        <input type="file" onChange={handleFileChange} />
        {selectedFile ? (
          <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" />
        ) : (
          <div className="image-placeholder">Your image here</div>
        )}
        {/* {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" />} */}
        <button onClick={handleUpload}>Detect</button>
        {prediction && <p>{prediction}</p>}
      </div>
    </div>
  );
};

export default Main;
