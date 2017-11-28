import React,{ Component } from 'react';
import './input.css';

export default class Input extends Component{
	constructor(props){
		super(props);
		this.state ={
			
		}
	}
	
	dealInputData(e){
		let value = e.target.value;
		this.props.onChange && this.props.onChange(value);
	}
	render(){
		return (
			<div className="input space_around">
				<input 
					onChange={(e)=>this.dealInputData(e)} 
					style={this.props.style} 
					className="input_value"
					placeholder={ this.props.value }
					type ={ this.props.type }
					value={this.props.myvalue || ''}
				/>
			</div>
		)
	}
}