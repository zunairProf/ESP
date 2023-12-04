import React, {useEffect, useState} from "react";
import Base from "./Base";
import styled from "styled-components";
import {getRooms} from "../service/roomsservice";
import {Container} from "reactstrap";
import {useTranslation} from "react-i18next";
import {CustomCarousal} from "./Crousal";
import {RoomComponent} from "./RoomComponent";
import ResponsiveAppBar from "../testing/muiNavbar";
import {PriceAndRules} from "./PriceAndRules";

const Home = () => {

    const {t} = useTranslation();

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getRooms().then(response => {
            console.log(response);
            setRooms(response);
        }).catch(error => {
            // console.log('Error: ', error)
        })
    }, []);

    return (
        <Base>
            {/*<CustomSpinner/>*/}
            {/*<CustomCarousal/>*/}
            <div style={{marginBottom: '100px', marginTop: '100px'}}>
                {rooms &&
                    rooms.map(room => (
                        <RoomComponent key={room._id}
                                       id={room._id}
                                       imageSrc={room.room_img_url}
                                       description={room.description}
                                       roomType={room.room_type}
                        />
                    ))}
                {!rooms &&
                    <Container style={{marginTop: '100px'}}>
                        <h3>No Content here</h3>
                    </Container>}

                {/*<ResponsiveAppBar/>*/}
            </div>
            <PriceAndRules/>
        </Base>
    );
};

export default Home;
