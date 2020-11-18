import React, { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

const ViewmostOrdProd = () =>{
const [state,setState] = useState({data:[],loading:false});
const options ={
	interactivityEnabled:true,	
	zoomEnabled: true,
	animationDuration:2000,
	animationEnabled: true,
	exportEnabled: true,
	theme: "dark1", //"light1", "light2" , "dark1", "dark2"
title:{
	text:"Products Against the No of Orders for Each"},
	indexLabel: "{y}",
	axisY: {
				includeZero: true
			},
	axisX : {
				includeZero : true
	},
			indexLabelFontColor: "#5A5757",
			indexLabelPlacement: "inside",
data: [
	{
// Change tpe to "doughnut", "line", "splineArea", etc.
type:"column",
dataPoints:[...state.data],
	}
    ]
}

useEffect(() => {
axios.get('http://localhost:3001/viewprod')
        .then(
			res => {
				console.log(res);
				setState({ ...state, data:[...res.data.data] })
			})
        .catch(err=>console.log(err));
		 }, []);
	  

return(
<div>
	<CanvasJSChart options = {options} />
</div>
  );
};

export default ViewmostOrdProd;
/*
import React, { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

const ViewmostOrdProd = () =>
{
const [state, setState] = useState({data: [],loading:false});
const [role, setRole] = useState(localStorage.getItem('role'));
const options = {
	interactivityEnabled:true,	
	zoomEnabled: true,
	animationDuration:2000,
	animationEnabled: true,
	exportEnabled: true,
	theme: "dark2", //"light1", "light2" , "dark1", "dark2"
	title:{
	text:"Products Against the No of Orders for Each"},
	indexLabel: "{y}",
	legend : {},
	toolTip: {},
	axisY: {
				includeZero: true
			},
	axisX : {
				includeZero : true
	},
			indexLabelFontColor: "#5A5757",
			indexLabelPlacement: "inside",
data: [
      {
// Change type to "doughnut", "line", "splineArea", etc.
type:"column",
dataPoints:state.data,
	  }
    ]
}
useEffect(() => {
axios.get('http://localhost:3001/viewprod')
        .then(
			res=> {console.log(res.data.data);setState({ ...state, data:res.data.data })})
        .catch(err=>console.log(err))
		}, []);
	  

return(
<div>
	<CanvasJSChart options = {options} />
</div>
  );
};

export default ViewmostOrdProd;
*/