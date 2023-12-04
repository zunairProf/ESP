import "../style/PriceAndRule.css";
import React from "react";
import DiscountIcon from '@mui/icons-material/Discount';
import {Card, CardBody, CardHeader, CardText, Col, Container, Row} from "reactstrap";
import styled from "styled-components";
import {StandardRoom, StudioRoom} from "./PriceAndRuleData";

const Discount = styled.h5`
  color: #146eb4;
  font-size: 16px;
`;
export const PriceAndRules = () => {
    return (
        <div className="p-0">
            <div style={{background: '#146eb4', height: '50px'}}>
                <h4 style={{position: 'relative', top: '10px', color: 'white'}}>Standard Room Pricing</h4>
            </div>
            <Container>

                <Row className="d-flex justify-content-center align-content-center">
                    {StandardRoom.map(d => (
                        <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                            <Card className="m-3 custom-card">
                                <CardHeader>
                                    {d.cardHeading}
                                </CardHeader>
                                <CardBody>
                                    <CardText>{d.cardDay}</CardText>
                                    <CardText><b>PKR: </b>{d.cardAmount}
                                        <span className="day"> (Per day)</span>
                                    </CardText>
                                    <CardText>
                                        <Discount>
                                            <DiscountIcon className="dicount"/>
                                            <b> Discount: </b>{d.cardDiscount}
                                        </Discount>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    ))
                    }
                </Row>
            </Container>
            <div style={{background: '#146eb4', height: '50px'}}>
                <h4 style={{position: 'relative', top: '10px', color: 'white'}}>Studio Room Pricing</h4>
            </div>
            <Container>
                <Row className="d-flex justify-content-center align-content-center">
                    {StudioRoom.map(d => (
                        <Col xl={4} lg={4} md={6} sm={6} xs={12}>
                            <Card className="m-3 custom-card">
                                <CardHeader>
                                    {d.cardHeading}
                                </CardHeader>
                                <CardBody>
                                    <CardText>{d.cardDay}</CardText>
                                    <CardText><b>PKR: </b>{d.cardAmount}
                                        <span className="day"> (Per day)</span>
                                    </CardText>
                                    <CardText>
                                        <Discount>
                                            <DiscountIcon className="dicount"/>
                                            <b> Discount: </b>{d.cardDiscount}
                                        </Discount>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    ))
                    }
                </Row>
            </Container>
        </div>
    )
};