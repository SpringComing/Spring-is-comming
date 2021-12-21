import React from "react";
import Title from "./Title.js";
import AddProcess from "./AddProcessButton"

const Nav = ({addProcess}) => {
  return (
    <section className="kanban__nav">
        <div className="kanban__nav-wrapper">
          <Title />
          <AddProcess addProcess = { addProcess } />
        </div>
      </section>
  );
};

export default Nav;