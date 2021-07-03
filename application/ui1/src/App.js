import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import { useRef } from 'react';

function App() {
  const serverIP = "127.0.0.1";
  const [groupInfo, setGroupInfo] = useState();
  const [predictData, setPredictData] = useState();
  const sdInputRef = useRef();
  const descriptionInputRef = useRef();

  function GetDataHandler() {
    console.log('API call for basic info data!');
    // making an http call using fetch
    fetch('http://' + serverIP + ':8080/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setGroupInfo(data);
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

    console.log("POST call metadata: " + JSON.stringify(meetupData));

    fetch('http://' + serverIP + ':8080/predict', {
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
        setPredictData(data);
      });

  }

  return (
    <Container>
      <div className="App">
        <h1>Automatic Ticket Assignment project</h1>
        <p>Click below to get the Group Info</p>
        <button className="btn btn-primary" onClick={GetDataHandler}>
          Group Info
        </button>
        <div className="temp-div"></div>
        <div className="temp-div"></div>
        <div className="temp-div"></div>
        <div className="temp-div"></div>
        <div className="temp-div"></div>
        <div className="temp-div"></div>
        <div className="temp-div"></div>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="shortDesc">Short Description</label>
            <input  className="form-control" type="text" placeholder="Enter Short Description" ref={sdInputRef}/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" id="description" rows="3" ref={descriptionInputRef}></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Predict</button>
        </form>

        <div className="temp-div"></div>
        {groupInfo == undefined ? (
          <p>Group Info: No Group Info available!</p>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Project</th>
                <th>Mentor</th>
                <th>Group</th>
                <th>Memebers</th>
              </tr>
              <tr>
                <td>{groupInfo.project}</td>
                <td>{groupInfo.mentor}</td>
                <td>{groupInfo.group}</td>
                <td>
                  {
                    groupInfo.members.map((i) => (
                      <p key={i}>{i}</p>
                    ))
                  }
                </td>
              </tr>
            </thead>
          </table>
        )}

        <div className="temp-div"></div>

        <div className="temp-div"></div>
        {predictData == undefined ? (
          <p>Predicted Info: No Predict Data available, please use form fields to enter input and get the prediction.</p>
        ) : (
          <table style={{ width: "40%" }}>
            <thead>
              <tr>
                <th>Short Description</th>
                <th>Description</th>
                <th>Combined Descriptions</th>
                <th>Model Summary</th>
                <th>Predicted Class</th>
              </tr>
              <tr>
                <td>{predictData.short_desc}</td>
                <td>{predictData.desc}</td>
                <td>{predictData.combined_desc}</td>
                <td> {predictData.model_summary}</td>
                <td> {predictData.predicted_class}</td>
              </tr>
            </thead>
          </table>
        )}

        <p className="love">Made in ❤️ with GreatLearning</p>
      </div>

    </Container>
  );
}

export default App;
