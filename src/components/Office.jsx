import React, { useState } from 'react';
import axios from 'axios';
import ClinicButton from './ClinicButton';

function Office() {
  const [officeName, setOfficeName] = useState("");
  const [officeNumber, setOfficeNumber] = useState("");

  async function saveOffice() {
    try {
      const response = await axios.post("http://localhost:1014/api/offices", {
        name: officeName,
        officeNumber: Number(officeNumber)
      });

      if (response.status === 200 || response.status === 201) {
        alert("Success: Office is saved successfully");
        setOfficeName("");
        setOfficeNumber("");
      }
    } catch (error) {
      if (error.response) {
        alert("Error: " + error.response.status + " - Office could not be saved");
      } else {
        alert("Error: Cannot connect to the server. " + error.message);
      }
    }
  }

  return (
    <div>
      <h1>Save Office</h1>

      <div>
        <label htmlFor="officeName">Office Name: </label>
        <input
          id="officeName"
          type="text"
          value={officeName}
          onChange={(e) => setOfficeName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label htmlFor="officeNumber">Office Number: </label>
        <input
          id="officeNumber"
          type="number"
          value={officeNumber}
          onChange={(e) => setOfficeNumber(e.target.value)}
        />
      </div>

      <br />

      <ClinicButton
        buttonLabel="SAVE OFFICE"
        actionButton={saveOffice}
      />
    </div>
  );
}

export default Office;
