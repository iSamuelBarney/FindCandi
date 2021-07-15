import React, { useEffect, useState } from "react";

import candy from "assets/images/candy.png";
import "assets/styles/Logo.css";

import tagLines from "constants/tagLines";

function Logo() {
  const [tagIndex, setTagIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex(tagLines?.[tagIndex + 1] ? tagIndex + 1 : 0);
    }, 7000);
    return () => clearInterval(interval);
  }, [tagIndex]);

  return (
    <>
      <img src={candy} className='App-logo' alt='logo' />
      <p className='App-logotype'>FindCandi</p>
      <p className='App-tagline'>{tagLines[tagIndex]}</p>
    </>
  );
}

export default Logo;
