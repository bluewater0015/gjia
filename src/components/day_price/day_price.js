//dayPrice
import React,{ Component } from 'react';
export default class DayPrice extends Component{
	constructor(props){
		super(props);
		this.state ={
			
		}
	}
	
	render(){
		return (
			<div className="day-price flex1" style={ this.props.style }>
				<p className="center font_white">{ this.props.type}</p>
				<p className="center font_white font_Size">¥{ this.props.price }</p>
			</div>
		)
	}
}
