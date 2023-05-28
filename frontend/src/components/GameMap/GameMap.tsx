import { FC } from "react"
import { mockData } from "./mock"

import classes from './styles.module.css'

const GameMap: FC = () => {
    const clickHandler = () => {
        alert('hello')
    }

   return (
        <svg 
            version="1.1" 
            id="game-map" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            x="0px" y="0px"
            viewBox="0 0 1915.5 1077.4"  
            xmlSpace="preserve"
        >
            {
                <>
                    {mockData.map(region => (
                        <g>
                            {region.provinces.map(province => (
                                <path
                                    onClick={clickHandler}
                                    className={classes.province} 
                                    d={province.d} 
                                    fill={province.settings.fill} 
                                    stroke={province.settings.stroke} 
                                    strokeWidth={province.settings.strokeWidth}
                                    strokeMiterlimit={province.settings.strokeMiterlimit} 
                                />
                            ))}
                        </g>
                    ))}
                </>
            }
        </svg>
   )
}

export { GameMap }