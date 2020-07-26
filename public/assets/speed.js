$(document).ready(function () {

  var speed;

  $.ajax({
    type: 'POST',
    url: '/home',
    data: speed,
    success: function (data) {
      const obj = JSON.parse(data);
      gauge.set(obj.first);
      gauge1.set(obj.second);
      gauge2.set(obj.third);


    }
  });
});

var opts = {
  lines: 80, // smoother
  angle: 0.15, // not sure
  lineWidth: 0.44, // height of the reading
  pointer: {
    length: 0.9,
    strokeWidth: 0.035, //pointer width
    color: '#000000'
  },
  staticLabels: {
    font: "10px sans-serif",  // Specifies font
    labels: [160, 175, 180, 185, 200],  // Print labels at these values
    color: "#000000",  // Optional: Label text color
    fractionDigits: 0  // Optional: Numerical precision. 0=round off.
  },
  limitMax: 'false',
  staticZones: [
    { strokeStyle: "#F03E3E", min: 145, max: 160 }, // Red from 100 to 130
    { strokeStyle: "#FFDD00", min: 160, max: 175 }, // Yellow
    { strokeStyle: "#30B32D", min: 175, max: 185 }, // Green
    { strokeStyle: "#FFDD00", min: 185, max: 200 }, // Yellow
    { strokeStyle: "#F03E3E", min: 200, max: 215 }  // Red
  ], // division for color change

  strokeColor: '#E0E0E0',
  generateGradient: false

};
var target = document.getElementById('foo');
var gauge = new Gauge(target).setOptions(opts);
gauge.minValue = 145
gauge.maxValue = 215; // upper limit
gauge.animationSpeed = 10;




var opts1 = {
  lines: 80, // smoother
  angle: 0.15, // not sure
  lineWidth: 0.44, // height of the reading
  pointer: {
    length: 0.9,
    strokeWidth: 0.035, //pointer width
    color: '#000000'
  },
  staticLabels: {
    font: "15px sans-serif",  // Specifies font
    labels: [5, 15],  // Print labels at these values
    color: "#000000",  // Optional: Label text color
    fractionDigits: 0  // Optional: Numerical precision. 0=round off.
  },
  limitMax: 'false',
  percentColors: [
    [0.17, "#ff0000"],
    [0.50, "#f9c802"],
    [1, "#008000"],
  ],
  strokeColor: '#E0E0E0',
  generateGradient: false

};
var target = document.getElementById('foo1');
var gauge1 = new Gauge(target).setOptions(opts1);
gauge1.maxValue = 30; // upper limit
gauge1.animationSpeed = 10;


var opts2 = {
  lines: 80, // smoother
  angle: 0.15, // not sure
  lineWidth: 0.44, // height of the reading
  pointer: {
    length: 0.9,
    strokeWidth: 0.035, //pointer width
    color: '#000000'
  },
  staticLabels: {
    font: "15px sans-serif",  // Specifies font
    labels: [5, 15],  // Print labels at these values
    color: "#000000",  // Optional: Label text color
    fractionDigits: 0  // Optional: Numerical precision. 0=round off.
  },
  limitMax: 'false',
  percentColors: [
    [0.17, "#ff0000"],
    [0.50, "#f9c802"],
    [1, "#008000"],
  ],
  strokeColor: '#E0E0E0',
  generateGradient: false

};
var target = document.getElementById('foo2');
var gauge2 = new Gauge(target).setOptions(opts2);
gauge2.maxValue = 30; // upper limit
gauge2.animationSpeed = 10;

