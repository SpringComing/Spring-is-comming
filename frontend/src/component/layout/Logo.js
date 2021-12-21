import React from 'react';
import { Link } from "react-router-dom";
import styles from "../../assets/css/layout/Logo.scss"

const Logo = () => {
    return (
      <Link to="/">
        <section className={styles.logo} >
          <img src={require("../../assets/img/logoSpring.png")} />
        </section>
      </Link>
    );
};

export default Logo;



