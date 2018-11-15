import React, { Component } from "react";
import axios from "axios";
import { URL } from "../../../../config";

import "../../Articles.css";
import VideoHeader from "./VideoHeader";
import VideosRelated from "../../../widgets/VideosList/VideosRelated/VideosRelated";

class VideoArticle extends Component {
  state = {
    article: [],
    team: [],
    teams: [],
    related: []
  };

  componentWillMount() {
    axios.get(`${URL}/videos/?id=${this.props.match.params.id}`).then(res => {
      let article = res.data[0];

      axios.get(`${URL}/teams?id=${article.team}`).then(res => {
        this.setState({
          article,
          team: res.data
        });
        this.getRelated();
      });
    });
  }

  getRelated = () => {
    console.log(this.state);
    axios.get(`${URL}/teams`).then(res => {
      let teams = res.data;

      axios
        .get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
        .then(res => {
          this.setState({
            teams,
            related: res.data
          });
        });
    });
  };
  render() {
    const { article, team } = this.state;

    return (
      <div>
        <VideoHeader teamData={team[0]} />
        <div className="videoWrapper">
          <h1>{article.title}</h1>
          <iframe
            title="videoplayer"
            width="100%"
            height="300px"
            src={`https://www.youtube.com/embed/${article.url}`}
          />
        </div>
        <VideosRelated data={this.state.related} teams={this.state.teams} />
      </div>
    );
  }
}

export default VideoArticle;
