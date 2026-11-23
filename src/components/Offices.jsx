import { useEffect, useState } from 'react';
import axios from 'axios';
import ClinicButton from './ClinicButton';

const OFFICES_URL = "http://localhost:1014/api/offices";

function Offices() {
  const [offices, setOffices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // true while the first load runs
  const [searchTerm, setSearchTerm] = useState("");

  function loadOffices() {
    axios.get(OFFICES_URL)
      .then((response) => {
        setOffices(response.data);
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage("Error: " + error.response.status + " - Offices could not be loaded");
        } else {
          setErrorMessage("Error: Cannot connect to the server. " + error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadOffices();
  }, []);

  function refreshOffices() {
    setIsLoading(true);
    loadOffices();
  }

  async function deleteOffice(office) {
    const confirmed = window.confirm(
      "Are you sure you want to delete the office \"" + office.name + "\"?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(OFFICES_URL + "/" + office.id);
      setSuccessMessage("Success: Office \"" + office.name + "\" was deleted successfully");
      setErrorMessage("");
      loadOffices();
    } catch (error) {
      setSuccessMessage("");
      if (error.response) {
        setErrorMessage("Error: " + error.response.status + " - Office could not be deleted");
      } else {
        setErrorMessage("Error: Cannot connect to the server. " + error.message);
      }
    }
  }

  // Update will be implemented in the next class.
  function updateOffice() {}

  // Case-insensitive search by office name or office number
  const search = searchTerm.trim().toLowerCase();
  const filteredOffices = offices.filter((office) => {
    const name = String(office.name ?? "").toLowerCase();
    const number = String(office.officeNumber ?? "").toLowerCase();
    return name.includes(search) || number.includes(search);
  });

  return (
    <div>
      <h1>Offices</h1>

      <ClinicButton buttonLabel="REFRESH" actionButton={refreshOffices} />

      <br />
      <br />

      <div>
        <label htmlFor="searchOffice">Search: </label>
        <input
          id="searchOffice"
          type="text"
          placeholder="Search by office name or number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {isLoading && <p>Loading offices...</p>}

      {!isLoading && offices.length === 0 && !errorMessage && (
        <p>No offices found.</p>
      )}

      {!isLoading && offices.length > 0 && filteredOffices.length === 0 && (
        <p>No offices match "{searchTerm}". Try a different name or number.</p>
      )}

      {!isLoading && filteredOffices.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              <th>Office ID</th>
              <th>Office Name</th>
              <th>Office Number</th>
              <th>Assigned Doctor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOffices.map((office) => (
              <tr key={office.id}>
                <td>{office.id}</td>
                <td>{office.name}</td>
                <td>{office.officeNumber}</td>
                <td>
                  {office.doctor
                    ? office.doctor.firstName + " " + office.doctor.lastName
                    : "Not assigned"}
                </td>
                <td>
                  <ClinicButton
                    buttonLabel="Delete"
                    actionButton={() => deleteOffice(office)}
                  />{" "}
                  <ClinicButton buttonLabel="Update" actionButton={updateOffice} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Offices;
