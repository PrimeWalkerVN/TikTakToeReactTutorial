import React from "react";
import PropTypes from "prop-types";

const Square = (props) => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}{" "}
    </button>
  );
};

Square.propTypes = {};

export default Square;
