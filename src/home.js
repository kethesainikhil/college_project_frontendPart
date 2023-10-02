import React from 'react'
import { useState } from 'react'
import axios from "axios"
const Home = () => {
  const [file, setFile] = useState()
  const [image,setImage] = useState("");
  function handleChange(event) {
    setFile(event.target.files[0])
    
  }

  
  function handleSubmit(event) {
    
    event.preventDefault()
    const url = 'http://localhost:8000/predict';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    
    axios.post(url, formData, config).then((response) => {
      const {data} = response;
      setImage(URL.createObjectURL(file));
      setOutputClass(data.class)
      setOutputConfidence(data.confidence)
    });
  }
  const [outputClass,setOutputClass] = useState("");
  const [outputConfidence,setOutputConfidence] = useState("");
  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <h1 >BENIGN VS MALIGNANT DETECTOR</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
        <hr />
        <h1>output:</h1>
        <img src={image} alt="display" />
        <h2>output-class:{outputClass}</h2>
        <h2>output-confidence:{outputConfidence}</h2>

    </div>
  );
}

export default Home
