//home.js
import './home.css';
import React,{ Component } from 'react';
import Button from '../../components/button/button';
import Title from '../../components/title/title';
import Price from '../../components/price/price';
import DayPrice from '../../components/day_price/day_price';
import Message from '../../components/message/message';
import homebackground from '../../assets/images/homebackground2x.png';
const homeImage = {
	background: `url(${ homebackground })`,
	//下面这种也行
	//backgroundImage: 'url(' + homebackground + ')',
	backgroundSize: '100% 100%'
}
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

	componentDidMount(){
		document.title = '星糖管家';
		this.homeData();
	}

	/**
	 *	@homeData 处理主页面接口请求到的数据
	 *
	 */
	homeData(){
		let url = "admin/alliance/index";
		fetch(url,{
			method:'GET',
			headers:{
				'Authorization':"Bearer "+localStorage.getItem('jwt_token'),
				'Accept': 'application/json',
				'Content-type':'application/json'
			},
			mode: 'cors'
		})
		.then((res)=>{
			return res.json()
		}).then(data=>{
			//console.log('homeData',data);
			this.setState({
				todayPrice: data.todayIncome,
				yesterdayPrice: data.yesterdayIncome,
				averagePrice: data.averageIncome,
				messageNumber: data.messageCount
			})
		}).catch(err=> {
			console.log(err);
		})
	}

	render(){
		return (
			<div className="home" style={ homeImage }>
				<div className="home_running">
					<div className="trade_price">
						<Title title="今日交易流水（元)" style={{ width:'1.35rem',height: '0.22rem',color: '#fff'}}/>
						<Price price={this.state.todayPrice} style={{fontSize: '0.45rem'}}/>
					</div>
					<div className="trade_account center" onClick={this.treadEvent.bind(this)}>
						<Button style={{width: '1.31rem',height: '0.36rem',border: '1px solid #fff',color: '#fff'}} title="交易流水明细" />
					</div>
					<div className="date_price flex">
						<DayPrice type="昨日" price={ this.state.yesterdayPrice} style={{borderRight: '1px solid #fff'}}/>
						<DayPrice type="平均" price={ this.state.averagePrice} />
					</div>
				</div>
				<div className="accout">
					<div className="accout_message flex padding-top20">
						<Message
							onClick={() => this.props.history.push('/billing_Report')}
							src={ require('../../assets/images/account_report.png') }
							content="账单报告"
							style={{ borderRight: '1px solid #F0EFEF'}}
							fontSize = {{ fontSize: '0.17rem'}}
						/>
						<Message
							onClick={() => this.props.history.push('/news_Inform')}
							src={ require('../../assets/images/news.png') }
							content="消息通知"
							fontSize = {{ fontSize: '0.17rem'}}
						/>
					</div>
					<div className="accout_message flex padding-top20">
						<Message
							onClick={() => this.props.history.push('/billitemized')}
							src={ require('../../assets/images/find.jpg') }
							style={{ borderRight: '1px solid #F0EFEF'}}
							content="营销收入"
							fontSize = {{ fontSize: '0.17rem'}}
						/>
						<Message fontSize = {{ fontSize: '0.17rem'}}/>
					</div>
				</div>
			</div>
        )
    }

    /**
     *	@treadEvent 点击交易流水明细按钮跳转到交易流水页
     */
    treadEvent(index){
        let path = {
            pathname: '/billitemized',
            query:{home:true},
        }
        this.props.history.push(path);
    }
}
