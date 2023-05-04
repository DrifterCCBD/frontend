import React, { useState } from 'react';
import Header from './header';


const DriverInfo = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [driversLicense, setDriversLicense] = useState('');
  const [carLicensePlate, setCarLicensePlate] = useState('');
  const [carColor, setCarColor] = useState('');
  const [carModel, setCarModel] = useState('');
  const [ssn, setSsn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      address,
      dateOfBirth,
      driversLicense,
      carLicensePlate,
      carColor,
      carModel,
      ssn,
    });
  };

  return (
    <div>
    <Header></Header>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: 'auto', marginTop: '5rem', width: '50%' }}>
    <label>
        Driver's License Number:
        <input type="text" value={driversLicense} onChange={(e) => setDriversLicense(e.target.value)} />
        </label>
        <label>
        Car License Plate:
        <input type="text" value={carLicensePlate} onChange={(e) => setCarLicensePlate(e.target.value)} />
        </label>
        <label>
        Car Color:
        <input type="text" value={carColor} onChange={(e) => setCarColor(e.target.value)} />
        </label>
        <label>
        Car Model:
        <input type="text" value={carModel} onChange={(e) => setCarModel(e.target.value)} />
        </label>
        <label>
        SSN:
        <input type="text" value={ssn} onChange={(e) => setSsn(e.target.value)} />
        </label>
    </form>
    </div>
  );
};

export default DriverInfo;



