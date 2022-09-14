import React from "react";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: "9/8/2022" };
  }

  componentDidMount() {
    const curDate = document.getElementById("curDate");

    const onScroll = () => {
      const siteHeight = document.body.getBoundingClientRect().height;
      curDate.style.transform = `translateY(${
        (window.scrollY * window.innerHeight) / siteHeight
      }px)`;
    };
    window.addEventListener("scroll", onScroll);
  }

  render() {
    return (
      <div className="fixed top-0 right-0 w-[100px] h-full border-l-2 z-10 pl-4 pt-4 font text-white">
        <p id="curDate" className="absolute">
          {this.state.date}
        </p>
      </div>
    );
  }
}

export default Menu;
