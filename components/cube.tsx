
import { cn } from '@/lib/utils';

interface CubeProps {
  size?: number;
  className?: string;
  style?: Object;
}

export const Cube = ({
  size = 1,
  className,
  style,
}: CubeProps) => {

  const sizePx = 20 * size;
  const cubeSytles = {
    "cubeContainer": { width: `${sizePx}px`, height: `${sizePx}px`, perspective: `${sizePx*5}px` },
    "cube": {
      position: "relative",
      width: `${sizePx}px`,
      height: `${sizePx}px`,
      transformStyle: "preserve-3d",
      transform: "rotate3d(1, 1, 0, 45deg)"
    },
    "face": {
      width: `${sizePx}px`,
      height: `${sizePx}px`,
      background: "white",
      border: "1px solid black",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
      fontSize: "2rem"
    },
    "front": { transform: `translateZ(${sizePx/2}px)` },
    "back": { transform: `translateZ(-${sizePx/2}px) rotateY(180deg)` },
    "left": { transform: `translateX(-${sizePx/2}px) rotateY(-90deg)` },
    "right": { transform: `translateX(${sizePx/2}px) rotateY(90deg)` },
    "top": { transform: `translateY(-${sizePx/2}px) rotateX(90deg)` },
    "bottom": { transform: `translateY(${sizePx/2}px) rotateX(-90deg)` }
  }

  return (
    <div style={{...cubeSytles.cubeContainer, ...style}} className={cn(className)}>
      {/* @ts-ignore */} 
      <div style={{...cubeSytles.cube}}>
        {/* @ts-ignore */} 
        <div style={{...cubeSytles.face, ...cubeSytles.front}}></div>
        {/* @ts-ignore */} 
        {/* <div style={{...cubeSytles.face, ...cubeSytles.back}}></div> */}
        {/* @ts-ignore */} 
        <div style={{...cubeSytles.face, ...cubeSytles.left}}></div>
        {/* @ts-ignore */} 
        {/* <div style={{...cubeSytles.face, ...cubeSytles.right}}></div> */}
        {/* @ts-ignore */} 
        {/* <div style={{...cubeSytles.face, ...cubeSytles.top}}></div> */}
        {/* @ts-ignore */} 
        <div style={{...cubeSytles.face, ...cubeSytles.bottom}}></div>
      </div>
    </div>
  )
}
