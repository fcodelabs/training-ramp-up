import React from "react";

const Header: React.FC<{ text: string }> = ({ text }) => {
  const headerStyle = {
    paddingRight: text === "Age" ? "100px" : "35px",
  };
  return <div style={headerStyle}>{text}</div>;
};

export { Header };
