import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, CardBody, Col, Container, Form, FormGroup, Row,} from "reactstrap";
import Base from "./Base";
import {Alert, InputAdornment, TextField} from "@mui/material";
import {doLogin, loginUser} from "../service/userservice";
import IconButton from "@mui/material/IconButton";
import Iconify from "./Iconify";
import LoadingButton from "@mui/lab/LoadingButton";
import "../style/Login.css";
import {toast} from "react-toastify";

export const LoginPage = () => {
    const navigate = useNavigate();
    const config = {autoClose: 3000, position: 'top-center'};
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        window.scroll(0, 0);
    }, []);


    const [loginDetail, setlLoginDetail] = useState({
        username: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event, field) => {
        let actualValue = event.target.value;
        setlLoginDetail({
            ...loginDetail,
            [field]: actualValue,
        });
    };
    const resetData = () => {
        setlLoginDetail({
            username: "",
            password: "",
        });
    };

    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // validation
        if (
            loginDetail.username.trim() === "" ||
            loginDetail.password.trim() === ""
        ) {
            toast.error("Username and password is required", config);
            setIsLogin(true);
            setTimeout(() => {
                setIsLogin(false);
            }, 4000);
            return;
        }

        // call the server api for sending data
        loginUser(loginDetail)
            .then((data) => {
                // console.log(data);
                // save the data to local storage
                doLogin(data, () => {
                    // console.log("Login details is saved to local storage");
                });
                // toast message
                toast.success("Login successful", config);
                // redirect to dashboard
                navigate("/");
            })
            .catch((error) => {
                // console.log(error?.response?.data);
                setLoginError(true);
                setTimeout(() => {
                    setLoginError(false);
                }, 4000);
                // toast.error(error, config);
            });
    };

    return (
        <Base>
            <Container>
                <Row
                    className="d-flex justify-content-center"
                    style={{paddingTop: "60px"}}
                >
                    <Col xl={4} lg={4} md={7} sm={10} xs={12}>
                        {loginError &&
                            <Alert style={{marginBottom: '20px'}}
                                   severity="error"
                                   sx={{transition: 'opacity 0.5s', opacity: 1}}
                            >
                                Invalid username and password
                            </Alert>
                        }
                        {isLogin &&
                            <Alert style={{marginBottom: '20px'}}
                                   severity="error"
                                   sx={{transition: 'opacity 0.5s', opacity: 1}}
                            >
                                Username and password is required!
                            </Alert>
                        }
                        <Card
                            className="rounded-3"
                            style={{
                                padding: '10px',
                                border: "1px solid lightgrey",
                            }}
                        >
                            <i id="Icon" className="bi bi-person-lock ms-3 mt-3"></i>
                            <h3 className="m-auto mb-3">Login</h3>
                            <CardBody>
                                {/* creating form */}
                                <Form onSubmit={handleFormSubmit} style={{textAlign: "left"}}>
                                    {/* email field */}
                                    <FormGroup className="input-contain mb-4">
                                        <TextField
                                            fullWidth
                                            name="email" label="Username / Email"
                                            onChange={(e) => handleChange(e, "username")}
                                            value={loginDetail.username}/>
                                    </FormGroup>

                                    {/* password field */}
                                    <FormGroup className="input-contain mb-4">
                                        <TextField
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            onChange={(e) => handleChange(e, "password")}
                                            value={loginDetail.password}
                                            type={showPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setShowPassword(!showPassword)}
                                                                    edge="end">
                                                            <Iconify
                                                                icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </FormGroup>

                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        // onClick={handleClick}
                                    >
                                        Login
                                    </LoadingButton>

                                    {/*<Container className="text-center">*/}
                                    {/*    <div className="mt-5 d-block justify-content-center">*/}
                                    {/*        <Button variant="contained" type="submit" color="primary" id="submit">*/}
                                    {/*            Login*/}
                                    {/*        </Button>*/}
                                    {/*        <Button*/}
                                    {/*            variant="outlined"*/}
                                    {/*            className="ms-2"*/}
                                    {/*            id="reset"*/}
                                    {/*            onClick={resetData}*/}
                                    {/*        >*/}
                                    {/*            Reset*/}
                                    {/*        </Button>*/}
                                    {/*    </div>*/}
                                    {/*</Container>*/}
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            {/*<p>{useContext1}</p>*/}

            {/*<ValidationTextFields/>*/}
        </Base>
    );
};


{/*<Input*/
}
{/*  type={showPassword ? "text" : "password"}*/
}
{/*  */
}
{/*></Input>*/
}
{/*<Link*/
}
{/*  className="login-eye"*/
}
{/*  type="button"*/
}
{/*  onClick={togglePasswordVisibility}*/
}
{/*>*/
}
{/*  {showPassword ? (*/
}
{/*    <i className="bi bi-eye"></i>*/
}
{/*  ) : (*/
}
{/*    <i className="bi bi-eye-slash"></i>*/
}
{/*  )}*/
}
{/*</Link>*/
}