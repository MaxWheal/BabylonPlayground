'use strict'

const earcut = require('earcut');
window.earcut = earcut;
const BABYLON = require('babylonjs');

const buildWalls = require('./buildRoom.js');

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
  var roomCorners = [];
  roomCorners.push(new BABYLON.Vector2(   0,    0));
  roomCorners.push(new BABYLON.Vector2(4000,    0));
  roomCorners.push(new BABYLON.Vector2(4000, 2000));
  roomCorners.push(new BABYLON.Vector2(5000, 2000));
  roomCorners.push(new BABYLON.Vector2(5000, 3000));
  roomCorners.push(new BABYLON.Vector2(   0, 3000));
  
  var scene = new BABYLON.Scene(engine);

  var xMin = Infinity;
  var xMax = -Infinity;

  roomCorners.forEach(element => {
    xMin = xMin < element.x ? xMin : element.x;
    xMax = xMax > element.x ? xMax : element.x;
  })

  var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI, 1.4, 9000, new BABYLON.Vector3(0, 1200, -(xMin + xMax)/2), scene);
  camera.attachControl(canvas, true);
  camera.maxZ = 100000;
  camera.wheelDeltaPercentage = 0.01;
  camera.zoomToMouseLocation = true;
  camera.panningSensibility = 1;

  new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(5, 10, 0), scene);

  buildWalls(roomCorners, 2500, scene);

  return scene;
}

const sceneToRender = createScene();
engine.runRenderLoop(function () {
  sceneToRender.render();
});