import React, { Component } from "react";
import {
  Card,
  CardImg,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import "./home.css";

class Home extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios.get("/api").then((res) => {
      console.log(res.data.imageData);
      let userData = res.data.imageData;
      this.setState({ data: userData });
      console.log(this.state.data);
    });
  }

  // handleImage(image) {
  //   return function () {
  //     console.log(image);
  //   };
  // }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            {this.state.data.map((img) => (
              <Col md={3}>
                <Card style={{ marginBottom: "15px" }}>
                  <CardImg
                    top
                    width="100%"
                    height="180px"
                    src={img.image}
                    alt="Card image cap"
                  />

                  <CardBody className="text-center">
                    <CardTitle
                      color="danger"
                      tag="h4"
                      style={{ color: "black" }}
                    >
                      {img.imageName.toUpperCase()}
                    </CardTitle>
                    <Link to={`/imageDetail/${img._id}`}>
                      <Button>View on Map</Button>
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
