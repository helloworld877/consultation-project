import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "../styles/addStadium.css";
import CustomInput from "../components/customInputField";
import CustomButton from "../components/customButton";

export default function AddStadium() {
  const router = useRouter();
  const {
    stadiumName,
    stadiumAddress,
    stadiumCity,
    stadiumCapacityRows,
    stadiumCapacityColumns,
  } = router.query;

  const [stadiumNameState, setStadiumNameState] = useState("");
  const [stadiumAddressState, setStadiumAddressState] = useState("");
  const [stadiumCityState, setStadiumCityState] = useState("");
  const [stadiumCapacityRowsState, setStadiumCapacityRowsState] = useState("");
  const [stadiumCapacityColumnsState, setStadiumCapacityColumnsState] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setStadiumNameState(stadiumName || "");
      setStadiumAddressState(stadiumAddress || "");
      setStadiumCityState(stadiumCity || "");
      setStadiumCapacityRowsState(stadiumCapacityRows || "");
      setStadiumCapacityColumnsState(stadiumCapacityColumns || "");
    }
  }, [
    router.isReady,
    stadiumName,
    stadiumAddress,
    stadiumCity,
    stadiumCapacityRows,
    stadiumCapacityColumns,
  ]);

  const handleSave = () => {
    // Validation: Check if any field is empty
    if (
      !stadiumNameState ||
      !stadiumAddressState ||
      !stadiumCityState ||
      !stadiumCapacityRowsState ||
      !stadiumCapacityColumnsState
    ) {
      setError("All fields must be filled out.");
      return;
    }

    // Validation: Rows and columns should not be bigger than 7
    if (
      parseInt(stadiumCapacityRowsState, 10) > 7 ||
      parseInt(stadiumCapacityColumnsState, 10) > 7
    ) {
      setError("Rows and columns cannot be bigger than 7.");
      return;
    }

    // Implement your save logic here
    // This could involve sending a request to an API endpoint
    console.log("Saving Stadium details:", {
      stadiumName: stadiumNameState,
      stadiumAddress: stadiumAddressState,
      stadiumCity: stadiumCityState,
      stadiumCapacityRows: stadiumCapacityRowsState,
      stadiumCapacityColumns: stadiumCapacityColumnsState,
    });

    // Reset error state
    setError("");

    // After saving, you might want to navigate the user away or give a success message
    // router.push('/some-success-page');
  };

  return (
    <div className="Edit-Match">
      <h1 style={{ color: "white" }}>Add New Stadium</h1>
      <div className="columns-container">
        <div className="column">
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="stadiumName" style={{ color: "white" }}>
                Stadium Name:
              </label>
            </div>
            <CustomInput
              type="text"
              name="stadiumName"
              placeholder="Stadium Name"
              id="stadiumName"
              value={stadiumNameState}
              onChange={(e) => setStadiumNameState(e.target.value)}
            />
          </div>

          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="stadiumCity" style={{ color: "white" }}>
                City:
              </label>
            </div>
            <CustomInput
              type="text"
              name="stadiumCity"
              placeholder="City"
              id="stadiumCity"
              value={stadiumCityState}
              onChange={(e) => setStadiumCityState(e.target.value)}
            />
          </div>
        </div>
        <div className="column">
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="stadiumAddress" style={{ color: "white" }}>
                Address:
              </label>
            </div>
            <CustomInput
              type="text"
              name="stadiumAddress"
              placeholder="Address"
              id="stadiumAddress"
              value={stadiumAddressState}
              onChange={(e) => setStadiumAddressState(e.target.value)}
            />
          </div>
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label htmlFor="stadiumCapacityRows" style={{ color: "white" }}>
                Rows:
              </label>
            </div>
            <CustomInput
              type="number"
              name="stadiumCapacity"
              placeholder="Rows"
              id="stadiumCapacityRows"
              value={stadiumCapacityRowsState}
              onChange={(e) => setStadiumCapacityRowsState(e.target.value)}
            />
          </div>
          <div className="input-fields-container">
            <div className="input-fields-label">
              <label
                htmlFor="stadiumCapacityColumns"
                style={{ color: "white" }}
              >
                Columns:
              </label>
            </div>
            <CustomInput
              type="number"
              name="stadiumCapacity"
              placeholder="Columns"
              id="stadiumCapacityColumns"
              value={stadiumCapacityColumnsState}
              onChange={(e) => setStadiumCapacityColumnsState(e.target.value)}
            />
          </div>
        </div>
      </div>
      {error && <p className="error-message" style={{ color: "white" }}>{error}</p>}
      <div className="custom-button-container">
        <CustomButton onClick={handleSave} style={{ color: "white" }}>
          Save
        </CustomButton>
      </div>
    </div>
  );
}
