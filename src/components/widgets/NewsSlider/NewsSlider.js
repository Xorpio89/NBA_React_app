import React, { Component } from "react";
import axios from "axios";

import SliderTemplates from "./SliderTemplates";
import { URL } from "../../../config";

export class NewsSlider extends Component {
  state = {
    articles: []
  };

  componentWillMount() {
    axios
      .get(
        `${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`
      )
      .then(res => {
        this.setState({
          articles: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <SliderTemplates
        data={this.state.articles}
        type={this.props.type}
        settings={this.props.settings}
      />
    );
  }
}

export default NewsSlider;
