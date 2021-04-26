import React from "react";
import "./About.css";

// this will be the landing page
export default function About() {
  return (
    <div className="About">
      <h1>About Page</h1>
      <div className="About__description">
        <p>
          TakeCharge aims to provide a way for patients to be in control of
          their health. Apps like MyChart only work if
        </p>
        <div className="About__description-list">
          1) all of the patient’s providers work within that same health system
          <br />
          2) the patient is tech savvy
          <br />
          3) the patient is cognitively intact and health literate.
        </div>

        <p>
          TakeCharge allows patients to save and manage information related to
          their health care providers, visits, and recommendations in a way that THEY
          can understand. The patient, their caregiver, or their healthcare
          provider can quickly type the information into designated areas
          throughout the app, using only language that is appropriate for the
          patient.
        </p>
      </div>
    </div>
  );
}
