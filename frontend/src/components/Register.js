import Base from "./Base";
import React, {useEffect, useState} from "react";
import {Card, CardBody, Col, Container, Form, FormGroup, Row,} from "reactstrap";
import TextField from "@mui/material/TextField";
import {Alert, InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Iconify from "./Iconify";
import {SignUp} from "../service/userservice";
import Button from "@mui/material/Button";

export const Registration = () => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    const [loginDetail, setlLoginDetail] = useState({
        username: "",
        password: "",
    });

    const [signUp, setSignUp] = useState(false);
    const [signUpError, setSignUpError] = useState(false);

    const handleChange = (event, field) => {
        let actualValue = event.target.value;
        setlLoginDetail({
            ...loginDetail,
            [field]: actualValue,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // validation
        if (
            loginDetail.username.trim() === "" ||
            loginDetail.password.trim() === ""
        ) {
            // toast.error("Username and password is required", config);
            alert("hi")
            return;
        }

        // call the server api for sending data
        SignUp(loginDetail)
            .then((data) => {
                console.log(data);
                setSignUp(true);
                setTimeout(() => {
                    setSignUp(false);
                }, 4000);
                // toast message
                // toast.success("Login successful", config);
            })
            .catch((error) => {
                console.log(error.response.data);
                setSignUpError(true);
                setTimeout(() => {
                    setSignUpError(false);
                }, 4000);
                // toast.error(error, config);
            });
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Base>
            <Container>
                <Row
                    className="d-flex justify-content-center"
                    style={{paddingTop: "60px"}}
                >
                    <Col xl={4} lg={5} md={7} sm={10} xs={12}>
                        {signUp &&
                            <Alert style={{marginBottom: '20px'}}
                                   severity="success"
                                   sx={{transition: 'opacity 0.5s', opacity: 1}}
                            >
                                User created successfully!
                            </Alert>}
                        {signUpError &&
                            <Alert style={{marginBottom: '20px'}}
                                   severity="error"
                                   sx={{transition: 'opacity 0.5s', opacity: 1}}
                            >
                                User already exists!
                            </Alert>}
                        <Card
                            className="rounded-3"
                            style={{
                                padding: '10px',
                                border: "1px solid lightgrey",
                            }}
                        >
                            <i id="Icon" className="bi bi-person-lock ms-3 mt-3"></i>
                            <h3 className="m-auto mb-3">SignUp</h3>
                            <CardBody>
                                {/* creating form */}
                                <Form onSubmit={handleFormSubmit} style={{textAlign: "left"}}>
                                    {/* email field */}
                                    <FormGroup className="input-contain mb-4">
                                        <TextField fullWidth name="email" label="Username / Email address"
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

                                    <Button
                                        fullWidth
                                        size="large" type="submit" variant="contained">
                                        SignUp
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};
