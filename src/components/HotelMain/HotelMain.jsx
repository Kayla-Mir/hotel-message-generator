import { useEffect, useState } from 'react';
// global data imports
import guests from '../../GlobalData/Guests.json';
import companies from '../../GlobalData/Companies.json';
import messages from '../../GlobalData/Messages.json';
import WelcomeMsg from '../WelcomeMsg/WelcomeMsg';
// MUI imports
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, IconButton, Modal, Typography } from '@mui/material';
// MUI icon import
import InfoIcon from '@mui/icons-material/Info';
// MUI styles
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
};

const HotelMain = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentGuest, setCurrentGuest] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const helpMessage = 'Ex: {{timeDay}} {{firstName}}, welcome to {{company}}!';
  const helpText = [
    { title: `{{timeDay}}`, description: `: Displays 'Good Morning', 'Good Evening', 'Good Night' depending on time of day.` },
    { title: `{{firstName}}`, description: `: The first name of selected guest.` },
    { title: `{{lastName}}`, description: `: The last name of selected guest.` },
    { title: `{{roomNumber}}`, description: `: The room number of selected guest.` },
    { title: `{{checkIn}}`, description: `: The check in time for selected guest.` },
    { title: `{{checkOut}}`, description: `: The check out time for selected guest.` },
    { title: `{{company}}`, description: `: The selected hotel.` },
    { title: `{{city}}`, description: `: The city where selected hotel is located.` },
    { title: `{{timezone}}`, description: `: The timezone of the selected hotel.` },
  ]

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

  const handleEditMode = () => {
    setEditMode(true);
  }

  return (
    <Box
      sx={{
        minWidth: 120,
        margin: '5vh'
      }}
    >
      <div
        style={{
          marginBottom: '3vh'
        }}
      >
        <FormControl>
          <InputLabel id="message-select-label">Message Type</InputLabel>
          <Select
            labelId="message-select-label"
            value={currentMessage}
            label="Message Type"
            onChange={handleMessageInput}
            sx={{
              minWidth: 220,
              backgroundColor: 'white'
            }}
          >
            {messages.map((item) => (
              <MenuItem key={item?.id} value={item}>{item.type}</MenuItem>
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
              minWidth: 120,
              backgroundColor: 'white'
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
              minWidth: 120,
              backgroundColor: 'white'
            }}
          >
            {companies.map((item) => (
              <MenuItem key={item.id} value={item}>{item.company}</MenuItem>
            ))}

          </Select>
        </FormControl>
      </div>

      <WelcomeMsg custom={customMessage} message={currentMessage} guest={currentGuest} company={currentCompany} />

      {editMode === true &&
        <div>
          <TextField
            id="custom-message-field"
            multiline
            rows={4}
            value={customMessage}
            onChange={handleCustomMessage}
            sx={{
              minWidth: '40vw',
              marginTop: '2vh',
              backgroundColor: 'white'
            }}
          />
          <IconButton
            sx={{
              marginTop: '7vh'
            }}
            onClick={handleOpen}
          >
            <InfoIcon />
          </IconButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-example" variant="h6">
                {helpMessage}
              </Typography>
              <ul>
                {helpText.map((item, i) => (
                  <li key={i}><b style={{ color: 'blue' }}>{item.title}</b>{item.description}</li>
                ))}
              </ul>
            </Box>
          </Modal>
        </div>
      }

    </Box>
  )

}

export default HotelMain;