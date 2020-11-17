import React, { useState, useEffect } from "react";
import axios from 'axios';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

const ViewuserwmostOrd = () =>{
	
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
	text:"Users Against the No of Orders"},
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
// Change type to "doughnut", "line", "splineArea", etc.
type:"column",
dataPoints:state.data,
	  }
    ]
}
useEffect(() => {
axios.get('http://localhost:3001/viewuserOrd')
.then(
	res=>{
		console.log(res.data.data);
		setState({ ...state, data:[...res.data.data] })
	})
.catch(err=>console.log(err));
 }, []);

	  

return(
<div>
	<CanvasJSChart options = {options}/>
</div>
  );
};

export default ViewuserwmostOrd;

/*
 
class Barchart extends Component {	
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", //"light1", "dark1", "dark2"
			title:{
				text: "Simple Column Chart with Index Labels"
			},
			axisY: {
				includeZero: true
			},
			data: [{
				type: "column", //change type to bar, line, area, pie, etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: [
					{ x: 10, y: 71 },
					{ x: 20, y: 55 },
					{ x: 30, y: 50 },
					{ x: 40, y: 65 },
					{ x: 50, y: 71 },
					{ x: 60, y: 68 },
					{ x: 70, y: 38 },
					{ x: 80, y: 92, indexLabel: "Highest" },
					{ x: 90, y: 54 },
					{ x: 100, y: 60 },
					{ x: 110, y: 21 },
					{ x: 120, y: 49 },
					{ x: 130, y: 36 }
				]
			}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref} 
			/>
			</div>
		);
	}
}
export default Barchart;

*/