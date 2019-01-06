import React, { useState, useRef, useEffect } from 'react';
import head from 'ramda/src/head';
import identity from 'ramda/src/identity';
import { select as d3Select } from 'd3-selection';
import { line as d3Line } from 'd3-shape';
import { max as d3Max } from 'd3-array';
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis';
import { Axis, StackedBarDatum, Grid, LineDatum, SVG } from './styled';
import {
  allDate,
  buildStack,
  drawGrid,
  extendXPath,
  getId,
  getLineDataForKeys,
  getMaximumValues,
  getSize,
  getXScale,
  getYScale,
  palette,
  rotateXLabels,
  setLineType,
} from '../utils';
import {
  SCALE_TIME,
  SCALE_BAND,
  SCALE_LINEAR,
  SECONDARY_THEME,
  THEME,
  TICKS,
  LINE_TYPE,
  MARGIN,
  ASPECT_RATIO,
  SIZE,
} from '../utils/constants';

const BarLine = ({
  aspectRatio = ASPECT_RATIO,
  data,
  grid,
  horizontal,
  margin = MARGIN,
  onClick = identity,
  onMouseEnter = identity,
  onMouseLeave = identity,
  stackedKeys = [],
  lineKeys = [],
  lineType = LINE_TYPE,
  lineTypeOption = null,
  width: svgWidth = undefined,
  height: svgHeight = undefined,
  theme = THEME,
  ticks = TICKS,
  secondaryTheme = SECONDARY_THEME,
  xAxisLabelRotation,
  xAxisLabelRotationValue = -50,
}) => {
  const svgRef = useRef();
  const [{ width, height, isSizeSet }, setSize] = useState(SIZE);
  const isNamesDate = allDate(data.map(({ name }) => name));
  const [id] = useState(getId('bar-line'));

  const xScale = getXScale(
    isNamesDate ? SCALE_TIME : SCALE_BAND,
    data,
    width,
    true
  );
  const yScale = getYScale(
    SCALE_LINEAR,
    d3Max(getMaximumValues(stackedKeys, data)),
    height
  );

  const stack = buildStack(stackedKeys);
  const line = d3Line()
    .x(({ name }) =>
      isNamesDate
        ? xScale(new Date(name))
        : xScale(name) + xScale.bandwidth() / 2
    )
    .y(({ value }) => yScale(value))
    .curve(setLineType(lineType, lineTypeOption));

  const lineData = getLineDataForKeys(lineKeys, data);

  const handleResize = () => {
    const offsetWidth = svgRef.current.parentElement.offsetWidth;
    if ((svgWidth || svgHeight) && !isSizeSet) {
      setSize({
        ...getSize(svgWidth, svgHeight, margin, aspectRatio),
        isSizeSet: true,
      });
    } else if (offsetWidth !== svgWidth - (margin.left + margin.right)) {
      setSize({
        ...getSize(offsetWidth, undefined, margin, aspectRatio),
        isSizeSet: true,
      });
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <SVG
      ref={svgRef}
      identifier={id}
      size={{
        width: svgWidth || width + margin.left + margin.right,
        height: svgHeight || height + margin.top + margin.bottom,
      }}
    >
      <g
        className="container"
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        {grid && (
          <Grid
            ref={node =>
              d3Select(node).call(
                drawGrid(horizontal, xScale, height, yScale, width, ticks)
              )
            }
          />
        )}

        <Axis
          axis="x"
          position={{ x: 0, y: height }}
          ref={node => {
            d3Select(node).call(d3AxisBottom(xScale));
            isNamesDate && extendXPath(id, width);
            xAxisLabelRotation && rotateXLabels(id, xAxisLabelRotationValue);
          }}
        />
        <Axis
          axis="y"
          ref={node => d3Select(node).call(d3AxisLeft(yScale).ticks(ticks))}
        />

        <StackedBarDatum
          data={data}
          series={stack(data)}
          isNamesDate={isNamesDate}
          onClick={onClick}
          theme={theme}
          x={xScale}
          y={yScale}
          width={width}
          height={height}
        />

        {lineData.map((datum, idx) => (
          <g className={`${head(datum)['key']}-layer`} key={idx}>
            <LineDatum
              data={datum}
              d={line(datum)}
              isNamesDate={isNamesDate}
              xScale={xScale}
              yScale={yScale}
              color={palette.themes[secondaryTheme].base[idx]}
            />
          </g>
        ))}
      </g>
    </SVG>
  );
};

export default BarLine;
