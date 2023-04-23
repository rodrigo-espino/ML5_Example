import React, { useState, useEffect } from "react";
import { imageClassifier } from "ml5";

export function ML5() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState("");
  const [label, setLabel] = useState("");
  const [confidence, setConfidence] = useState("");
  let classifier

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
    
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  const modelReady = () => {
    console.log("Model is ready");
  }
  const preaload = () => {
    classifier =  imageClassifier("MobileNet", modelReady);
    
    classifier.classify(document.getElementById('image'), (err, results) => {
      if(err){
        console.error(err);
      }
      console.log("Results: ", results);
      setLabel(results[0].label);
      setConfidence(results[0].confidence);
    });
  }


  return (
    <>
    <div className="row  justify-content-between">
    <div className="col-6 col-md-4">
      <div className="input-group">
        <input
          type="file"
          className="form-control"
          id="inputGroupFile04"
          aria-describedby="inputGroupFileAddon04"
          aria-label="Select Image"
          accept="image/*"
          onChange={onImageChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="inputGroupFileAddon04"
          onClick={preaload}
        >
          Predict
        </button>
      </div>
      </div>

      <div className="col-sm-6 col-md-8 ">
      {imageURLs?(
        <>
          <div className="col-md-4">
            <div className="card">
              <img src={imageURLs} className="card-img-top" id="image" alt="Prediction"/>
              {label ? (
                <div className="card-body">
                  <div className="card-text">
                   <h5>Label:</h5>
                    <p>{label}</p>
                    <h5>Confidence:</h5>
                    <p>{confidence}</p>
                  </div>
                </div>

                ) : null}
            </div>
          </div>
        </>
      ) : null}
          </div>
          </div>
    </>
  );
}
