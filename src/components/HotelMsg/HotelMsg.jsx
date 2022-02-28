import { useState } from 'react';
// global data imports
import guests from '../../GlobalData/Guests.json';
import companies from '../../GlobalData/Companies.json';
import messages from '../../GlobalData/Messages.json';
import WelcomeMsg from '../WelcomeMsg/WelcomeMsg';
// MUI imports
import { Box, InputLabel, MenuItem, FormControl, Select, TextField } from '@mui/material';

const HotelMsg = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentGuest, setCurrentGuest] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const handleGuestInput = (e) => {
    setCurrentGuest(e.target.value);
  }

  const handleCompanyInput = (e) => {
    setCurrentCompany(e.target.value);
  }

  const handleMessageInput = (e) => {
    setCurrentMessage(e.target.value);
    setCustomMessage('');
    if (editMode === true) {
      setEditMode(false);
    }
  }

  const handleCustomMessage = (e) => {
    setCustomMessage(e.target.value);
  }

  console.log('customMessage', customMessage);

  const handleEditMode = () => {
    setEditMode(true);
  }

  console.log(editMode);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="message-select-label">Message Type</InputLabel>
        <Select
          labelId="message-select-label"
          value={currentMessage}
          label="Message Type"
          onChange={handleMessageInput}
          sx={{
            minWidth: 120
          }}
        >
          {messages.map((item) => (
            <MenuItem key={item.id} value={item}>{item.type}</MenuItem>
          ))}
          <MenuItem value={'Custom Message'} onClick={() => handleEditMode()}>Custom Message</MenuItem>
        </Select>
      </FormControl>
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

      <WelcomeMsg custom={customMessage} message={currentMessage} guest={currentGuest} company={currentCompany} />

      {editMode === true &&
        <TextField
          id="custom-message-field"
          multiline
          maxRows={4}
          value={customMessage}
          onChange={handleCustomMessage}
        />
      }

    </Box>
  )

}

export default HotelMsg;