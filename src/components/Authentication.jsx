import React, { useState } from 'react';
import ClinicButton from './ClinicButton';

function Authentication() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [doYouHaveAccount, setDoYouHaveAccount] = useState(true);

  function checkLogin() {
    alert("This is your username " + userName + "\nPassword: " + password);
  }

  function toggleAccount() {
    setDoYouHaveAccount(!doYouHaveAccount);
  }

  return (
    <>
      {doYouHaveAccount ? (
        <div style={{ border: "3px solid blue", marginTop: "200px" }}>
          <h1>Sign-In</h1>
          <h3>Access your academic portal</h3>

          <div>
            <label htmlFor="username">Username</label>
            <br />
            <input
              id="username"
              type="text"
              placeholder="Please enter your user name"
              autoComplete="off"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br />
          <ClinicButton buttonLabel="LOGIN" actionButton={checkLogin} />

          <p>New here?</p>
          <ClinicButton buttonLabel="Create an Account" actionButton={toggleAccount} />
        </div>
      ) : (
        <div style={{ border: "3px solid indigo", marginTop: "3px" }}>
          <h1>Create an Account</h1>
          <h3>Access to portal</h3>

          <div>
            <label htmlFor="studentId">studentid</label>
            <br />
            <input
              id="studentId"
              type="text"
              autoComplete="off"
              onChange={(e) => setStudentID(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              id="email"
              type="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="newPassword">Password</label>
            <br />
            <input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <br />
          <ClinicButton buttonLabel="CREATE AN ACCOUNT" />

          <p>Already have an account?</p>
          <ClinicButton buttonLabel="Sign In" actionButton={toggleAccount} />
        </div>
      )}
    </>
  );
}

export default Authentication;
