import { useState } from "react";
import Nav from "../components/Nav";

const OnBoarding = () => {
 //CREATE AN COMPONENT TO POPULATE THE BREED PREFERENCE
    const [formData,setFormData] = useState({
        user_id : "",
        first_name:"",
        dob_day:"",
        dob_month:"",
        dob_year:"",
        gender : "",
        email:"",
        url:"",
        about:"",
        breed_preference:[],
        matches : []
    })
  const handleSubmit = (e) => {
    
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name;
    console.log("value: " + value , "name: " + name);

    setFormData((prevState) =>({
        ...prevState,
        [name] : value
    }))

   
  };

  console.log(formData);

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
              value={formData.first_name}
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
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="male-gender-identity"
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
                checked={formData.gender === "male"}
              />
               <label htmlFor="male-gender-identity">Male</label>
              
              <input
                id="female-gender-identity"
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
                checked={formData.gender === "female"}
              />
              <label htmlFor="female-gender-identity">Female</label>
            </div>
          
            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="Tell Us Abouy Yourself!"
              value={formData.about}
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
                <img src={formData.url} alt="profile pic preview"></img>
            </div>

            

          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
