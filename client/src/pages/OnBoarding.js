import { useState } from "react";
import Nav from "../components/Nav";

const OnBoarding = () => {
  const handleSubmit = () => {};

  const handleChange = () => {};

  return (
    <>
      <Nav
        setShowModal={() => {}}
        showModal={false}
        setIsSignUp={false}
        minimal={false}
      />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={""}
              onChange={handleChange}
            />
            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={""}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={""}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={""}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <label htmlFor="male-gender-identity">Male</label>
              <input
                id="male-gender-identity"
                type="radio"
                name="gender-identity"
                required={true}
                value="male"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor="female-gender-identity">Female</label>
              <input
                id="female-gender-identity"
                type="radio"
                name="gender-identity"
                required={true}
                value="female"
                onChange={handleChange}
                checked={false}
              />
            </div>
            <label htmlFor="show-gender">Show Gender On My Profile </label>
            <input
              id="show-gender"
              type="checkbox"
              name="show-gender"
              required={true}
              value="female"
              onChange={handleChange}
              checked={false}
            />

            <label>Show Me</label>
            <div className="multiple-input-container">
              <input
                id="female-gender-identity"
                type="radio"
                name="gender-identity"
                required={true}
                value="female"
                onChange={handleChange}
                checked={false}
              />
            </div>
            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="Tell Us Abouy Yourself!"
              value={""}
              onChange={handleChange}
            />

            <input type="submit" />
          </section>
          <section>
            <label htmlFor="url">Profile Photo</label>
           
              <input
                type="url"
                name="url"
                id="url"
                onChange={handleChange}
                required={true}
              />
          <div className="photo-container">
            
          </div>
          </section>

         
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
