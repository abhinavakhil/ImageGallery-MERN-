import React, { Component } from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";

import axios from "axios";
import "./imageDetail.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoid2l6YXJkY29kaW5nIiwiYSI6ImNrYXh6ejVzMDBiN3UyeG5pZHV3ZDl1eGUifQ.3yx5c45P8A1cmOSyycXugQ",
});

const DEFAULT_LANGITUDE = -123;
const DEFAULT_LATITUDE = 48;

class ImageDetails extends Component {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    // this.parseQueryParams();
    const query = this.props.match.params.value;
    console.log(query);
    //console.log(`/api/data/${query}`);
    axios.get(`/api/${query}`).then((res) => {
      console.log(res.data.user);
      this.setState({ data: res.data.user, loading: true });
    });
  }

  render() {
    const langitude = this.state.loading
      ? this.state.data.long
      : DEFAULT_LANGITUDE;
    const latitude = this.state.loading
      ? this.state.data.lat
      : DEFAULT_LATITUDE;
    return (
      <div>
        {this.state.loading ? (
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "100vh",
              width: "100%",
            }}
            center={[langitude, latitude]}
            zoom={[1]}
          >
            {this.state.loading ? (
              <Marker coordinates={[langitude, latitude]} anchor="bottom">
                <img
                  src="https://www.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png"
                  height="50px"
                  width="50px"
                />
                <Popup
                  coordinates={[13.13751, 85.3131193]}
                  // offset={{
                  //   "bottom-left": [12, -38],
                  //   // bottom: [0, -38],
                  //   "bottom-right": [-12, -38],
                  // }}
                >
                  <img
                    src={this.state.data.image}
                    height="100px"
                    width="100px"
                  />
                </Popup>
              </Marker>
            ) : (
              <p>Null</p>
            )}
          </Map>
        ) : (
          <div className="text-align:center">Loading...</div>
        )}
      </div>
    );
  }
}

export default ImageDetails;
