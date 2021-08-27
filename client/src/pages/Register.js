import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import { CredentalsContext } from '../App';
import { handleErrors } from './Login';

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useContext(CredentalsContext)

  const register = (e) => {
    e.preventDefault()
    fetch(`http://localhost:4000/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    })
    .then(handleErrors)
    .then(() => {
      setCredentials({
        username,
        password
      })
      history.push('/')
    })
    .catch((err) => {
      setError(err.message)
    })
  }

  const history = useHistory()

  return (
    <div>
      <h1>Register</h1>
      {error && (<span style={{color: "red"}}>{error}</span>)}
      <form>
        <input onChange={(e) => setUsername(e.target.value)} placeholder="username" />
        <br />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        <br />

        <button type="submit" onClick={register}>Register</button>
      </form>
    </div>
  )
}
