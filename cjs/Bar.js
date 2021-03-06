'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-312f038a.js');
var React = require('react');
var React__default = _interopDefault(React);
var d3Scale = require('d3-scale');
var d3Selection = require('d3-selection');
var identity = _interopDefault(require('ramda/src/identity'));
var __chunk_2 = require('./chunk-ec892a96.js');
require('react-dom');
require('d3-shape');
require('ramda/src/compose');
require('ramda/src/groupBy');
require('ramda/src/prop');
require('ramda/src/toPairs');
require('d3-axis');
require('ramda/src/head');
require('ramda/src/max');
require('ramda/src/min');
require('ramda/src/find');
require('ramda/src/filter');
require('ramda/src/sum');
require('ramda/src/map');
require('ramda/src/reduce');
require('ramda/src/values');
require('ramda/src/uniq');
require('ramda/src/always');
require('ramda/src/complement');
require('ramda/src/addIndex');
require('ramda/src/mergeAll');
require('ramda/src/cond');
require('ramda/src/equals');
require('ramda/src/T');
require('ramda/src/flatten');
require('ramda/src/sortBy');
require('ramda/src/splitEvery');
require('styled-components');
require('d3-time-format');
require('ramda/src/last');

var Bar = function Bar(_ref) {
  var _ref$aspectRatio = _ref.aspectRatio,
      aspectRatio = _ref$aspectRatio === void 0 ? __chunk_2.ASPECT_RATIO : _ref$aspectRatio,
      chartData = _ref.data,
      dataSource = _ref.dataSource,
      _ref$dateFormat = _ref.dateFormat,
      dateFormat = _ref$dateFormat === void 0 ? __chunk_2.TIME_FORMAT : _ref$dateFormat,
      grid = _ref.grid,
      _ref$height = _ref.height,
      graphHeight = _ref$height === void 0 ? undefined : _ref$height,
      horizontal = _ref.horizontal,
      _ref$margin = _ref.margin,
      margin = _ref$margin === void 0 ? __chunk_2.MARGIN : _ref$margin,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? identity : _ref$onClick,
      _ref$onMouseEnter = _ref.onMouseEnter,
      onMouseEnter = _ref$onMouseEnter === void 0 ? identity : _ref$onMouseEnter,
      _ref$onMouseLeave = _ref.onMouseLeave,
      onMouseLeave = _ref$onMouseLeave === void 0 ? identity : _ref$onMouseLeave,
      outlinedStyle = _ref.outlinedStyle,
      _ref$padding = _ref.padding,
      xScalePadding = _ref$padding === void 0 ? __chunk_2.SCALE_PADDING : _ref$padding,
      responsive = _ref.responsive,
      staticTooltip = _ref.staticTooltip,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? __chunk_2.THEME : _ref$theme,
      title = _ref.title,
      tooltip = _ref.tooltip,
      visibleTicks = _ref.visibleTicks,
      _ref$width = _ref.width,
      graphWidth = _ref$width === void 0 ? undefined : _ref$width,
      xAxisChartLabel = _ref.xAxisChartLabel,
      xAxisLabelRotation = _ref.xAxisLabelRotation,
      _ref$xAxisLabelRotati = _ref.xAxisLabelRotationValue,
      xAxisLabelRotationValue = _ref$xAxisLabelRotati === void 0 ? __chunk_2.ROTATION : _ref$xAxisLabelRotati,
      _ref$xAxisTicks = _ref.xAxisTicks,
      xAxisTicks = _ref$xAxisTicks === void 0 ? __chunk_2.X_TICKS : _ref$xAxisTicks,
      yAxisChartLabel = _ref.yAxisChartLabel,
      _ref$yAxisTicks = _ref.yAxisTicks,
      yAxisTicks = _ref$yAxisTicks === void 0 ? __chunk_2.Y_TICKS : _ref$yAxisTicks;
  var svgRef = React.useRef();

  var _useState = React.useState(__chunk_2.SIZE),
      _useState2 = __chunk_1._slicedToArray(_useState, 2),
      _useState2$ = _useState2[0],
      width = _useState2$.width,
      height = _useState2$.height,
      setSize = _useState2[1];

  var _setupData = __chunk_2.setupData(chartData),
      _setupData2 = __chunk_1._slicedToArray(_setupData, 2),
      isDates = _setupData2[0],
      data = _setupData2[1];

  var xScale = d3Scale.scaleBand().domain(data.map(function (_ref2) {
    var name = _ref2.name;
    return name;
  })).range([0, width]).padding(xScalePadding);
  var yScale = d3Scale.scaleLinear().domain([0, __chunk_2.getMax(data.map(function (_ref3) {
    var value = _ref3.value;
    return value;
  }))]).range([height, 0]);
  __chunk_2.useResize({
    aspectRatio: aspectRatio,
    graphHeight: graphHeight,
    graphWidth: graphWidth,
    margin: margin,
    responsive: responsive,
    setSize: setSize,
    svgRef: svgRef
  });
  return React__default.createElement(__chunk_2.GraphContext.Provider, {
    value: {
      dateFormat: dateFormat,
      margin: margin,
      node: svgRef.current,
      outlinedStyle: outlinedStyle,
      staticTooltip: staticTooltip,
      visibleTicks: visibleTicks,
      xAxisLabelRotation: xAxisLabelRotation,
      xAxisLabelRotationValue: xAxisLabelRotationValue
    }
  }, React__default.createElement(__chunk_2.SVG, {
    size: {
      width: graphWidth || width + margin.left + margin.right,
      height: graphHeight || height + margin.top + margin.bottom
    },
    ref: svgRef
  }, React__default.createElement(__chunk_2.MainGroup, {
    margin: margin
  }, grid && React__default.createElement(__chunk_2.Grid, {
    ref: function ref(node) {
      return d3Selection.select(node).call(__chunk_2.drawGrid(horizontal, xScale, height, yScale, width, xAxisTicks, yAxisTicks));
    }
  }), title && React__default.createElement(__chunk_2.Title, {
    margin: margin,
    width: width,
    height: height
  }, title), xAxisChartLabel && React__default.createElement(__chunk_2.Label, {
    axis: "x",
    margin: margin,
    width: width,
    height: height
  }, xAxisChartLabel), yAxisChartLabel && React__default.createElement(__chunk_2.Label, {
    axis: "y",
    margin: margin,
    width: width,
    height: height
  }, yAxisChartLabel), dataSource && React__default.createElement(__chunk_2.DataSource, {
    dataSource: dataSource,
    height: height,
    margin: margin,
    width: width
  }), React__default.createElement(__chunk_2.DataGroup, null, data.map(function (_ref4, idx) {
    var name = _ref4.name,
        value = _ref4.value;
    return React__default.createElement(__chunk_2.BarDatum, {
      key: idx,
      datum: {
        name: name,
        value: value
      },
      color: __chunk_2.getBaseColor(theme),
      x: xScale(name),
      y: yScale(value),
      width: xScale.bandwidth(),
      height: height - yScale(value),
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      tooltip: tooltip
    });
  })), React__default.createElement(__chunk_2.Axis, {
    axis: "x",
    axisTicks: xAxisTicks,
    orientation: "bottom",
    position: {
      x: 0,
      y: height
    },
    scale: xScale,
    toDate: isDates
  }), React__default.createElement(__chunk_2.Axis, {
    axis: "y",
    axisTicks: yAxisTicks,
    orientation: "left",
    scale: yScale
  }))));
};

exports.default = Bar;
//# sourceMappingURL=Bar.js.map
