import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import axios from "axios";
import "./imageDetail.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoid2l6YXJkY29kaW5nIiwiYSI6ImNrYXh6ejVzMDBiN3UyeG5pZHV3ZDl1eGUifQ.3yx5c45P8A1cmOSyycXugQ",
});

class ImageDetails extends Component {
  state = {
    lat: 0,
    long: 0,
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.parseQueryParams();
  }

  parseQueryParams() {
    const query = this.props.match.params.value;
    console.log(query);
    axios.get("/api").then((res) => {
      console.log(res.data.imageData);
      let userData = res.data.imageData;
      for (var i = 0; i < res.data.imageData.length; i++) {
        if (query === userData[i]._id) {
          this.setState({ data: userData[i] });
        }
      }
    });
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
        {this.state.loading ? (
          <Popup
            coordinates={[this.state.lat, this.state.long]}
            offset={{
              "bottom-left": [12, -38],
              bottom: [0, -38],
              "bottom-right": [-12, -38],
            }}
          >
            <img src={this.props.setImage} height="100px" width="100px" />
          </Popup>
        ) : (
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
              height="100%"
              width="100%"
            />
          </div>
        )}
      </Map>
    );
  }
}

export default ImageDetails;
