import Joi from "joi-browser";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterComponent from "../../component/auth/RegisterComponent";
function RegisterPage() {
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [isLoading, setLoading] = useState(false);

  const schema = {
    firstName: Joi.string().min(3).max(20).required().label("First Name"),

    lastName: Joi.string().min(3).max(20).required().label("Last Name"),
    mobile: Joi.string().length(10).required().label("Mobile No"),
    email: Joi.string().email().required().label("Email Id"),
    password: Joi.string().min(6).required().label("Password"),
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const result = Joi.validate(registerForm, schema, { abortEarly: true });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = (event) => {
    const { name, value } = event.target;
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };

  const HandelOnChange = (e) => {
    const errors1 = { ...errors };
    const errorMessage = validateProperty(e);
    if (errorMessage) errors1[e.target.name] = errorMessage;
    else delete errors1[e.target.name];
    const p = { ...registerForm };
    p[e.target.name] = e.target.value;
    setRegisterForm(p);
    setErrors(errors1);
  };
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  let [message, setMessage] = useState("");
  let [classes, setClasses] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();

    if (errors) {
      setErrors(errors);

      return;
    }
    setLoading(true);
    try {
      console.log("Hi");
      localStorage.setItem(
        "userName",
        registerForm.firstName + " " + registerForm.lastName
      );
      localStorage.setItem("userEmail", registerForm.email);
      localStorage.setItem("userPassword", registerForm.password);
      localStorage.setItem("userMobile", registerForm.mobile);
      setClasses("text-success");
      setShowAlert(true);
      setMessage("Login Successful");
      return navigate("/login");
      setLoading(false);
    } catch (ex) {
      setClasses("text-danger");
      setShowAlert(true);
      setMessage("Invalid Credentials");
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100 d-flex flex-column">
        <div className="row flex-grow-1">
          <div className="col-sm-12 bg-primary p-4">
            <p className="fs-3 text-white text-center mt-5">
              Tired Waiting In Q's?
              <br />
              <small>Schedule Your Visits Everywhere...</small>
            </p>
          </div>
          <div className="col-sm-12 border">
            <RegisterComponent
              registerForm={registerForm}
              HandelOnChange={HandelOnChange}
              onSubmit={onSubmit}
              isLoading={isLoading}
              message={message}
              classes={classes}
              errors={errors}
              validate={validate}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
