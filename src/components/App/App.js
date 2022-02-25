import './App.css';
import guests from '../../GlobalData/Guests.json';
import companies from '../../GlobalData/Companies.json';

console.log(guests);

function App() {
  return (
    <div className="App">
      {guests.map((guest) => {
        return (
          <p>{guest.firstName} {guest.lastName}</p>
        )
      })}
    </div>
  );
}

export default App;
