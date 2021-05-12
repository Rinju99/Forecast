import React, { Component } from "react";
import "./App.css";
import moment from "moment";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
    };
  }
  componentDidMount() {
    fetch(
      "https://bg7p7w7pxd.execute-api.us-east-2.amazonaws.com/forecast/forecast"
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json.body.data.timelines[0].intervals,
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>...Loading</div>;
    } else {
      return (
        <div className="main">
          <h1>❄ Weather forecast 🌥</h1>
          <div className="Weather">
            {items.map((i) => (
              <div key={i.startTime} className="each">
                <h3>{moment(i.startTime).format("MMM DD, dddd")} </h3>
                <img
                  src={"./" + i.values.weatherCode + ".svg"}
                  alt="weather code"
                  className="weather-code"
                />
                🌡 {i.values.temperature}°F & Wind Speed: {i.values.windSpeed}
                mph
                <hr />
              </div>
            ))}
          </div>{" "}
        </div>
      );
    }
  }
}
