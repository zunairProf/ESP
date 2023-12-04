import styled from "styled-components";
import {Col, Row} from "reactstrap";
import React, {useEffect, useState} from "react";
import {getRoomBookingStatus, getRoomById} from "../service/roomsservice";
import {useNavigate, useParams} from "react-router-dom";
import Base from "./Base";
import Button from "@mui/material/Button";
import {isLoggedIn} from "../service/userservice";
import {Alert} from "@mui/material";
import WifiIcon from '@mui/icons-material/Wifi';
import ShowerIcon from '@mui/icons-material/Shower';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

const DetailComponent = styled.div`
  //max-width: 400px;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 20px;
  //border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RoomImage = styled.img`
  width: 100%;
  //height: 200px;
  border-radius: 18px;
  object-fit: cover;
`;

const RoomDetails = styled.div`
  padding: 16px;
  text-align: left;
`;

const TYPE = styled.h2`
  margin-bottom: 8px;
  color: #8b8b8b;
  font-size: 12px;
`;

const Description = styled.p`
  color: #666;
`;

const Price = styled.div`
  margin-top: 16px;
  font-size: 1.2em;
  color: #3498db;
`;

const BookingStatus = styled.div`
  color: wheat;
  font-family: Calibri;
  font-weight: bold;
  background-color: #0077c8;
  padding: 2px 8px;
  border-radius: 8px;
  width: 80px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MoreDetailComponent = () => {

    const {roomId} = useParams();
    const [roomDetail, setRoomDetail] = useState();
    const [user, setUser] = useState();
    const [roomStatus, setRoomStatus] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        // get single room detail from backend
        console.log(roomId);
        getRoomById(roomId)
            .then(response => {
                console.log(response);
                setRoomDetail(response);
            }).catch(error => {
            // console.log("Error: ", error)
        });

        // is room already booked / available for booking
        getRoomBookingStatus(roomId)
            .then(response => {
                setRoomStatus(response);
                console.log(response);
            }).catch(error => {
            console.log(error);
        });


    }, [roomId]);

    const navigate = useNavigate();

    const goToBookingPage = () => {
        if (isLoggedIn()) {
            navigate("/booking/" + roomId);
        } else {
            setIsLogin(true);
            setTimeout(() => {
                setIsLogin(false);
            }, 4000);
            navigate('/room-detail/' + roomId);
        }
    }

    return (
        <Base>
            <DetailComponent>
                {/*{JSON.stringify(roomStatus)}*/}
                <Row>
                    {isLogin &&
                        <Alert style={{marginBottom: '20px'}}
                               severity="error"
                               sx={{transition: 'opacity 0.5s', opacity: 1}}
                        >
                            First login and then book a room!
                        </Alert>
                    }
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <RoomImage src={roomDetail?.room_img_url} alt="Image here"/>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <RoomDetails>
                            {/*<BookingStatus>{roomStatus.Status}</BookingStatus>*/}
                            <TYPE>{roomDetail?.room_type} Room</TYPE>
                            <Description>{roomDetail?.description}</Description>
                            <div style={{color: '#464646'}}><b>Dimensions:</b> {roomDetail?.dimensions}</div>
                            <div style={{color: '#464646'}}><b>Location:</b> {roomDetail?.location}</div>
                            <div style={{color: '#464646'}}><b>Contact:</b> {roomDetail?.contact_no}</div>
                            <div style={{color: '#464646'}} className="mb-3"><b>Total
                                Rooms:</b> {roomDetail?.total_rooms}</div>

                            <div className="d-flex justify-content-around align-content-center"
                                 style={{width: '300px'}}>
                                <div style={{color: '#464646', marginBottom: '5px', fontSize: '14px'}}>
                                    <WifiIcon style={{fontSize: '20px', marginBottom: '5px'}}/> <b>Wifi</b>
                                    <span
                                        style={{marginLeft: '10px'}}>{roomDetail?.wifi_facility} |</span>
                                </div>
                                <div style={{color: '#464646', marginBottom: '5px', fontSize: '14px'}}>
                                    <ShowerIcon style={{fontSize: '20px', marginBottom: '5px'}}/> <b>Water</b>
                                    <span
                                        style={{marginLeft: '10px'}}>{roomDetail?.wifi_facility} |</span>
                                </div>
                                <div style={{color: '#464646', marginBottom: '20px', fontSize: '14px'}}>
                                    <LocalLaundryServiceIcon style={{fontSize: '20px', marginBottom: '5px'}}/> <b>Washing</b>
                                    <span
                                        style={{marginLeft: '10px'}}>{roomDetail?.wifi_facility}</span>
                                </div>
                            </div>

                            {/*{roomId}*/}
                            <Button variant="contained"
                                    onClick={goToBookingPage}
                                // disabled={roomStatus.Status === 'Booked'}
                            >Book now</Button>
                        </RoomDetails>
                    </Col>
                </Row>
            </DetailComponent>
        </Base>

    )
};

export default MoreDetailComponent;