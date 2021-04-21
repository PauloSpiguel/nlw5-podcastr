import React from "react";

import format from "date-fns/format";
import pt from "date-fns/locale/pt";

import styles from "./styles.module.scss";

const Header: React.FC = () => {
  const currentDate = format(new Date(), "EEEEEE, d MMM", { locale: pt });

  return (
    <header className={styles.headerContainer}>
      <img src='/mylogo.svg' alt='SpilCast' />

      <p>O melhor para receber feedback de seus estudos de idiomas</p>

      <span>{currentDate}</span>
    </header>
  );
};

export default Header;
