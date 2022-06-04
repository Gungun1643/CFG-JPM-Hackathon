import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { auth } from '../../firebase-config'
import { useNavigate } from 'react-router-dom'

import { signInWithEmailAndPassword } from 'firebase/auth'

import './Login.css'

const Login = () => {

  const [isValid, setIsValid] = useState(false)
  const navigate = useNavigate()

  useEffect(
    () => {
      if(localStorage.getItem("isAuth")){
        navigate("/")
      }
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userLogin = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
    .then(
      () => {
        localStorage.setItem("isAuth", true)
        setIsValid(true)
        navigate('/')
      }
    )
    .catch(
      (err) => {
        console.log(err.message)
        setIsValid(false)
      }
    )
  }

  const onFormSubmit = (loginData) => {
    console.log(loginData)
    userLogin(loginData)
  }

  return (
    <Container fluid>
      <h3 className="text-center m-4">Login</h3>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="login-form-width bg-light mx-auto border border-dark rounded p-3"
      >

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <div className="d-flex align-items-center gap-2">
              <div>
              </div>
              <div>Email</div>
            </div>
          </label>

          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", { required: true })}
          />
          {errors.username?.type === "required" && (
            <p className="text-danger">*Enter your username</p>
          )}
        </div>

        <div className="mb-3">
          
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <div className="d-flex align-items-center gap-2">
              <div>
              </div>
              <div>Password</div>
            </div>
          </label>

          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className="text-danger">*Enter your password</p>
          )}
        </div>

        {/* <div className="mb-4">
          <div>Which user are you?</div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              User
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              NGO
            </label>
          </div>
        </div> */}

        <button className="d-block mx-auto btn btn-primary" type="submit">
          Login
        </button>
      </form>


    </Container>
  )
}

export default Login