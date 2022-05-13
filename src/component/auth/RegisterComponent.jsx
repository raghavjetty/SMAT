import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { Asterisk } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
function RegisterComponent({
  registerForm,
  HandelOnChange,
  onSubmit,
  buttonAnim,
  isLoading,
  message,
  classes,
  errors,
  disableButton,
  validate,
}) {
  return (
    <Row>
      <Form className="" method="POST" onSubmit={onSubmit}>
        <Card body className="border-0">
          <div className="mb-1">
            <p className="fs-2 text-left text-dark"> Register </p>
            <small className="text-left mb-2">
              Some Tagline Will Go Up Here !
            </small>
            <small>
              Some More About Our App Description Some More About Our App
            </small>
            <p className={classes}>{message}</p>
          </div>
          <hr className="bg-dark" />

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>
                <small>First Name</small>
              </Form.Label>
              <InputGroup className="" size="sm">
                <FormControl
                  type="text"
                  onChange={HandelOnChange}
                  value={registerForm.firstName}
                  name="firstName"
                  className="border-1"
                />

                {errors.firstName && (
                  <InputGroup.Text
                    id="basic-addon1"
                    className="bg-white text-danger border-1"
                  >
                    <Asterisk width={8} height={8} />
                  </InputGroup.Text>
                )}
              </InputGroup>
              {errors.firstName && (
                <p className=" text-danger p-0 smallAlert">
                  {errors.firstName}
                </p>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                <small>Last Name</small>
              </Form.Label>
              <InputGroup className="" size="sm">
                <FormControl
                  type="text"
                  onChange={HandelOnChange}
                  value={registerForm.lastName}
                  name="lastName"
                  className="border-1"
                />

                {errors.firstName && (
                  <InputGroup.Text
                    id="basic-addon1"
                    className="bg-white text-danger border-1"
                  >
                    <Asterisk width={8} height={8} />
                  </InputGroup.Text>
                )}
              </InputGroup>
              {errors.lastName && (
                <p className=" text-danger p-0 smallAlert">{errors.lastName}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>
                <small>Enter Mobile Number</small>
              </Form.Label>
              <InputGroup className="" size="sm">
                <FormControl
                  type="text"
                  onChange={HandelOnChange}
                  value={registerForm.mobile}
                  name="mobile"
                  className="border-1"
                />

                {errors.mobile && (
                  <InputGroup.Text
                    id="basic-addon1"
                    className="bg-white text-danger border-1"
                  >
                    <Asterisk width={8} height={8} />
                  </InputGroup.Text>
                )}
              </InputGroup>
              {errors.mobile && (
                <p className=" text-danger p-0 smallAlert">{errors.mobile}</p>
              )}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                <small>Enter Email</small>
              </Form.Label>
              <InputGroup className="" size="sm">
                <FormControl
                  type="email"
                  onChange={HandelOnChange}
                  value={registerForm.email}
                  name="email"
                  className="border-1"
                />

                {errors.email && (
                  <InputGroup.Text
                    id="basic-addon1"
                    className="bg-white text-danger border-1"
                  >
                    <Asterisk width={8} height={8} />
                  </InputGroup.Text>
                )}
              </InputGroup>
              {errors.email && (
                <p className=" text-danger p-0 smallAlert">{errors.email}</p>
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>
                <small>Your Password</small>
              </Form.Label>
              <InputGroup className="" size="sm">
                <FormControl
                  type="password"
                  onChange={HandelOnChange}
                  value={registerForm.password}
                  name="password"
                  className="border-1"
                />

                {errors.password && (
                  <InputGroup.Text
                    id="basic-addon1"
                    className="bg-white text-danger border-1"
                  >
                    <Asterisk width={8} height={8} />
                  </InputGroup.Text>
                )}
              </InputGroup>
              {errors.password && (
                <p className=" text-danger p-0 smallAlert">{errors.password}</p>
              )}
            </Form.Group>
          </Row>

          <div className="d-grid gap-2 mt-5 mb-5">
            <Button
              variant="primary"
              type="submit"
              size="sm"
              // disabled={validate()}
            >
              {isLoading ? (
                <>
                  <Spinner
                    animation="border"
                    className="mx-2 mb-5"
                    role="status"
                    size="sm"
                  ></Spinner>
                  loading..
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>

          <div className="text-left text-decoration">
            <small>Already have an account ?</small>
            <Link to="/login">
              <Button size="sm" variant="link">
                Login
              </Button>
            </Link>
          </div>
        </Card>
      </Form>
    </Row>
  );
}

export default RegisterComponent;
