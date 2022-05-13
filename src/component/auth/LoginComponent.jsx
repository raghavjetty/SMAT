import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { At, Lock, PersonPlus } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

function LoginComponent() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const HandelOnChange = (event) => {
    const p = { ...loginForm };
    p[event.target.name] = event.target.value;
    setLoginForm(p);
    console.log(loginForm);
  };

  const [showAlert, setShowAlert] = useState(false);
  let [message, setMessage] = useState("");
  let [classes, setClasses] = useState("");
  const onHandleSubmit = async (e) => {
    e.preventDefault();

    let userEmail = localStorage.getItem("userEmail");
    let userPassword = localStorage.getItem("userPassword");

    if (userEmail === loginForm.email && userPassword === loginForm.password) {
      setClasses("text-success");
      setShowAlert(true);
      setMessage("Login Successful");
      return navigate("/stores");
    } else {
      setClasses("text-danger");
      setShowAlert(true);
      setMessage("Invalid Credentials");
    }
  };

  // useEffect(() => {
  //   if (successNotification) {
  //     navigate("/sales");
  //   } else if (empsuccessNotification) {
  //     navigate("/empsales");
  //   }
  // }, [onHandleSubmit]);

  return (
    <Row>
      <Form method="POST" onSubmit={onHandleSubmit}>
        <Card body className="border-0">
          <div className="mb-3 text-center">
            <p className="fs-2 text-center text-dark">Hello Again!</p>

            <small className="text-center mb-2">
              Some Tagline Will Go Up Here ! Tagline Will Go Up Here
            </small>
            <br />
            <p className={classes}>{message}</p>
          </div>

          <Row className="">
            <Form.Group className="mb-3">
              <InputGroup className="">
                <FormControl
                  type="text"
                  placeholder="Enter Your Email"
                  onChange={HandelOnChange}
                  className="border-1"
                  value={loginForm.email}
                  name="email"
                />

                <InputGroup.Text
                  id="basic-addon1"
                  className="bg-white text-primary border-1"
                >
                  <At />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <InputGroup className="">
                <FormControl
                  type="text"
                  className="border-1"
                  placeholder="Enter Your Password"
                  onChange={HandelOnChange}
                  value={loginForm.password}
                  name="password"
                />

                <InputGroup.Text
                  id="basic-addon1"
                  className="bg-white text-primary border-1"
                >
                  <Lock />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* <Form.Group className="" controlId="formBasicEmail">
              <Form.Control
                type="email"
                className="form-control-sm my-2"
                placeholder="Enter email"
                onChange={HandelOnChange}
                value={loginForm.email}
                name="email"
              />
            </Form.Group> */}

            {/* <Form.Group className="" controlId="formBasicPassword">
              <Form.Control
                type="password"
                className="form-control-sm my-2"
                placeholder="Password"
                onChange={HandelOnChange}
                value={loginForm.password}
                name="password"
              /> */}
            {/* <Form.Text className="text-muted">{loginForm.password}</Form.Text> */}
            {/* </Form.Group> */}

            <Form.Group className="mb-2 text-center w-100 ">
              <Button variant="primary" className="w-100" type="submit">
                Login
              </Button>
            </Form.Group>

            <div className="text-center text-decoration">
              <Link to="/">
                <Button variant="outline-dark" className="w-100" size="sm">
                  <PersonPlus className="mx-1" /> Create Account
                </Button>
              </Link>
            </div>
          </Row>
        </Card>
      </Form>
    </Row>
  );
}

export default LoginComponent;
