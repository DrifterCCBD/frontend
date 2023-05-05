import React, { useState } from 'react';
import Header from './header';
import { Link } from 'react-router-dom';
import './addDriverInfo.css'
import { Auth } from 'aws-amplify';
import axios from 'axios';

const DriverInfo = () => {
  const [driversLicense, setDriversLicense] = useState('');
  const [carLicensePlate, setCarLicensePlate] = useState('');
  const [carColor, setCarColor] = useState('');
  const [carModel, setCarModel] = useState('');
  const [ssn, setSsn] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
  
    Auth.currentAuthenticatedUser()
      .then(auth_user => {
        auth_user.getSession((err, session) => {
          if (err) {
            throw new Error(err);
          }
          const username = auth_user.username;
          const sessionToken = session.getIdToken().jwtToken;
          const carsubmitValues = {carLicensePlate: carLicensePlate, carColor: carColor, carModel: carModel};
          const driverSubmitValues = {driversLicense: driversLicense, ssn: ssn};
  
          const axiosRequests = [
            axios.post('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/driver/car', carsubmitValues, {
              headers: {
                "Authorization": sessionToken
              }
            }),
            axios.post('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/driver/', driverSubmitValues, {
              headers: {
                "Authorization": sessionToken
              }
            })
          ];
  
          Promise.all(axiosRequests)
            .then(responses => {
              console.log(responses);
              const failedRequests = responses.filter(response => !response.ok);
              if (failedRequests.length > 0) {
                throw new Error('Failed to add driver or car information');
              }

              window.location.href = '/mytripsDriver';
            })
            .catch(error => {
              alert("Failed to add driver or car information. Make sure your Driver's license number is 8 digits and SSN is 9 numbers");
              console.log(error.message);
            });
        });
      });
  };
  


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     Auth.currentAuthenticatedUser()
//     .then( auth_user => {
//       auth_user.getSession((err, session) => {
//         if (err) {
//           throw new Error(err);
//         }
//         const username = auth_user.username
//         const sessionToken = session.getIdToken().jwtToken;
//         const carsubmitValues = {carLicensePlate: carLicensePlate, carColor: carColor, carModel: carModel}
//         const driverSubmitValues = {driversLicense: driversLicense, ssn: ssn}
        
//         axios.post('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/driver/car', carsubmitValues, {
//             headers: {
//             "Authorization": sessionToken
//             }
//         })
//           .then(response => {
//             console.log(response)
//             // TODO: fix so that it definately only picks up errors
//             if (response['data'] !== 'success') {
//               throw new Error('Failed to add car information');
//             }
//           })
//           .catch(error => {
//             console.log(error.message);
//             alert("Failed to add car information. Please make sure your data is correct and try again.")
//           })

//         axios.post('https://g6m80dg8k6.execute-api.us-east-1.amazonaws.com/prod/driver/', driverSubmitValues, {
//             headers: {
//                 "Authorization": sessionToken
//                 }
//         })
//         .then(response => {
//             console.log(response)
//             if (response['data'] !== 'success') {
//                 throw new Error('Failed to add driver information');
//               }
//         })
//         .catch(error => {
//             alert("Failed to add driver information. Make sure your Driver's license number is 8 digits and SSN is 9 numbers")
//             console.log(error.message);
//         })

//         })

//       })

//       // TODO: call background check api
     
//       // TODO: figure out where this should be
//      // window.location.href = '/mytripsDriver';

//   };

  return (
    <div>
    <Header></Header>

    <form onSubmit={handleSubmit}>
    <h2>Please add this info for security reasons</h2>
    <p>You will go through a background check before you're allowed to offer rides to passengers</p>
        
        <label>
        Driver's License Number:
        <input type="text" value={driversLicense} onChange={(e) => setDriversLicense(e.target.value)} required/>
        </label>
        <label>
        Car License Plate:
        <input type="text" value={carLicensePlate} onChange={(e) => setCarLicensePlate(e.target.value)} required/>
        </label>
        <label>
        Car Color:
        <input type="text" value={carColor} onChange={(e) => setCarColor(e.target.value)} required/>
        </label>
        <label>
        Car Model:
        <input type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)} required/>
        </label>
        <label>
        SSN:
        <input type="text" value={ssn} onChange={(e) => setSsn(e.target.value)} required/>
        </label>

        <div>
        <Link to="/">
          <button>Back</button>
        </Link>
        <button type="submit">Save</button>
      </div>
    </form>
    </div>
  );
};

export default DriverInfo;



