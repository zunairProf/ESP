import {Card, Col, Form, FormGroup, Input, Row} from "reactstrap";
import Base from "./Base";
import TextField from "@mui/material/TextField";
import {Alert, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {getUserDetail} from "../service/userservice";
import {postRoomData} from "../service/roomsservice";
import {toast} from "react-toastify";

export const AddRoom = () => {

    const [room, setRoom] = useState();
    const [image, setImage] = useState(undefined);
    const [userId, setUserId] = useState();
    const [isRoomAdded, setIsRoomAdded] = useState(false);

    const handleChange = (event, field) => {
        let actualValue = event.target.value;
        // console.log(`${field}: ${actualValue}`);
        // dispatch({type: [field], payload: actualValue});
        setRoom({...room, [field]: actualValue});
    };

    const ACTION = {
        IMAGE: 'imageFile',
        DESCRIPTION: 'description',
        DIMENSION: 'dimensions',
        LOCATION: 'location',
        CONTACT_NO: 'contact_no',
        TOTAL_ROOM: 'total_rooms',
        ADDITIONAL: 'charge_per_unit',
        WIFI: 'wifi_facility',
        WATER: 'water_facility',
        WASHING: 'washing_facility',
        ROOM_TYPE: 'room_type'
    };

    const formData = new FormData();

    // validate image file
    const handleFileInput = (event) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        const file = event?.target?.files[0];
        if (!allowedTypes.includes(file.type)) {
            // show an error message or throw an exception
            // toast.error("Only chose jpeg, jpg and png images.", ToastConfig);

            alert('Only chose jpeg, jpg and png images.')
            return;
        }

        console.log(event.target.files[0]);
        // continue with file processing
        if (event.target && event.target.files[0]) {
            // dispatch({type: ACTION.IMAGE, payload: {imageFile: event.target.files[0]}});
            setImage(file);
        }
    }

    // add room function
    const addRoom = (event) => {
        event.preventDefault();

        // send form data to server
        formData.append('image', image);
        for (const key in room) {
            formData.append(key, room[key]);
        }
        // formData.append('data', JSON.stringify(room));

        postRoomData(formData, userId)
            .then((response) => {
                console.log(response);
                if (response.status === true) {
                    setIsRoomAdded(true);
                    setTimeout(() => {
                        setIsRoomAdded(false);
                    }, 8000);
                }
                window.scroll(0, 0);
            }).catch((error) => {
            console.log(error);
        })
    };

    useEffect(() => {
        setUserId(getUserDetail()?.data?.userId);
    }, []);

    return (
        <Base>
            <Row className="d-flex justify-content-center align-content-center">
                <Col xxl={8} xl={8} lg={8} md={8} sm={10}>
                    <Card className="m-3 p-4" style={{textAlign: 'left'}}>
                        {isRoomAdded &&
                            <Alert style={{marginBottom: '20px'}}
                                   severity="success"
                                   sx={{transition: 'opacity 0.5s', opacity: 1}}
                            >
                                Room added successfully!
                            </Alert>
                        }
                        <h3>Add Room</h3>
                        <Form onSubmit={addRoom}>
                            <FormGroup className="my-3">
                                {/*<Label for="file"></Label>*/}
                                <FormLabel id="demo-radio-buttons-group-label" className="mb-2">
                                    Image File
                                </FormLabel>
                                <Input
                                    // bsSize=""
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={handleFileInput}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    variant="standard"
                                    id="description"
                                    onChange={(e) => handleChange(e, ACTION.DESCRIPTION)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    fullWidth
                                    name="dimensions"
                                    label="Dimesion"
                                    variant="standard"
                                    onChange={(e) => handleChange(e, ACTION.DIMENSION)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    fullWidth
                                    name="location"
                                    label="Location"
                                    variant="standard"
                                    onChange={(e) => handleChange(e, ACTION.LOCATION)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    fullWidth
                                    name="contact_no"
                                    label="Contact No"
                                    variant="standard"
                                    onChange={(e) => handleChange(e, ACTION.CONTACT_NO)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    fullWidth
                                    name="additional_person_charges"
                                    label="Total Rooms"
                                    variant="standard"
                                    onChange={(e) => handleChange(e, ACTION.TOTAL_ROOM)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <TextField
                                    fullWidth
                                    name="additional_person_charges"
                                    label="Additional Person Charges"
                                    variant="standard"
                                    onChange={(e) => handleChange(e, ACTION.ADDITIONAL)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControl style={{textAlign: 'left'}}>
                                    <FormLabel id="demo-radio-buttons-group-label">Wifi</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={(e) => handleChange(e, ACTION.WIFI)}
                                    >
                                        <FormControlLabel value="Yes" control={<Radio/>} label="Yes"/>
                                        <FormControlLabel value="No" control={<Radio/>} label="No"/>
                                    </RadioGroup>
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormControl style={{textAlign: 'left'}}>
                                    <FormLabel id="demo-radio-buttons-group-label">Water Facility</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={(e) => handleChange(e, ACTION.WATER)}
                                    >
                                        <FormControlLabel value="Yes" control={<Radio/>} label="Yes"/>
                                        <FormControlLabel value="No" control={<Radio/>} label="No"/>
                                    </RadioGroup>
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormControl style={{textAlign: 'left'}}>
                                    <FormLabel id="demo-radio-buttons-group-label">Washing Facility</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={(e) => handleChange(e, ACTION.WASHING)}
                                    >
                                        <FormControlLabel value="Yes" control={<Radio/>} label="Yes"/>
                                        <FormControlLabel value="No" control={<Radio/>} label="No"/>
                                    </RadioGroup>
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormControl style={{textAlign: 'left'}}>
                                    <FormLabel id="demo-radio-buttons-group-label">Room Type</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={room}
                                        onChange={(e) => handleChange(e, ACTION.ROOM_TYPE)}
                                    >
                                        <FormControlLabel value="Standard" control={<Radio/>} label="Standard"/>
                                        <FormControlLabel value="Studio" control={<Radio/>} label="Studio"/>
                                    </RadioGroup>
                                </FormControl>
                            </FormGroup>
                            <Button type="submit" variant="contained">Submit</Button>
                            <Button type="reset" className="mx-3" variant="contained">Reset</Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Base>
    )
}