//report_Detail.js
import "./report_detail.css";
import React,{ Component } from 'react';
export default class Report extends Component{
	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentDidMount(){
		document.title = '账单报告详情';
		this.reportDetailData();
	}
	/**
	 *	@reportDetailData 处理报告详情页接口数据
	 */
	reportDetailData(){
		let id = this.props.match.params.id;
		let url = "/admin/alliance/reports/" + id;
		fetch(url,{
			method:'GET',
			headers:{
				'Authorization':"Bearer "+localStorage.getItem('jwt_token'),
				'Accept': 'application/json',
				'Content-type':'application/json'
			},
			mode: 'cors'
		}).then((res)=>{
			return res.json()
		}).then(data=>{
			//console.log('reportDetailData',data);
			this.setState({
				acountDate: data.duration,
				acountGetFormMachine: data.machineIncome.toFixed(2),
				acountGetFromMe: data.myIncome.toFixed(2),
				ServiceCharge: data.charge.toFixed(2),
				actualArrival: data.actualIncome.toFixed(2)
			})
		}).catch(err=> {
			console.log(err);
		})
	}
	render(){
		return (
			<div className="report_Detail">
				<div className="report_date">
					<p className="center date_scope">对账日期范围</p>
					<p className="center date_now">{ this.state.acountDate }</p>
				</div>
				<ul className="account_list">
					<li className="item item_border">
						<span className="left item_name">机器入账</span>
						<span className="right item_price">¥{ this.state.acountGetFormMachine }</span>
					</li>
					<li className="item item_border">
						<span className="left item_name">我的收益</span>
						<span className="right item_price">¥{ this.state.acountGetFromMe }</span>
					</li>
					<li className="item item_border">
						<span className="left item_name">手续费</span>
						<span className="right item_price">¥{ this.state.ServiceCharge}</span>
					</li>
					<li className="item">
						<span className="left item_name reality">实际到账</span>
						<span className="right item_price reality_price">¥{ this.state.actualArrival }</span>
					</li>
				</ul>
			</div>
		)
	}
}