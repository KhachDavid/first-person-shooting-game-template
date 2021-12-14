var xsize = 1100;
var ysize = 700;

var mySliders = {};

var m4 = twgl.m4;
var v3 = twgl.v3;

var sliders = [["walk", 10, 40, 40], ["turn", -4, 4, 0], ["cross", -4, 4, 0]];

var roofVertices = [[0, 0, 0], [5, 0, 0], [5, 2.5, 5], [0, 2.5, 5], [0, 0, 10], [5, 0, 10]];
var roofTriangles = [
    [0, 1, 3], [1, 3, 2],   
    [3, 5, 2], [5, 3, 4],   
    [0, 3, 4],              
    [1, 2, 5],              
    [0, 1, 4], [1, 4, 5]    
];

var buildingVertices1 = [[0, 0, 0], [5, 0, 0], [5, 10, 0], [0, 10, 0], [0, 0, 10], [5, 0, 10], [5, 10, 10], [0, 10, 10]];
var buildingVertices2 = [[0, 0, 0], [5, 0, 0], [5, 5, 0], [0, 5, 0], [0, 0, 10], [5, 0, 10], [5, 5, 10], [0, 5, 10]];
var buildingTriangles = [
    [3, 2, 7], [2, 6, 7],
    [0, 1, 2], [0, 2, 3],
    [1, 5, 2], [5, 2, 6],
    [4, 5, 6], [4, 6, 7],
    [4, 0, 3], [4, 3, 7],
    [0, 1, 4], [1, 4, 5] 
];


var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext('2d');
var fancyTriangle = new FancyTriangle(myCanvas);

roadColorDark = "#A9A9A9"
roadColorLight = "#D3D3D3"
roadColorLight2 = "#DDD"
