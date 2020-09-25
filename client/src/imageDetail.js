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
    data: [],
  };

  componentDidMount() {
    // this.parseQueryParams();
    const query = this.props.match.params.value;
    console.log(query);
    //console.log(`/api/data/${query}`);
    axios.get(`/api/${query}`).then((res) => {
      console.log(res.data.user);
      this.setState({ data: res.data.user });
    });
  }

  // parseQueryParams() {
  //   const query = this.props.match.params.value;
  //   console.log(query);
  //   //console.log(`/api/data/${query}`);
  //   axios.get(`/api/${query}`).then((res) => {
  //     console.log(res);
  //   });
  // }

  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100%",
        }}
        center={[Number(this.state.data.lat), Number(this.state.data.long)]}
        zoom={[1]}
      >
        {this.state.loading ? (
          <Popup
            coordinates={[
              Number(this.state.data.lat),
              Number(this.state.data.long),
            ]}
            offset={{
              "bottom-left": [12, -38],
              bottom: [0, -38],
              "bottom-right": [-12, -38],
            }}
          >
            <img src={this.state.data.image} height="100px" width="100px" />
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
