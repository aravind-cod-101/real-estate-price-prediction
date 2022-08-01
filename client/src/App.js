import "./App.css";
import React, { useState, useEffect } from "react";
import api from "./api";

function App() {
  const [location, setLocation] = useState("");
  const [total_sqft, setSqft] = useState(0);
  const [bath, setBath] = useState(1);
  const [bhk, setBhk] = useState(1);
  const [estimate, setEstimate] = useState(0);

  const values = {
    total_sqft: parseFloat(total_sqft),
    bhk: parseInt(bhk),
    bath: parseInt(bath),
    location: location,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await api.get("/get_location_names");
      console.log(response.data.locations);
    };

    fetch();
  }, []);

  const resetForm = () => {
    setLocation("");
    setSqft(0);
    setBath(0);
    setBhk(0);
  };

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleChangeBhk = (e) => {
    setBhk(e.target.value);
  };
  const handleChangeSquareFoot = (e) => {
    setSqft(e.target.value);
  };
  const handleChangeBath = (e) => {
    setBath(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    const res = await api.post("/predict_home_price", values);
    setEstimate(res.data.estimated_price);
    // resetForm();
  };

  return (
    <>
      <h1 className="d-flex justify-content-center">
        Real Estate Price Estimation
      </h1>

      <div className="App container d-flex align-items-center justify-content-between">
        <div className="col left">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => handleChangeLocation(e)}
              />

              {/* <select
                className="form-control"
                value={location}
                onChange={(e) => handleChangeLocation(e)}
              >
                {location.map((item, key) => {
                  return (
                    <option value={item} key={key}>
                      {item}
                    </option>
                  );
                })}
              </select> */}
            </div>

            <div className="mb-3">
              <label className="form-label">Square Foot</label>
              <input
                type="number"
                name="square_foot"
                value={total_sqft}
                onChange={(e) => handleChangeSquareFoot(e)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Bhk</label>
              <select
                value={bhk}
                onChange={(e) => handleChangeBhk(e)}
                className="form-control"
              >
                <option disabled value="Select no of Bedrooms">
                  Select no of Bedrooms
                </option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Bath</label>
              <select
                onChange={(e) => handleChangeBath(e)}
                value={bath}
                className="form-control"
              >
                <option disabled value="Select no of Bathrooms">
                  Select no of Bathrooms
                </option>

                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={(e) => handleSubmit(e)}
            >
              Get Estimate
            </button>
          </form>
        </div>

        <div className="col right">
          <div className="result">
            <h2>Estimated Price : {estimate}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
