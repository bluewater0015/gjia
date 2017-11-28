import React,{ Component } from 'react';
import './message.css';

export default class Message extends Component{
	constructor(props){
		super(props);
		this.state ={
			
		}
	}
	
	render(){
		return (
			<div 
				onClick={()=> this.props.onClick && this.props.onClick()}
				className="message flex1"
				style={this.props.style}
				>
				<p className="center" style={this.props.style1}>{this.props.number}</p>
				<p className="center marginTop"><img alt="" className='img' src={ this.props.src } /></p>
				<p style={this.props.fontSize} className="center marginTop" >{ this.props.content }</p>
			</div>
		)
	}
}
