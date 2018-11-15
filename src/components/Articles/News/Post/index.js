import React, { Component } from "react";
import axios from "axios";
import { URL } from "../../../../config";

import "../../Articles.css";
import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";

export class NewsArticles extends Component {
  state = {
    article: [],
    team: []
  };

  componentWillMount() {
    axios.get(`${URL}/articles/?id=${this.props.match.params.id}`).then(res => {
      let article = res.data[0];

      axios.get(`${URL}/teams?id=${article.team}`).then(res => {
        this.setState({
          article,
          team: res.data
        });
      });
    });
  }
  render() {
    const { article, team } = this.state;

    return (
      <div className="articleWrapper">
        <ArticleHeader
          teamData={team[0]}
          date={article.date}
          author={article.author}
        />
        <ArticleBody article={article} />
      </div>
    );
  }
}

export default NewsArticles;
