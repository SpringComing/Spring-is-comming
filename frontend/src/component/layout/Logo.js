import React from 'react';
import { Link } from "react-router-dom";

const Logo = () => {
    return (
      <Link to="/">
        <section className="logo" >
          <span>spring</span>
        </section>
      </Link>
    );
};

export default Logo;



