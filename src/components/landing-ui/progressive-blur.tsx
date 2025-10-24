import React from "react";

type ProgressiveBlurProps = {
  className?: string;
  backgroundColor?: string;
  position?: "top" | "bottom" | "left" | "right";
  height?: string;
  width?: string;
  blurAmount?: string;
};

export const ProgressiveBlur = ({
  className = "",
  backgroundColor = "rgb(255 255 255)",
  position = "top",
  height = "150px",
  width = "250px",
  blurAmount = "6px",
}: ProgressiveBlurProps) => {
  const isTop = position === "top";
  const isBottom = position === "bottom";
  const isLeft = position === "left";
  const isRight = position === "right";

  const style: React.CSSProperties = {
    height: isTop || isBottom ? height : "100%",
    width: isLeft || isRight ? width : "100%",
    // Keep the background gradient for better blur
    background: isTop
      ? `linear-gradient(to top, transparent, ${backgroundColor})`
      : isBottom
        ? `linear-gradient(to bottom, transparent, ${backgroundColor})`
        : isLeft
          ? `linear-gradient(to left, transparent, ${backgroundColor})`
          : `linear-gradient(to right, transparent, ${backgroundColor})`,
    maskImage: isTop
      ? `linear-gradient(to bottom, ${backgroundColor} 50%, transparent)`
      : isBottom
        ? `linear-gradient(to top, ${backgroundColor} 50%, transparent)`
        : isLeft
          ? `linear-gradient(to right, ${backgroundColor} 50%, transparent)`
          : `linear-gradient(to left, ${backgroundColor} 50%, transparent)`,
    WebkitBackdropFilter: `blur(${blurAmount})`,
    backdropFilter: `blur(${blurAmount})`,
    WebkitUserSelect: "none",
    userSelect: "none",
    ...(isTop && { top: 0 }),
    ...(isBottom && { bottom: 0 }),
    ...(isLeft && { left: 0 }),
    ...(isRight && { right: 0 }),
  };

  return (
    <div
      className={`pointer-events-none absolute w-full select-none ${className}`}
      style={style}
    />
  );
};
