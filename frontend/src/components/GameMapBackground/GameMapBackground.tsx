import { FC } from "react";
import { bgData } from "./data";

const GameMapBackground: FC = () => (
  <g>
    <rect y="1" fill="#399AB7" width="1920" height="1078" />
    {bgData.map((el, i) => (
			<path key={i} d={el.d} fill={el.fill} />
		))}
  </g>
);


export { GameMapBackground }