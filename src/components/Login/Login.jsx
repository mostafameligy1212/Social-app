import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as zod from "zod";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader, FadeLoader, SyncLoader } from "react-spinners";
import { authContext } from "./../../contextComponent/authContext/AuthContext";
import { Helmet } from "react-helmet";
// import bg from "./src/imags/summer-nightscape-3840x2160-18277.png"

const schema = zod.object({
  email: zod.email(),
  password: zod
    .string()
    .nonempty("password is requird")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password has a small char , a captial char , a number and a spacial char"
    ),
});

export default function Register() {
  // console.log("login");
  
  let navigate = useNavigate();
  let [isLodaing, setIsLoaging] = useState(false);
  let [sucessMessage, setSucessMessage] = useState(null);
  let [erorrMessage, setErorrMessage] = useState(null);
  let { updateToken } = useContext(authContext);

  let { handleSubmit, register, formState, setError, watch, getValues } =
    useForm({
      defaultValues: {
        password: "",
      },
      mode: "onBlur",
      resolver: zodResolver(schema),
    });
  function myHandelSubmit(data) {
    if (erorrMessage) {
      setErorrMessage(null);
    }
    if (sucessMessage) {
      setSucessMessage(null);
    }
    setIsLoaging(true);
    // console.log(data);

    axios
      .post("https://linked-posts.routemisr.com/users/signin", data)
      .then((sucess) => {
        // console.log(sucess.data);
        updateToken(sucess.data.token);
        localStorage.setItem("tok", sucess.data.token);

        setSucessMessage(sucess.data.message);
        setErorrMessage(null);
        setTimeout(() => {
          setSucessMessage(null);
          navigate("/home");
        }, 1500);
      })
      .catch((erorr) => {
        setErorrMessage(erorr.response.data.error);
        setSucessMessage(null);
        setTimeout(() => {
          setErorrMessage(null);
        }, 3000);
      })
      .finally(() => {
        setIsLoaging(false);
      });
  }
  return (

    <>

    <Helmet>
      <title>Login</title>
    </Helmet>

    <div
      className={` min-h-screen flex justify-center items-center   `}
    >
      <div className="w-[90%] mx-auto md:w-1/2 rounded-2xl  py-3 border border-black dark:border-white  shadow-2xl ">
        <h1 className=" text-center text-3xl font-bold text-blue-500 ">
          Login
        </h1>
        <div className="login">
          <h2 className="text-center pt-4 text-2xl font-bold dark:text-white">
            Welcome back
          </h2>
          <form
            onSubmit={handleSubmit(myHandelSubmit)}
            className=" mx-auto px-4"
          >
            {sucessMessage && (
              <div className="w-full py-1 border border-green-500 text-center text-green-500 rounded-lg my-1 text-lg">
                {sucessMessage}
              </div>
            )}
            {erorrMessage && (
              <div className="w-full py-1 border border-red-500 text-center text-red-500 rounded-lg my-1 text-lg">
                {erorrMessage}
              </div>
            )}

            <div className="mb-2">
              <label
                htmlFor="email"
                className="block  text-sm font-medium text-black  dark:text-white"
              >
                Your email
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="placeholder:!text-gray-700 dark:placeholder:!text-white  bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email..."
              />
              {formState.errors.email && formState.touchedFields.email && (
                <p className=" text-red-500 border-2 rounded-md py-1 mt-1 text-center">
                  {formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="password"
                className="block  text-sm font-medium text-black dark:text-white "
              >
                Your password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Password..."
                className=" placeholder:!text-gray-700 dark:placeholder:!text-white  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formState.errors.password &&
                formState.touchedFields.password && (
                  <p className="text-red-500 border-2 rounded-md py-1 mt-1 text-center">
                    {formState.errors.password.message}
                  </p>
                )}
            </div>

            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {" "}
              {isLodaing ? (
                <SyncLoader color="white" size={11} />
              ) : (
                "Submit"
              )}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>

  );
}
