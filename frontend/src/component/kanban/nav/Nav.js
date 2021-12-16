import React from "react";
import Title from "./Title.js";
import AddProcess from "./AddProcess"

const Nav = () => {
  return (
    <section className="kanban__nav">
        <div className="kanban__nav-wrapper">
          <Title />
          <AddProcess />
        </div>
      </section>
  );
};

export default Nav;