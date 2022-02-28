// MUI imports
import { Typography, CardContent, Card } from '@mui/material';

const WelcomeMsg = ({ guest, company, message, custom }) => {

  const getTimeOfDayMsg = () => {
    const today = new Date();
    const time = today.getHours();
    if (time < 12) {
      return (
        'Good Morning'
      )
    } else if (time < 19 && time > 11) {
      return (
        'Good Afternoon'
      )
    } else if (time > 19) {
      return (
        'Good Evening'
      )
    } else {
      return (
        'Hello'
      )
    }
  }

  function stringTemplateParser(expression, valueObj) {
    
    if (expression == 'undefined') {
      return 'Please enter your message below.'
    }
    const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
    let text = expression.replace(templateMatcher, (substring, value) => {
      // valueObj is the set of pairs i've defined down below 
        // ex: firstName = guest.firstName
      // value is the {{firstName}} from the expression that will get 
        // replaced with its matching valueObj 
        // ex: {{firstName}} = Richard
      value = valueObj[value];
      return value;
    });
    return text;
  }

  const getCheckInTime = () => {
    const checkInTime = new Date(guest.reservation.startTimestamp * 1000).toLocaleString('en-us');
    return (
      checkInTime
    )
  }

  const getCheckOutTime = () => {
    const checkOutTime = new Date(guest.reservation.endTimestamp * 1000).toLocaleString('en-us');
    return (
      checkOutTime
    )
  }

  return (
    <div>
      <Card
        sx={{
          minHeight: 443,
          minWidth: 275,
          background: `url(/images/blank-invitation.jpeg)`
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20vh 21vh 0vh 21vh'
          }}
        >
          <Typography
            variant='h6'
          >
            {stringTemplateParser(
              custom ?
                custom
                :
                message === '' ? 'Please choose a message type!' : `${message.message}`
              ,
              {
                timeDay: getTimeOfDayMsg(),
                firstName: guest === '' ? '_' : guest.firstName,
                lastName: guest === '' ? '_' : guest.lastName,
                company: company === '' ? '_' : company.company,
                roomNumber: guest === '' ? '_' : guest.reservation.roomNumber,
                checkIn: guest === '' ? '_' : getCheckInTime(),
                checkOut: guest === '' ? '_' : getCheckOutTime(),
                city: company === '' ? '_' : company.city,
                timezone: company = '' ? '_' : company.timezone
              }
            )
            }
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default WelcomeMsg;