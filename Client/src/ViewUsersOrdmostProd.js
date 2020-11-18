import React, { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

const ViewUsersOrdMostProd = () =>
{
	
const [state,setState] = useState ({data: [],loading:false});
const [role, setRole] = useState(localStorage.getItem('role'));
const options = {

	interactivityEnabled:true,	
	zoomEnabled: true,
	animationDuration:2000,
	animationEnabled: true,
	exportEnabled: true,
	theme: "dark1", //"light1", "light2" , "dark1", "dark2"
	title:{
	text:"Users Against the No of Products Ordered"},
	indexLabel: "{y}",
	axisY: {
				includeZero: true
			},
	axisX : {
				includeZero : true
	},
			indexLabelFontColor: "#5A5757",
			indexLabelPlacement: "inside",data: [
      {
type:"column",
dataPoints:state.data,
	  }
	]
}
useEffect(() => {
	axios.get('http://localhost:3001/viewuserProd')
	.then(
		res=>{
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
export default ViewUsersOrdMostProd;