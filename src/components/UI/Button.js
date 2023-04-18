import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  danger,
  normal,
  children,
  width,
  height,
  isLink,
  linkDirection,
  className,
  padding,
  state,
  ...buttonProps
}) => {
  let styles = {
    width: !width && !padding ? "150px" : width,
    height: !height ? "40px" : height,
    border: "2px solid black",
    lineHeight: "37px",
    transition: "200ms",
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: padding,
    fontSize: "14px",
    textAlign: "center",
  };
  let hoverStyles;
  let unHoverStyles = (e) => {
    e.target.style.backgroundColor = "transparent";
    e.target.style.border = "2px solid #3f3113";
    e.target.style.color = "#3f3113";
  };

  if (danger) {
    hoverStyles = (e) => {
      e.target.style.transition = "300ms";
      e.target.style.backgroundColor = "#c43d34";
      e.target.style.border = "2px solid transparent";
      e.target.style.color = "white";
    };
  } else if (normal) {
    hoverStyles = (e) => {
      e.target.style.transition = "300ms";
      e.target.style.backgroundColor = "#eab839";
      e.target.style.border = "2px solid transparent";
      e.target.style.color = "white";
    };
  } else {
    hoverStyles = (e) => {
      e.target.style.transition = "300ms";
      e.target.style.backgroundColor = "#eab839";
      e.target.style.border = "2px solid transparent";
      e.target.style.color = "white";
    };
  }

  return !isLink ? (
    <button
      style={styles}
      onMouseEnter={hoverStyles}
      onMouseLeave={unHoverStyles}
      className={className && className}
      {...buttonProps}
    >
      {children}
    </button>
  ) : isLink && linkDirection && state ? (
    <Link
      to={linkDirection}
      state={state && state}
      style={styles}
      onMouseEnter={hoverStyles}
      onMouseLeave={unHoverStyles}
      className={className && className}
      {...buttonProps}
    >
      {children}
    </Link>
  ) : isLink && linkDirection ? (
    <Link
      to={linkDirection}
      state={state && state}
      style={styles}
      onMouseEnter={hoverStyles}
      onMouseLeave={unHoverStyles}
      className={className && className}
      {...buttonProps}
    >
      {children}
    </Link>
  ) : (
    <button style={styles} className={className && className} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
