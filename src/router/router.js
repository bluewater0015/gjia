//router.js
import React,{ Component } from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import createBrowserHistory from 'history';
import Login from '../pages/login/login';
import Home from '../pages/home/home';
import Income from '../pages/income_detail/income_detail';
import Calender from '../pages/calender/calender';
import billItemiezd from '../pages/bill_itemized/bill_itemized'
import Billing from '../pages/billing_report/billing_report';
import Report from '../pages/report_detail/report_detail';
import Inform from '../pages/news_inform/news_inform';
import News from '../pages/news_detail/news_detail';
import NoFound from '../pages/no_found/no_found'

const history = createBrowserHistory;
export default class RouterMap extends Component{
	constructor(props){
		super(props);
		this.state = {
			
		}
	}
	render(){
		return (
			<Router history={ history } >
				<div style={{ width: '100%',height: '100%'}}>
					<Route exact path="/" component={ Login } />
					<Route path="/home" component={ Home } />
					<Route path="/billitemized" component={ billItemiezd } />
					<Route path="/calender" component={ Calender } />
					<Route path="/billing_report" component={ Billing } />
					<Route path="/income_detail" component={ Income } />
					<Route path="/report_detail/:id" component={ Report } />
					<Route path="/news_inform" component={ Inform } />
					<Route path="/news_detail/:id" component={ News } />
					<Route path="/no_found" component={ NoFound } />
				</div>
			</Router>
		)
	}
}
