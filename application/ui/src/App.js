import logo from './logo.svg';
import './App.css';

function App() {

  function GetDataHandler() {
    console.log('inside get datahandler!');
    // making an http call using fetch
    fetch('http://3.7.55.52:8080/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });

    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json));
  }

  return (
     <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen saurav:)</p>
      <button className="btn btn-primary" onClick={GetDataHandler}>
        Get Data
      </button>
    </div>
  );
}

export default App;
