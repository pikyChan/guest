import React, { useState } from "react";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = {};
    for (let elm of event.target.elements) {
      if (elm.type === "email" || elm.type === "password") {
        fData[elm.name] = elm.value;
      }
    }

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("Id", data.id);
        localStorage.setItem("username", data.name);
        localStorage.setItem("isLoggedIn", "true");
        event.target.reset();
        window.location.href = "/admin/dashboard";
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please check your connection.");
    }
  };

  return (
    <div>
      <section
        className="vh-80"
        style={{
          height: "calc(100vh - 150px)",
          borderRadius: "0px",
          margin: "8% 0",
          overflow: "hidden",
        }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 col-md-8 col-sm-10 text-black">
              <div className="d-flex align-items-center h-custom-2 px-5">
                <form onSubmit={handleSubmit} className="w-100 custom-form">
                  <br />
                  <br />
                  <br />
                  <h1
                    className="fw-800 mb-3 text-center"
                    style={{ letterSpacing: "1px" }}
                  >
                    LOGIN
                  </h1>

                  {errorMessage && (
                    <p className="text-danger text-center">{errorMessage}</p>
                  )}
                    <hr />
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Email address"
                      required
                    />
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      required
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>

                  <div className="row">
                    <div className="col-8">
                      <div className="icheck-primary">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember Me</label>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        style={{ height: "40px" }}
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 d-none d-md-block"><br /><br />
              <img
                src="src/assets/download (6).jpg"
                alt="Login image"
                className="img-fluid"
                style={{
                  maxHeight: "calc(100vh - 130px)",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          .custom-form {
            max-width: 500px;
            margin: auto;
          }

          @media (max-width: 768px) {
            .vh-80 {
              height: auto;
              margin: 0;
              padding: 20px;
            }

            .h-custom-2 {
              padding: 10px;
            }

            .form-control-lg {
              font-size: 1rem;
              padding: 12px;
            }

            .btn {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
