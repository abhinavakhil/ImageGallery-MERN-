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
    lat: "",
  };

  componentDidMount() {
    axios.get("/api").then((res) => {
      console.log(res.data.imageData);
      let userData = res.data.imageData;
      this.setState({ data: userData });
      console.log(this.state.data);
    });
  }

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
                    <Link
                      to={`/imageDetail/${img.lat},${img.long},${img.image}`}
                    >
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

{
  /* <div className="row">
          <div className="col-md-12">
            {this.state.data.map((img) => (
              <Link to={`/imageDetail/${img.lat},${img.long}`}>
                <span key={img._id} className="thumbnail">
                  <img
                    src={img.image}
                    alt="images"
                    className="col-md-4 col-sm-6 item img-thumbnail"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div> */
}
