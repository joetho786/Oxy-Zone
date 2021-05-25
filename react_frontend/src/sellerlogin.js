import { ContactSupportOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from 'react-router-dom'
import './sellerlogin.css'

const Sellerlogin = () => {
  const [style, setStyle] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [username, setUsername] = useState('')

  const Login = (e) => {
    e.preventDefault();

    console.log(email)
    console.log(password)

    if (!(password == '' && email == '')) {



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
    // document.addEventListener('keydown', function (event) {
    //   if ((event.key === 'Enter') && (!(document.getElementById('name') === ''))) {
    //     // event.preventDefault()
    //     routeChange()
    //   }
    // })
  }, [])

  return (
    <div id="container" className={style}>
      <div class="frms-container">
        <div class="signin-signup">
          <frm action="" class="sign-in-frm">
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user" aria-hidden = 'true'></i>
              <input id='loginemail' type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"  aria-hidden = 'true'></i>
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
              <i class="fas fa-user" aria-hidden = 'true'></i>
              <input id='inputuser' type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope" aria-hidden = 'true'></i>
              <input id='inputemail' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock" aria-hidden = 'true'></i>
              <input id='inputpassword' type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock" aria-hidden = 'true'></i>
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
