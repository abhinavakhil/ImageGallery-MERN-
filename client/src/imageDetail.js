import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

import "./imageDetail.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoid2l6YXJkY29kaW5nIiwiYSI6ImNrYXh6ejVzMDBiN3UyeG5pZHV3ZDl1eGUifQ.3yx5c45P8A1cmOSyycXugQ",
});

class ImageDetails extends Component {
  state = {
    lat: 0,
    long: 0,
  };

  componentDidMount() {
    this.parseQueryParams();
  }

  parseQueryParams() {
    const query = this.props.match.params.value;
    console.log(query);
    let location = query.split(",");

    this.setState({ lat: location[0], long: location[1] });
  }

  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100%",
        }}
        center={[77.1025, 28.7041]}
        zoom={[1]}
      >
        <Marker coordinates={[this.state.lat, this.state.long]}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f2/678111-map-marker-512.png"
            height="30px"
            width="30px"
          />
        </Marker>
      </Map>
    );
  }
}

export default ImageDetails;
