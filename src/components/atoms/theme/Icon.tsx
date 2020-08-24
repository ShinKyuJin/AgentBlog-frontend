import React, { FC } from "react";

export interface IconProps {
  type:
    | "search"
    | "trend"
    | "time"
    | "back"
    | "redHeart"
    | "blackHeart"
    | "down";
  size?: number;
  color?: string | undefined;
}

const pathProps = {
  search: {
    d:
      "M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z",
  },
  trend: {
    d:
      "M5 20v2h-2v-2h2zm2-2h-6v6h6v-6zm6-1v5h-2v-5h2zm2-2h-6v9h6v-9zm6-2v9h-2v-9h2zm2-2h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z",
  },
  time: {
    d:
      "M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z",
  },
  back: {
    d: "M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z",
  },
  redHeart: {
    fill: "currentColor",
    d: "M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z",
  },
  blackHeart: {
    fill: "currentColor",
    d: "M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z",
  },
  down: { d: "M12 21l-12-18h24z" },
};

export const Icon: FC<IconProps> = ({ type, size = 24, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path {...pathProps[type]} />
    </svg>
  );
};
