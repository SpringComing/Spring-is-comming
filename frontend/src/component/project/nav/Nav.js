import React from "react";
import Title from "./Title.js";

const Nav = () => {
  return (
    <section className="kanban__nav">
        <div className="kanban__nav-wrapper">
          <Title />
          {/*<AddProject />*/}
        </div>
      </section>
  );
};

export default Nav;