//Main.js
import React,{ Component } from 'react';
import RouterMap from '../router/router';

export default class Main extends Component{
	constructor(props){
		super(props);
		this.state = {
			
		}
	}
	
	render(){
		return (
			<div className="main">
				<RouterMap />
			</div>
		)
	}
}