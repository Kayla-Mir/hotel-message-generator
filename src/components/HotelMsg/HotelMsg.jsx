import React from 'react';
import { useState } from 'react';
// global data imports
import guests from '../../GlobalData/Guests.json';
import companies from '../../GlobalData/Companies.json';
// MUI imports
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

console.log(guests);

const HotelMsg = () => {
  const [currentGuest, setCurrentGuest] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');

  const handleGuestInput = (e) => {
    setCurrentGuest(e.target.value);
  }

  const handleCompanyInput = (e) => {
    setCurrentCompany(e.target.value);
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="guest-select-label">Guest</InputLabel>
        <Select
          labelId="guest-select-label"
          value={currentGuest}
          label="Guest"
          onChange={handleGuestInput}
          sx={{ 
            minWidth: 120 
          }}
        >
          {guests.map((item) => (
            <MenuItem key={item.id} value={item}>{item.firstName} {item.lastName}</MenuItem>
          ))}
          
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="company-select-label">Company</InputLabel>
        <Select
          labelId="company-select-label"
          value={currentCompany}
          label="Company"
          onChange={handleCompanyInput}
          sx={{ 
            minWidth: 120 
          }}
        >
          {companies.map((item) => (
            <MenuItem key={item.id} value={item}>{item.company}</MenuItem>
          ))}
          
        </Select>
      </FormControl>
      <h1>{currentGuest.firstName} {currentGuest.lastName}</h1>
      <h1>{currentCompany.company}</h1>
    </Box>
  )

}

export default HotelMsg;