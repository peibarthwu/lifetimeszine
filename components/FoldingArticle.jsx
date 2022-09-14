import React from "react";
import Article from "./Article";

let pixelCounter = 0;
let counter = 0;
let articleBits = [];
let activeBit1 = null;
let activeBit2 = null;
let lastActiveIndex = 0;

var getOffset = function (node) {
  // Doc: https://github.com/area17/a17-behaviors/wiki/getOffset

  if (node) {
    var rect = node.getBoundingClientRect();
    return {
      top:
        rect.top +
        (document.documentElement.scrollTop || document.body.scrollTop),
      left:
        rect.left +
        (document.documentElement.scrollLeft || document.body.scrollLeft),
      bottom:
        rect.bottom +
        (document.documentElement.scrollTop || document.body.scrollTop),
      right:
        rect.right +
        (document.documentElement.scrollLeft || document.body.scrollLeft),
      width: rect.width,
      height: rect.height,
    };
  } else {
    return null;
  }
};

class FoldingArticle extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    console.log("init");

    const node = this.myRef.current;
    const siteHeight = document.body.getBoundingClientRect().height;

    const container = document.createElement("div");
    node.append(container);
    container.classList.add("three-d-container");

    const baseItems = document.querySelectorAll(".base");

    const base = baseItems[0];
    const baseHeight = base.getBoundingClientRect().height;
    container.style.perspective = `${baseHeight / 100}px`;

    const sizeFixHeight = window.innerHeight / 6;
    const animStart = window.innerHeight / 2;

    function init() {
      while (pixelCounter < baseHeight) {
        let sizeFixEle = document.createElement("div");
        sizeFixEle.classList.add("size-fix");
        sizeFixEle.style.height = `${sizeFixHeight}px`;
        let innerContent = base.cloneNode(true);
        //need to remove base from class list first
        innerContent.classList = "";
        innerContent.style.transform = `translateY(${
          -pixelCounter - counter
        }px)`;
        sizeFixEle.append(innerContent);
        container.append(sizeFixEle);

        articleBits.push(sizeFixEle);
        pixelCounter += sizeFixHeight;
      }

      //hide the base element
      base.style.overflow = "hidden";
      base.style.height = 0;

      //set up initial active elements
      if (articleBits.length > 0) {
        activeBit1 = articleBits[0];
        lastActiveIndex = 0;
      }

      if (articleBits.length > 1) {
        activeBit2 = articleBits[1];
        lastActiveIndex = 1;
      }
    }

    for (let i = 0; i < baseItems.length; i++) {}
    init();

    const onScroll = () => {
      for (let i = 0; i + 1 < articleBits.length; i += 2) {
        if (
          articleBits[i + 1].getBoundingClientRect().top <= animStart &&
          Math.abs(animStart - articleBits[i + 1].getBoundingClientRect().top) *
            0.03 <
            7
        ) {
          container.style.perspectiveOrigin = `50% ${window.pageYOffset}px`;
          articleBits[i].style.transformOrigin = "top";
          articleBits[i].style.transform = `rotateX(${
            -(animStart - articleBits[i + 1].getBoundingClientRect().top) * 0.01
          }deg)`;
          articleBits[i + 1].style.transformOrigin = "bottom";
          articleBits[i + 1].style.transform = `rotateX(${
            (animStart - articleBits[i + 1].getBoundingClientRect().top) * 0.01
          }deg)`;

          //i think i need to translate it either up and back by size times sin or cosine of the angle
        }
      }
    };
    window.addEventListener("scroll", onScroll);
  }
  render() {
    return (
      <div>
        <div ref={this.myRef}></div>
        <div className="base">
          <Article />
        </div>
      </div>
    );
  }
}

export default FoldingArticle;
