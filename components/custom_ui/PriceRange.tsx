"use client"
import { formatCurrency } from "@/lib/utils";
import * as React from "react";
import { Range } from "react-range";
const STEP = 1;
const MIN = 100_000;
const MAX = 5_000_000;

export interface ITrackBackground {
    min: number;
    max: number;
    values: number[];
    colors: string[];
    direction?: Direction;
    rtl?: boolean;
  }
export type TThumbOffsets = { x: number; y: number }[];

export enum Direction {
    Right = "to right",
    Left = "to left",
    Down = "to bottom",
    Up = "to top",
  }
export function getTrackBackground({
    values,
    colors,
    min,
    max,
    direction = Direction.Right,
    rtl = false,
  }: ITrackBackground) {
    if (rtl && direction === Direction.Right) {
      direction = Direction.Left;
    } else if (rtl && Direction.Left) {
      direction = Direction.Right;
    }
    // sort values ascending
    const progress = values
      .slice(0)
      .sort((a, b) => a - b)
      .map((value) => ((value - min) / (max - min)) * 100);
    const middle = progress.reduce(
      (acc, point, index) =>
        `${acc}, ${colors[index]} ${point}%, ${colors[index + 1]} ${point}%`,
      "",
    );
    return `linear-gradient(${direction}, ${colors[0]} 0%${middle}, ${
      colors[colors.length - 1]
    } 100%)`;
  }

const PriceRange: React.FC<{ rtl: boolean }> = ({ rtl }) => {
  const [values, setValues] = React.useState([100_000, 500_000]);

  console.log(values)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
      className="w-full"
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values: number[]) => {
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "10px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            {/* <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? "#548BF4" : "#CCC",
              }}
            /> */}
          </div>
        )}
      />
      <output id="output" className="text-light-text dark:text-dark-text py-4 md:py-5">
        {formatCurrency(values[0])} - {formatCurrency(values[1])}
      </output>
    </div>
  );
};

export default PriceRange;
