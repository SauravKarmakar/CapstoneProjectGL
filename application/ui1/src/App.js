import './App.css';
import {useState} from 'react';
import { useRef} from 'react';

function App() {
  const [gotData, setGotData] = useState("no info avaliable");
  const [predictData, setPredictData] = useState("no info yet");
  const sdInputRef = useRef();
  const descriptionInputRef = useRef();
  let infodata;

  function GetDataHandler() {
    console.log('API call for basic info data!');
    // making an http call using fetch
    fetch('http://13.233.110.88:8080/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setGotData(JSON.stringify(data));
        infodata = data;
      });

    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json));
  }

  function submitHandler(event) {
    console.log('Submit Handler!');
    event.preventDefault();

    const sdTitle = sdInputRef.current.value;
    const description = descriptionInputRef.current.value;

    const meetupData = {
      short_desc: sdTitle,
      desc: description,
    };

    console.log("POST call metadata: "+ JSON.stringify(meetupData));

    fetch('http://13.233.110.88:8080/predict', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // setData(JSON.stringify(data));
        setPredictData(JSON.stringify(data));
      });

  }

  return (
    <div>
      <h1>Capestone project GL</h1>
      <p>Group 5C Jone 20B</p>
      <button className="btn btn-primary" onClick={GetDataHandler}>
        Group Info
      </button>
      <div className="temp-div"></div>
      <form onSubmit={submitHandler}>
        <div >
          <label htmlFor='title'>Short Description</label>
          <input type='text' required id='title' ref={sdInputRef}/>
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <br/>
        <div>
          <button>Predict</button>
        </div>
      </form>

      <div className="temp-div"></div>
      { gotData == "no info avaliable" ? (
        <code> Group Info : No Info Avaliable!</code>
      ):(
        <code> Group Info : {gotData}</code>
      )}
     
      <div className="temp-div"></div>

      <div className="temp-div"></div>
      <code> Predict Data : {predictData}</code>
    </div>
  );
}

export default App;
