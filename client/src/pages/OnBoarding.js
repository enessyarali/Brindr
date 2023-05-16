import { useState } from "react";
import Nav from "../components/Nav";
import BreedSelection from "../components/BreedSelection";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const OnBoarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    gender: "",
    url: "",
    about: "",
    breed_type: "",
    breed_interest: [],
    matches: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8000/user", {
        formData,
      });
      console.log(response);
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

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
      const breed_interest = [...prevState.breed_interest];
      breed_interest[index] = value;
      return { ...prevState, breed_interest };
    });
  };

  const addInput = () => {
    setFormData((prevState) => ({
      ...prevState,
      breed_interest: [...prevState.breed_interest, { option: "", value: "" }],
    }));
  };

  const deleteInput = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      breed_interest: prevState.breed_interest.filter((_, i) => i !== index),
    }));
  };
  const options = [
    "Tekir",
    "British",
    "Scottish",
    "Angora",
    "Maine",
    "Persian",
    "Bombay",
    "Bengal",
    "Siamese"
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

            <label htmlFor="breed-type">Breed Type</label>
            <input
              id="breed-type"
              type="text"
              name="breed_type"
              required={true}
              placeholder="Which breed are you?"
              value={formData.breed_type}
              onChange={handleChange}
            />

            <label>Breed interes </label>
            <BreedSelection
              handleOptionChange={handleOptionChange}
              addInput={addInput}
              deleteInput={deleteInput}
              options={options}
              breedPreference={formData.breed_interest}
            />

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
              {formData.url && (
                <img src={formData.url} alt="profile pic preview"></img>
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
