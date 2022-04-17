import './App.css'
import Homepage from "./components/homepage/homepage"
import Login from "./components/login/login"
import Register from "./components/register/register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from 'react';


import axios from 'axios';


function App() {
  const [data,setData] = useState([]);

  useEffect(() => {
    loadUsersData()
  }, []);

  const loadUsersData = async () => {
    return await axios.get("http://localhost:9002/Teacher").then((respond) => setData(respond.data)).catch((err) => console.log(err));

  };
  console.log("data", data);

  const [ user, setLoginUser] = useState({})
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
            }
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
