import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "../styles/addStadium.css";
import CustomInput from "../components/customInputField";
import CustomButton from "../components/customButton";

export default function addStadium() {
  const router = useRouter();
  const {
    stadiumName,
    stadiumAddress,
    stadiumCity,
    stadiumCapacity,
  } = router.query;

  const [stadiumNameState, setStadiumNameState] = useState("");
  const [stadiumAddressState, setStadiumAddressState] = useState("");
  const [stadiumCityState, setStadiumCityState] = useState("");
  const [stadiumCapacityState, setStadiumCapacityState] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setStadiumNameState(stadiumName || "");
      setStadiumAddressState(stadiumAddress || "");
      setStadiumCityState(stadiumCity || "");
      setStadiumCapacityState(stadiumCapacity || "");
    }
  }, [
    router.isReady,
    stadiumName,
    stadiumAddress,
    stadiumCity,
    stadiumCapacity,
  ]);

  const handleSave = () => {
    // Implement your save logic here
    // This could involve sending a request to an API endpoint
    console.log("Saving Stadium details:", {
      stadiumName: stadiumNameState,
      stadiumAddress: stadiumAddressState,
      stadiumCity: stadiumCityState,
      stadiumCapacity: stadiumCapacityState,
    });

    // After saving, you might want to navigate the user away or give a success message
    // router.push('/some-success-page');
  };

  return (
    <div className="Edit-Match">
      <h1>Add New Stadium</h1>
      <div className="columns-container">
        <div className="column">
          <div className="input-fields-container">
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
            <CustomInput
              type="number"
              name="stadiumCapacity"
              placeholder="Stadium Capacity"
              id="stadiumCapacity"
              value={stadiumCapacityState}
              onChange={(e) => setStadiumCapacityState(e.target.value)}
            />
          </div>

        </div>
      </div>
      <div className="custom-button-container">
        <CustomButton onClick={handleSave}>Save</CustomButton>
      </div>
    </div>
  );
}
