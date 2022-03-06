import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <button
      type="button"
      className={props.loading ? "button button--loading" : "button"}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
      }}
    >
      <span class="button__text">{props.label}</span>
    </button>
  );
}
