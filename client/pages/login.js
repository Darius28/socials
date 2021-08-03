import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth-context";
import { Spin } from "antd";

export default function Login() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { state, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });
      dispatch({
        type: "LOGIN",
        payload: data.user,
      });
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(data);
      toast.success("Welcome.");
      setLoading(false);
      router.replace("/home");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="container">
        <h1 className="text-center my-4">Login to Socials</h1>
        <form onSubmit={loginHandler}>
          <div className="row">
            <div className="mb-3 col-sm-12 col-md-6">
              <label>Email: </label>
              <input
                type="email"
                name="email"
                className="form-control"
                ref={emailRef}
                autoFocus
              />
            </div>

            <div className="mb-3 col-sm-12 col-md-6 ">
              <label>Password: </label>
              <input
                type="password"
                name="passowrd"
                className="form-control"
                ref={passwordRef}
              />
            </div>
          </div>
          <div className="mb-3 text-center">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p>
            New User? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </Spin>
  );
}
