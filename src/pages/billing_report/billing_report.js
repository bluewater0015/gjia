//billing_Report.js
import './billing_report.css';
import React,{ Component } from 'react';
export default class Billing extends Component{
	constructor(props){
		super(props);
		this.state = {
			acountList: []
		}
	}
	componentDidMount(){
		document.title = '账单报告';
		this.billingReportList();
	}
	/**
	 *	@billingReportList 处理账单报告接口请求到的数据
	 *
	 */
	billingReportList(){
		let url = "admin/alliance/reports";
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
			//console.log('billingReportList',data);
			this.setState({
				acountList: data
			})
		}).catch(err=> {
			console.log(err);
		})
	}
	gotoReportDetail(index){
		const id = this.state.acountList[index].id;
		if(id){
			this.props.history.push(`/report_Detail/${id}`);
		}
	}
	render(){
		return (
			<div className="billing_container">
				<ul className="billing">
					{
						this.state.acountList.map((item,index) => {
							return (
								<li 
									key={index} 
									className="bill_item marginTop"
									onClick={() => {this.gotoReportDetail(index)}}
								>
									<div className="bill_left">
										<div className="date_year">
											<p className="date">{item.duration}</p>
											<p className="year">{item.year}年</p>
										</div>
									</div>
									<div className="bill_right align_items flex_end">
										<p className="price">¥{item.price.toFixed(2)}</p>
									</div>
								</li>
							)
						})
					}
					
				</ul>
				<div className="more center marginTop">
					--没有更多内容了--
				</div>
			</div>
		)
	}
}