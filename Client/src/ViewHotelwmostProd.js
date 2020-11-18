import React, { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

const ViewHotelwmostProd = () =>{
const [state,setState] = React.useState({data:[],loading:false});

const options ={
	interactivityEnabled:true,	
	zoomEnabled: true,
	animationDuration:2000,
	animationEnabled: true,
	exportEnabled: true,
	theme: "dark1", //"light1", "light2" , "dark1", "dark2"
title:{
	text:"Hotels against How many Products they Offer"},
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
axios.get('http://localhost:3001/viewhotel')
        .then(
			res => {
				console.log(res.data.data);
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

export default ViewHotelwmostProd;