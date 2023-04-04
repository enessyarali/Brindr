import { useState } from "react";
import Nav from "../components/Nav";
import BreedSelection from "../components/breedselection";
const OnBoarding = () => {
  //CREATE AN COMPONENT TO POPULATE THE BREED PREFERENCE
  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    gender: "",
    email: "",
    url: "",
    about: "",
    breed_preference: [],
    matches: [],
  });

  const handleSubmit = (e) => {};

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    console.log("value: " + value, "name: " + name);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionChange = (event, index) => {
    const { value } = event.target;
    setFormData((prevState) => {
      const breed_preference = [...prevState.breed_preference];
      breed_preference[index] = value;
      return { ...prevState, breed_preference };
    });
  };

  const addInput = () => {
    setFormData((prevState) => ({
      ...prevState,
      breed_preference: [
        ...prevState.breed_preference,
        { option: "", value: "" },
      ],
    }));
  };

  const deleteInput = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      breed_preference: prevState.breed_preference.filter(
        (_, i) => i !== index
      ),
    }));
  };
  const options = [
    "Labrador",
    "Poodle",
    "Golden Retriever",
    "Bulldog",
    "Beagle",
  ];

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
            <label>Breed Preference </label>
            <BreedSelection
              handleOptionChange={handleOptionChange}
              addInput={addInput}
              deleteInput={deleteInput}
              options={options}
              breedPreference={formData.breed_preference}
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
