import React from "react";

const Square = (props) => {
  const { isWinning } = props
  return (
    <button className={"square " + (isWinning ? "square-winning" : null)} onClick={() => props.onClick()}>
      {props.value}{" "}
    </button>
  );
};


export default Square;
