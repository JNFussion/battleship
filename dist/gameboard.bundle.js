"use strict";(self.webpackChunkbattleship=self.webpackChunkbattleship||[]).push([[359],{9443:(r,t,o)=>{o.d(t,{O:()=>i,E:()=>e});var i={PJ1:"player1",PJ2:"player2"};Object.freeze(i);var e={HORIZONTAL:"horizontal",VERTICAL:"vertical"};Object.freeze(e)},4937:(r,t,o)=>{o.d(t,{Z:()=>e});var i=o(9443);const e=function(){var r=Array(10).fill().map((function(){return Array(10).fill()})),t=[];return{grid:r,getCell:function(o){return t[r[o[0]][o[1]]]},placeShip:function(o,e,n){if(!Array.isArray(o))throw Error("Invalid starCoords value");if(o[0]<0||o[0]>9)throw Error("Row start coord out of grid");if(o[1]<0||o[1]>9)throw Error("Column start coord out of grid");if(e!==i.E.HORIZONTAL&&e!==i.E.VERTICAL)throw Error("Invalid direction value");if(!n)throw Error("Missing ship object");if(e===i.E.HORIZONTAL&&o[1]+n.size>10)throw Error("Ship overflow grid");if(e===i.E.VERTICAL&&o[0]+n.size>10)throw Error("Ship overflow grid");for(var a=0,s=e===i.E.HORIZONTAL?o[1]:o[0];a<n.size;a+=1,s+=1){var u=e===i.E.HORIZONTAL?s:o[1],f=e===i.E.HORIZONTAL?o[0]:s;if(void 0!==r[f][u])return-1;r[f][u]=t.length}t.push(function(r,t,o){return{startCoords:r,direction:t,ship:o}}(o,e,n))},receiveAttack:function(o){if(void 0===r[o[0]][o[1]])return r[o[0]][o[1]]="W",!1;if("W"===r[o[0]][o[1]])return!1;var i=t[r[o[0]][o[1]]],e=Math.sqrt(Math.pow(o[0]-i.startCoords[0],2)+Math.pow(o[1]-i.startCoords[1],2));return i.ship.hit(e)},allAreSunk:function(){return t.every((function(r){return r.ship.isSunk()}))}}}}},r=>{r(r.s=4937)}]);