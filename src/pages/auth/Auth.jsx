import React, { useId, useRef, useState } from "react";
import usePostApi from "../../hooks/usePostApi";
import { useNavigate } from "react-router-dom";

function Auth() {
  let [showLogin, setShowLogin] = useState(true);
  let [errorMessage, setErrorMessage] = useState("");
  let firstName = useRef();
  let lastName = useRef();
  let email = useRef();
  let gender = useRef();
  let type = useRef();
  let userId = useRef();
  let phoneNumber = useRef();
  let password = useRef();
  let navigate = useNavigate();

  async function signup() {
    let body = {
      userId: userId.current.value,
      password: password.current.value,
      name: firstName.current.value + " " + lastName.current.value,
      email: email.current.value,
      userType: type.current.value,
    };

    let data = await usePostApi("/crm/api/v1/auth/signup", body);

    if (data.userId) {
      setShowLogin(false);
      setErrorMessage("Success");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    } else {
      setErrorMessage(data.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    }
  }
  async function login() {
    let body = {
      userId: userId.current.value,
      password: password.current.value,
    };
    let data = await usePostApi("/crm/api/v1/auth/signin", body);
    if (data.accessToken) {
      localStorage.setItem("jobToken", data.accessToken);
      localStorage.setItem("jobUserType", data.userTypes);
      localStorage.setItem("jobUserName", data.name);
      navigate(`/${data.userTypes}`);
    } else {
      localStorage.setItem("jobError", data.response.status);
      setErrorMessage(data.response.status);
      navigate("/error");
    }
  }
  return (
    <section className="vh-100 gradient-custom bg-primary">
      <div className="container py-2 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div
              className="card shadow-2-strong card-registration"
              style={{ borderRadius: "15px;" }}
            >
              <div className="card-body p-4 p-md-5">
                <h2 className="mb-4 pb-1 pb-md-0 mb-md-5">Signup</h2>
                <form>
                  {showLogin && (
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="firstName"
                            ref={firstName}
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" for="firstName">
                            First Name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="lastName"
                            className="form-control form-control-lg"
                            ref={lastName}
                          />
                          <label className="form-label" for="lastName">
                            Last Name
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row">
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                      <div className="form-outline datepicker w-100">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="birthdayDate"
                          ref={userId}
                        />
                        <label for="birthdayDate" className="form-label">
                          UserId
                        </label>
                      </div>
                    </div>
                    {showLogin && (
                      <div className="col-md-6 mb-4">
                        <h6 className="mb-2 pb-1">Gender: </h6>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            ref={gender}
                            name="inlineRadioOptions"
                            id="femaleGender"
                            value="female"
                          />
                          <label
                            className="form-check-label"
                            for="femaleGender"
                          >
                            Female
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="maleGender"
                            value="male"
                          />
                          <label className="form-check-label" for="maleGender">
                            Male
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="otherGender"
                            value="other"
                          />
                          <label className="form-check-label" for="otherGender">
                            Other
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {showLogin && (
                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="email"
                            id="emailAddress"
                            className="form-control form-control-lg"
                            required
                            ref={email}
                          />
                          <label className="form-label" for="emailAddress">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="tel"
                            id="phoneNumber"
                            required
                            className="form-control form-control-lg"
                            ref={phoneNumber}
                          />
                          <label className="form-label" for="phoneNumber">
                            Phone Number
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row">
                    <div className={` ${showLogin ? "col-12" : "w-50"} `}>
                      <div className="form-outline">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          required
                          ref={password}
                        />
                        <label className="form-label" for="password">
                          Password
                        </label>
                      </div>
                      {showLogin && (
                        <select
                          className="select form-control-lg"
                          ref={type}
                          defaultValue={"CUSTOMER"}
                        >
                          <option key={"1"} value="1" disabled>
                            Choose option
                          </option>
                          <option key={"2"} value="CUSTOMER">
                            CUSTOMER
                          </option>
                          <option key={"3"} value="ENGINEER">
                            ENGINEER
                          </option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 pt-2">
                    <input
                      className="btn btn-primary btn-lg"
                      value="Submit"
                      onClick={() => (showLogin ? signup() : login())}
                    />
                  </div>
                  <h5
                    className="text-primary"
                    onClick={() => setShowLogin(!showLogin)}
                  >
                    <ins>Already have an account login?</ins>
                  </h5>
                  <h4
                    className={`text-center ${
                      errorMessage == "Success" ? "text-success" : "text-danger"
                    }`}
                  >
                    {errorMessage}
                  </h4>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Auth;
