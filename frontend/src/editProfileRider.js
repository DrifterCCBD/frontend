import HeaderRider from "./headerRider";
import './headerRider.css'
import './index.css'
import './editprofileRider.css'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';
import axios from 'axios';

function EditprofileRider() {

  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState("");
  const [username, setUsername] = useState('');
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    dob: "",
    gender:  "",
  });
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
              setFormValues({
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
      })      
    })
  }, []);
    

  

  
    function handleInputChange(event) {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      setIsSubmitting(true);
      const submitValues = {...formValues}
      delete submitValues.email
      console.log("handlesubmit", submitValues)
      axios.put('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/user/' + username, submitValues,
      {headers: {
        "Authorization": userToken
      }}
      )
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update user information');
          }
          setSubmitSuccess(true);
        })
        .catch(error => {
          setSubmitError(error.message);
        })
        .finally(() => {
          setIsSubmitting(false);
          window.location.href = '/profileRider';

        });
      return false;
    }
  

    return (
      <div>
        <HeaderRider/>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" name="firstName" value={formValues.firstName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" value={formValues.lastName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formValues.email} disabled="disabled" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address" value={formValues.address} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" name="city" value={formValues.city} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input type="text" id="country" name="country" value={formValues.country} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip:</label>
              <input type="text" id="zip" name="zip" value={formValues.zip} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" name="dob" value={formValues.dob} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select id="gender" name="gender" value={formValues.gender} onChange={handleInputChange} required>
                <option value="">-- Please select --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
            </div>
            <div>
            <Link to="/profileRider">
                <button>Back</button>
            </Link>
            <Link to="/profileRider">
                <button type="submit"onClick={handleSubmit}>Save</button>
            </Link>
            </div>
        </form>
        </div>
    </div>
    );

  }
  
  export default EditprofileRider;
  
