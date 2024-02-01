import React from "react";

const Header: React.FC<{ text: string }> = ({ text }) => {
  const headerStyle = {
    paddingRight: text === "Age" || text === "ID" ? "500px" : "45px",
  };
  return <div style={headerStyle}>{text}</div>;
};

export { Header };
