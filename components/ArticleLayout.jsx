import React from "react";
import Article from "./Article";

class ArticleLayout extends React.Component {
  componentDidMount() {
    const articles = document.getElementById("article-container").childNodes;
    const container = document.getElementById("article-container");

    let currentChild = articles[0];
    let currentChild2 = articles[1];

    container.style.perspective = "100px";
    currentChild.style.transformStyle = "preserve-3d";

    const onScroll = () => {
      currentChild.style.transformOrigin = "top";
      currentChild.style.transform = `rotateX(${-window.scrollY * 0.02}deg)`;
      currentChild2.style.transformOrigin = "bottom";
      currentChild2.style.transform = `rotateX(${window.scrollY * 0.02}deg)`;
    };
    window.addEventListener("scroll", onScroll);
  }
  render() {
    return (
      <div id="article-container">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Article />
          <Article />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Article />
          <Article />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Article />
          <Article />
        </div>
      </div>
    );
  }
}

export default ArticleLayout;
