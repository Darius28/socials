import React, { useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

export default function Signup() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const email = emailRef.current.value;
      const name = nameRef.current.value;
      const password = passwordRef.current.value;
      const cpassword = cpasswordRef.current.value;
      const { data } = await axios.post("/api/signup", {
        name,
        email,
        password,
        cpassword,
      });
      toast.success("Signup successful. Login to proceed");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Sign Up to Socials</h1>
      <form onSubmit={signupHandler}>
        <div className="row">
          <div className="mb-3 col-sm-12 col-md-6">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              className="form-control"
              ref={nameRef}
            />
          </div>

          <div className="mb-3 col-sm-12 col-md-6">
            <label>Email: </label>
            <input
              type="email"
              name="email"
              className="form-control"
              ref={emailRef}
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-sm-12 col-md-6 ">
            <label>Password: </label>
            <input
              type="password"
              name="passowrd"
              className="form-control"
              ref={passwordRef}
            />
          </div>

          <div className="mb-3 col-sm-12 col-md-6">
            <label>Confirm Password: </label>
            <input
              type="password"
              name="cpassword"
              className="form-control"
              ref={cpasswordRef}
            />
          </div>
        </div>
        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
      <div className="text-center">
        <p>
          Already a registered user? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
