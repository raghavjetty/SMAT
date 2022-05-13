import jwt_decode from "jwt-decode";
import { Image } from "react-bootstrap";
import rocket from "../../assets/login.png";
import LoginComponent from "../../component/auth/LoginComponent";
function LoginPage() {
  return (
    <>
      <>
        <div className="container-fluid min-vh-100 d-flex flex-column">
          <div className="row flex-grow-1">
            <div className="col-md-6 bg-primary p-4">
              <p className="fs-3 text-white text-center mt-5"></p>

              <Image
                className="mt-5 text-center rounded mx-auto d-block"
                src={rocket}
                width="100"
                height="100"
              />
            </div>
            <div className="col-md-6">
              {/* <Image
                className="rounded mx-auto d-block mt-5"
                src={rocket}
                width="100"
              /> */}
              <LoginComponent />
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default LoginPage;
