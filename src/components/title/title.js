//title.js
import React,{ Component } from 'react';
import './title.css';
export default class NoFound extends Component{
	constructor(props){
		super(props);
		this.state ={
			
		}
	}
	
	render(){
		return (
			<div className="title center font_color">
				<p  style={ this.props.style }>{ this.props.title || '默认标题' }</p>
			</div>
		)
	}
}