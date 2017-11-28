//button.js
import React,{ Component } from 'react';
import './button.css';
export default class Button extends Component{
	constructor(props){
		super(props);
		this.state ={
			
		}
	}
	
	render(){
		return (
			<div onClick={() => this.props.onClick && this.props.onClick()} className="button center" style={this.props.style}>
				{ this.props.title || '默认按钮' }
			</div>
		)
	}
}