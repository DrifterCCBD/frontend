import HeaderDriver from "./headerDriver";
import './headerDriver.css'
import './index.css'
import './editprofileDriver.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function EditprofileDriver() {
  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState("");
  const [username, setUsername] = useState('');
  const [carData, setCarData] = useState({});
  const [personalFormValues, setPersonalFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    dob: "",
    gender:  ""
  });

  const [carFormValues, setCarFormValues] = useState({
    carLicensePlate: "",
    carColor: "",
    carModel: ""
  })

  const [driverFormValues, setDriverFormValues] = useState({
    driversLicense: "",
    ssn: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then( user => {
      console.log(user)
      setUsername(user.username)
      user.getSession((err, session) => {
        if(err) {
          throw new Error(err);
        }
        console.log(session);
        const sessionToken = session.getIdToken().jwtToken;
        setUserToken(sessionToken)
        // https://technology.customink.com/blog/2019/08/16/authorization-with-api-gateway-and-congito/
        axios
        .get('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/user/' + user.username, {
          headers: {
            "Authorization": sessionToken
          }
        })
        .then((res) => {
            console.log(res);
            if(res.data.length > 0) {
              user = res.data[0]
              console.log("user is", user)
              setUserData(user);
              setPersonalFormValues({
                firstName: user.first_name != null ? user.first_name : "",
                lastName: user.last_name != null ? user.last_name : "",
                email: user.email != null ? user.email : "",
                address: user.street_name_and_number != null ? user.street_name_and_number : "",
                city: user.city != null ? user.city : "",
                country: user.country != null ? user.country : "",
                zip: user.zip_code != null ? user.zip_code : "",
                dob: user.dob != null ? user.dob : "",
                gender: user.gender != null ? user.gender : "",
              });
            }
        })
        .catch((err) => {
            console.error('Error:', err);
        });

        axios
        .get('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/driver/car', {
          headers: {
            "Authorization": sessionToken
          }
        })
        .then((res) => {
          const car = res.data
          console.log("car is", car)
          setCarFormValues({
            carLicensePlate: car.car_license_no != null ? car.car_license_no : "",
            carColor: car.car_color != null ? car.car_color : "",
            carModel: car.car_model != null ? car.car_model : ""
          });

        })


        axios
        .get('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/driver', {
          headers: {
            "Authorization": sessionToken
          }
        })
        .then((res) => {
          const driver = res.data
          console.log("driver is", driver)

          setDriverFormValues({
            driversLicense: driver.dln != null ? driver.dln : "",
            ssn: driver.ssn != null ? driver.ssn : "",
          });

        })

      })
    })
  }, []);
    

    function handleInputChangePersonal(event) {
      const { name, value } = event.target;
      setPersonalFormValues({ ...personalFormValues, [name]: value });
    }

    function handleInputChangeCar(event) {
      const { name, value } = event.target;
      setCarFormValues({ ...carFormValues, [name]: value });
    }

    function handleInputChangeDriver(event) {
      const { name, value } = event.target;
      setDriverFormValues({ ...driverFormValues, [name]: value });
    }


    function handleSubmit(event) {
      event.preventDefault();
      setIsSubmitting(true);
      const personalValues = { ...personalFormValues };
      delete personalValues.email;
    
      console.log("handlesubmit", personalValues);
    
      const updatePersonal = axios.put(
        "https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/user/" + username,
        personalValues,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
    
      const updateDriver = axios.post(
        "https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/driver/",
        { ...driverFormValues },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
    
      const updateCar = axios.put(
        "https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/driver/car",
        { ...carFormValues },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
    
      Promise.all([updatePersonal, updateDriver, updateCar])
        .then((responses) => {
          const failedRequests = responses.filter(
            (response) => response.status !== 200
          );
          if (failedRequests.length === 0) {
            setSubmitSuccess(true);
            window.location.href = "/profileDriver";
          } else {
            throw new Error("Failed to update user information");
          }
        })
        .catch((error) => {
          setSubmitError(error.message);
          alert(
            "Error saving user information. Please make sure you entered everything correctly and try again"
          );
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    
      return false;
    }
    


  
    return (
      <div>
        <HeaderDriver />
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" value={personalFormValues.firstName} onChange={handleInputChangePersonal} required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" value={personalFormValues.lastName} onChange={handleInputChangePersonal} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={personalFormValues.email} disabled="disabled" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" value={personalFormValues.address} onChange={handleInputChangePersonal} required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" name="city" value={personalFormValues.city} onChange={handleInputChangePersonal} required />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input type="text" id="country" name="country" value={personalFormValues.country} onChange={handleInputChangePersonal} required />
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip:</label>
              <input type="text" id="zip" name="zip" value={personalFormValues.zip} onChange={handleInputChangePersonal} required />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" name="dob" value={personalFormValues.dob} onChange={handleInputChangePersonal} required />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select id="gender" name="gender" value={personalFormValues.gender} onChange={handleInputChangePersonal} required>
                <option value="">-- Please select --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
            </div>
            <div className="form-group">
              <label htmlFor="driversLicense">Drivers license number:</label>
              <input type="text" id="driversLicense" name="driversLicense" value={driverFormValues.driversLicense} onChange={handleInputChangeDriver} required />
            </div>
            <div className="form-group">
              <label htmlFor="ssn">SSN:</label>
              <input type="text" id="ssn" name="ssn" value={driverFormValues.ssn} onChange={handleInputChangeDriver} required />
            </div>
            <div className="form-group">
              <label htmlFor="carLicensePlate">Car license plate:</label>
              <input type="text" id="carLicensePlate" name="carLicensePlate" value={carFormValues.carLicensePlate} onChange={handleInputChangeCar} required />
            </div>
            <div className="form-group">
              <label htmlFor="carColor">Car color:</label>
              <input type="text" id="carColor" name="carColor" value={carFormValues.carColor} onChange={handleInputChangeCar} required />
            </div>
            <div className="form-group">
              <label htmlFor="carModel">Car model:</label>
              <input type="text" id="carModel" name="carModel" value={carFormValues.carModel} onChange={handleInputChangeCar} required />
            </div>

            <div>
            <Link to="/profileDriver">
                <button>Back</button>
            </Link>
            <Link to="/profileDriver">
                <button type="submit" onClick={handleSubmit}>Save</button>
            </Link>
            </div>
        </form>
        </div>
    </div>
    );
  }
  
  export default EditprofileDriver;
  
