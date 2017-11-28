//news_Detail.js
import React,{ Component } from 'react';
import './news_detail.css';
export default class News extends Component{
	constructor(props){
		super(props);
		this.state = {
			
		}
	}
	componentDidMount(){
		document.title = '机器警报详情';
		this.newsDetailData();
	}
	/**
	 *	@newsDetailData 对请求到对应id数据进行处理
	 *
	 */
	newsDetailData(){
		let id = this.props.match.params.id;
		let url = "/admin/alliance/messages/" + id;
		fetch(url,{
			method:'GET',
			headers:{
				'Authorization':"Bearer "+localStorage.getItem('jwt_token'),
				'Accept': 'application/json',
				'Content-type':'application/json'
			},
			mode: 'cors'
		}).then(res=>{
			return res.json()
		}).then(data=>{
			//console.log('newsDetailData',data);
			this.setState({
				machine_code: data.sn,
				time: data.createdTime,
				location: data.address,
				content: data.content,
				description: data.description
			})
		}).catch(err=> {
			console.log(err);
		})
	}
	render(){
		return (
			<div className="news_Detail">
				<div className="news_container">
					<ul className="news_list">
						<li className="alarm_date news_border_bottom">
							<span>警报时间：</span>
							<span>{this.state.time}</span>
						</li>
						<li className="stage_code news_border_bottom">
							<span>点位：</span>
							<span>{this.state.location}</span>
						</li>
						<li className="machine_code news_border_bottom">
							<span>机码：</span>
							<span>{this.state.machine_code}</span>
						</li>
						<li className="alarm_content">
							<span>
								警报内容：
							</span>
							<span>
								{this.state.content}
							</span>
							<p className="tips_content">
								{this.state.description}
							</p>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}