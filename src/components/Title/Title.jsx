import React from "react";
import "./Title.css";

const Title = ({title, subtitle, id}) => {
  return (
    <div className="title" id={id}>
      <p>{title}</p>
      <h2>{subtitle}</h2>
    </div>
  )
}

export default Title;