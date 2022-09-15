import React from "react";
import Article from "./Article";
const TWEEN = require("@tweenjs/tween.js");

let pixelCounter = 0;
let counter = 0;
let articleBits = [];
let activeBit1 = null;
let activeBit2 = null;
let lastActiveIndex = 0;

function getCurrentRotation(el) {
  var st = window.getComputedStyle(el, null);
  var rotateX = 0;
  var rotateY = 0;
  var rotateZ = 0;
  var tm =
    st.getPropertyValue("-webkit-transform") ||
    st.getPropertyValue("-moz-transform") ||
    st.getPropertyValue("-ms-transform") ||
    st.getPropertyValue("-o-transform") ||
    st.getPropertyValue("transform") ||
    "none";
  if (tm != "none") {
    // do some magic
    var values = tm.split("(")[1].split(")")[0].split(","),
      pi = Math.PI,
      sinB = parseFloat(values[8]),
      b = Math.round((Math.asin(sinB) * 180) / pi),
      cosB = Math.cos((b * pi) / 180),
      matrixVal10 = parseFloat(values[9]),
      a = Math.round((Math.asin(-matrixVal10 / cosB) * 180) / pi),
      matrixVal1 = parseFloat(values[0]),
      c = Math.round((Math.acos(matrixVal1 / cosB) * 180) / pi);

    rotateX = a;
    rotateY = b;
    rotateZ = c;
  }

  return {
    rotateX: rotateX,
    rotateY: rotateY,
    rotateZ: rotateZ,
  };
}

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
    const animStart = window.innerHeight / 2.5;

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

      //set rotation points of each element
      for (let i = 0; i + 1 < articleBits.length; i += 1) {
        //odd
        if (i % 2 != 0) {
          articleBits[i].style.transformOrigin = "bottom";
        } else {
          articleBits[i].style.transformOrigin = "top";
        }
      }
    }

    init();

    const onScroll = () => {
      for (let i = 0; i + 1 < articleBits.length; i += 2) {
        if (
          articleBits[i + 1].getBoundingClientRect().top <= animStart &&
          Math.abs(animStart - articleBits[i + 1].getBoundingClientRect().top) *
            0.03 <
            14
        ) {
          container.style.perspectiveOrigin = `50% ${window.pageYOffset}px`;
          // articleBits[i].style.transformOrigin = "top";
          articleBits[i].style.transform = `rotateX(${
            -(animStart - articleBits[i + 1].getBoundingClientRect().top) * 0.02
          }deg)`;
          // articleBits[i + 1].style.transformOrigin = "bottom";
          articleBits[i + 1].style.transform = `rotateX(${
            (animStart - articleBits[i + 1].getBoundingClientRect().top) * 0.02
          }deg)`;

          //i think i need to translate it either up and back by size times sin or cosine of the angle
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    // //set up tweening stuff
    // function animate(time) {
    //   requestAnimationFrame(animate);
    //   TWEEN.update(time);
    // }
    // requestAnimationFrame(animate);

    // //add event listener to button to collapse everything down
    // const height = {
    //   value: sizeFixHeight,
    // };
    // var target = 0;
    // var targetRot = 20;
    // const collapseIt = () => {
    //   articleBits.forEach((item, index) => {
    //     const rot = getCurrentRotation(item);
    //     const direction = 1;
    //     if (index % 2 == 0) {
    //       direction = -1;
    //     }
    //     const tween = new TWEEN.Tween(rot) // Create a new tween that modifies 'coords'.
    //       .to({ rotateX: targetRot }, 1000) // Move to (300, 200) in 1 second.
    //       .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
    //       .onUpdate(() => {
    //         // Called after tween.js updates 'coords'.
    //         // Move 'box' to the position described by 'coords' with a CSS translation.
    //         item.style.setProperty(
    //           "transform",
    //           `rotateX(${direction * rot.rotateX}deg)`
    //         );
    //       })
    //       .start(); // Start the tween immediately.

    //     const tween2 = new TWEEN.Tween(height) // Create a new tween that modifies 'coords'.
    //       .to({ value: target }, 1000) // Move to (300, 200) in 1 second.
    //       .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
    //       .onUpdate(() => {
    //         item.style.setProperty("height", `${height.value}px`);
    //       })
    //       .start(); // Start the tween immediately.
    //   });
    //   if (target != 0) {
    //     target = 0;
    //   } else {
    //     target = sizeFixHeight;
    //   }
    //   if (targetRot != 20) {
    //     targetRot = 90;
    //   } else {
    //     targetRot = 0;
    //   }
    // };
    // const button = document.getElementById("collapse-button");
    // button.addEventListener("click", collapseIt);
  }
  render() {
    return (
      <div>
        {/* <button id="collapse-button"> Button </button> */}
        <div ref={this.myRef}></div>
        <div className="base">
          <Article />
        </div>
      </div>
    );
  }
}

export default FoldingArticle;
