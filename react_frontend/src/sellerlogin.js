import { ContactSupportOutlined, LaptopWindows } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from 'react-router-dom'
import './sellerlogin.css'
import axios from "axios";

// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const Sellerlogin = () => {

  const history = useHistory();

  const [style, setStyle] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [username, setUsername] = useState('')

  // const hashpwd = (pwd) => {
  //   bcrypt.hash(pwd, saltRounds, function(err, hash) {
  //     console.log('hash: ' + hash)
  //   });
  // }

  // const comparepwd = (pwd, hash) => {
  //   bcrypt.compare(pwd, hash, function(err, result) {
  //     console.log('result: ' + result)
  // });
  // }

  const signupprocess = (data) => {

    if (data.status == 201){
      setStyle('')
      console.log('yay! Signup successful')

      // localStorage.setItem("det", "data.data");

      return true
    
    } else if (data.status == 226) {
      alert('Nope! Try some other value')
      return false
    } else {
      alert('Error occured! Try again')
      console.log('something else')
    }
  
  }

  const signinprocess = (data, hist) => {

    if (data.status == 201){
      setStyle('')
      console.log('Yay! Login successfull')
      console.log(data.data.Data)

      localStorage.setItem("gid", [data.data.Data.id, data.data.Data.name, data.data.Data.email, data.data.Data.password, data.data.Data.profilephoto, data.data.Data.desc]);
      
      window.location.reload()
      
      return true



    } else if (data.status == 226) {
      alert('These credentials are false! Are you a hacker?')
      return false
    } else {
      alert('Error occured! Try again')
      console.log('something else')
    }
  
  }

  const Login = (e) => {
    e.preventDefault();

    console.log(email)
    console.log(password)

    if (!(password == '' && email == '')) {

      console.log('login true')

      axios.post('/api/sellers/login/', {

        // name : username,
        email: email,
        password: password,
        condition: 'signin'

      })
      .then((res) => signinprocess(res, history))
      .catch((err) => console.log(err));

    } else {

      alert('Not matching passwords')
      setEmail('')
      setPassword('')

    }

  }

  const Signup = (e) => {

    e.preventDefault();

    console.log(username)
    console.log(email)
    console.log(password)
    console.log(password2)

    if ((!(username === '')) && (!(email === '')) && (!(password === '')) && (!(password2 === ''))) {

      if (password === password2) {

        console.log('sigining up')

        axios
          .post("/api/sellers/signup/", {

            name : username,
            email: email,
            password: password,
            condition: 'signup'
          
          })
          .then((res) => signupprocess(res))
          .catch((err) => console.log(err));

      } else {
        alert('Not matching passwords')
        setPassword('')
        setPassword2('')
      }

    } else {
      alert('Fill out the page!')
    }

  }

  useEffect(() => {
    
    // hashpwd(1)
    //comparepwd(1)
    //comparepwd(2)

  }, [])

  return (
    <div id="container" className={style}>
      <div class="frms-container">
        <div class="signin-signup">
          <frm action="" class="sign-in-frm">
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user" aria-hidden='true'></i>
              <input id='loginemail' type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock" aria-hidden='true'></i>
              <input id='loginpwd' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Router>
              <Link to="/chat">
                <input type="submit" value="Login" class="butn solid" onClick={Login} />
              </Link>
            </Router>
          </frm>
          <frm action="" class="sign-up-frm">
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user" aria-hidden='true'></i>
              <input id='inputuser' type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope" aria-hidden='true'></i>
              <input id='inputemail' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock" aria-hidden='true'></i>
              <input id='inputpassword' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock" aria-hidden='true'></i>
              <input id='inputpassword2' type="password" placeholder="Confirm Password" value={password2} onChange={e => setPassword2(e.target.value)} />
            </div>
            <input type="submit" class="butn" value="Sign up" onClick={Signup} />
          </frm>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <button class="butn transparent" id="sign-up-butn" onClick={() => {
              setStyle('sign-up-mode')
            }}>
              Sign up
            </button>
          </div>
          {/* <img src="_1.png" class="image" alt="" /> */}
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <button class="butn transparent" id="sign-in-butn" onClick={() => {
              setStyle('')
            }}>
              Sign in
            </button>
          </div>
          {/* <img src="_2.png" class="image" alt="" /> */}
        </div>
      </div>
    </div>
  )
}

export default Sellerlogin
