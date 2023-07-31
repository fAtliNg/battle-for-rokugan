import { FC, useMemo } from "react";
import { GameMapBackground } from "../GameMapBackground";
import { Province } from "./style";
import { ICapital, IGameMap } from "./types";

const GameMap: FC<IGameMap> = ({
  data,
  onProvinceClick,
  borderSettings = { stroke: '#000', strokeWidth: 3 },
}) => {
  const capitals = useMemo(() => data.reduce((acc: ICapital[], item ) => {
    return [
      ...acc, 
      ...item.provinces.map(province => province.capital).filter(Boolean)
    ] as ICapital[]
  }, []), [data])
  
  // return <Test />
  return (
    <svg
      version="1.1"
      id="game-map"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 1920 1080"
      xmlSpace="preserve"
    >
      <GameMapBackground />
      {data.map((region) => (
        <g key={region.id}>
          {region.provinces.map((province) => (
              <Province
                onClick={() => {
                  onProvinceClick(province);
                }}
                key={province.id}
                d={province.d}
                fill={province.fill}
                strokeMiterlimit={10}
                {...borderSettings}
              />
          ))}
        </g>
      ))}
      {!!capitals?.length && (
        capitals.map(capital => (
          <path 
            key={capital.d.slice(-5)} 
            fill={capital.fill} 
            d={capital.d} 
          />
        ))
      )}
    </svg>
  );
};

export { GameMap };
