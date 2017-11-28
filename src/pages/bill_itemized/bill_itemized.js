import React, {Component} from 'react'
import billbg from './images/billbg.png'
import 'whatwg-fetch'
import queryString from 'query-string'
import './bill_itemized.css'

const bg = {
    backgroundImage: `url(${billbg})`,
    backgroundSize: '100% 100%',
    color: '#fff',
    textAlign: 'center',
    height: '1.6rem'
};
var selectDateTime = [];

class billItemiezd extends Component {
    constructor(props) {
        super(props)
        console.log('-------营收页面的信息------');
        //属性用于传值，状态用于更改页面
        console.log('营收页面的props',props)
        const selectDate = props.location.query;

        //console.log('selectDate',selectDate); 
        //selectDate Thu Nov 09 2017 00:00:00 GMT+0800 (CST)
        let dateTime;
        //selectDate.home ？ 应该是一个表标示的作用吧
        if (selectDate !== undefined && !selectDate.home) {
            dateTime = selectDate
        } else if( selectDate !== undefined && selectDate.home){
            dateTime = new Date()
        }else if(selectDateTime.length !== 0){
            dateTime = selectDateTime
        } else {
            dateTime = new Date()
        }

        //tag 标示的作用 给子页面一个标记
        const tag = props.location.tag;
        //页面第一次进来没有选择日期，当然tag为underfined
        console.log('标示选择开始日期还是结束日期的tag',tag);

        var startTime,endTime;

        //选择开始日期
        if(tag == 1){
            startTime = props.location.query;
            //结束时间，默认上次选择的时间
            endTime = localStorage.getItem('end');
        //选择结束日期
        } else if(tag == 2){
            //开始时间，默认上次选择的
            startTime = localStorage.getItem('start');
            endTime = props.location.query;
        }
        

        console.log('------开始时间------结束时间------');

        //开始时间： Tue Nov 14 2017 00:00:00 GMT+0800 (CST)
        console.log('开始时间：',startTime);
        //结束时间： Tue Nov 21 2017 00:00:00 GMT+0800 (CST)
        console.log('结束时间：',endTime);

        //我选择开始时间的类型 是object，而结束时间的类型是string
        //我选择结束时间的类型 是object,而开始时间的类型是string
        //出现上面这种情况是为何？
        //因为string类型是从localStorage中取出来的
        console.log('typeof startTime',typeof startTime);
        console.log('typeof endTime',typeof endTime);


        if(typeof startTime == 'string'){
            console.log('startTime是什么',startTime);
            startTime = new Date(startTime);
            //console.log('打印开始时间',startTime);
        }
        if(typeof endTime == 'string'){
            endTime = new Date(endTime);
        }

        this.state = {
            dateTime: dateTime,
            clickIndex: -1,
            fromHome:selectDate && selectDate.home?selectDate.home:false,
            startTime: startTime || new Date(new Date().setDate(1)),
            endTime: endTime || new Date(),
            tipModel: false
        }

    }
    componentWillMount(){
        
    }
    componentDidMount() {
        document.title = '交易账单'
        //this.getData(this.state.dateTime,this.state.fromHome);
        //this.getMonthWeekDay(this.state.dateTime)
        //this.getData(this.state.startTime);

        //请求接口得到数据
        //var _this = this;
        this.fetchData(this.state.startTime,this.state.endTime);
        //1 代表开始的时间
        this.getMonthWeekDays(this.state.startTime,1);
        //2 代表结束的时间
        this.getMonthWeekDays(this.state.endTime,2);
    }
    //请求接口，得到数据
    fetchData(startTime,endTime){
        //console.log('this',this);
        console.log('请求数据之前得到开始时间',startTime);
        console.log('请求数据之前得到的结束时间：',endTime);
        let startStamp = startTime.getTime();
        let endStamp = endTime.getTime();

        if(startStamp > endStamp) {
            //alert('开始时间不能大于结束时间1');
            // this.setState({
            //     tipModel: true,
            // })
            // console.log('startStamp',this);
            // this.setState({
            //     startTime: this.state.endTime
            // },() => {
            //     this.getMonthWeekDays(startTime,1);
            // })
            // console.log('--startTime-',this.state.startTime);
        }else {
            let url = '/admin/alliance/revenue/query',param;
            param = {
                startDate: startTime.getFullYear()+"-"+(startTime.getMonth() + 1)+"-"+startTime.getDate(),
                endDate: endTime.getFullYear()+"-"+(endTime.getMonth() + 1)+"-"+endTime.getDate(),
            }
            const token = localStorage.getItem('jwt_token');
            fetch(`${url}?${queryString.stringify(param)}`,
            {
                method: 'GET',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }).then((res)=>{
                if(res.status !== 200){
                    console.log("您当前无法获取机器的营业收入")
                }else{
                    return res.json()
                }
            }).then((res)=>{
                console.log('请求到的日期数据：',res);
                this.setState({
                    machineData:res
                })
            })
        }

        
    }

    //请求接口，获得对应天的数据
    getData(dateTime,homefalse){
        let url = '/admin/alliance/transaction',param;
        if(!homefalse){
            param = {date:dateTime.getFullYear()+"-"+(dateTime.getMonth() + 1)+"-"+dateTime.getDate()}
        }else{
            param ={}
        }
        const token = localStorage.getItem('jwt_token');
        fetch(`${url}?${queryString.stringify(param)}`,{headers:{
            'Authorization':`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            mode: 'cors'}).then((res)=>{
            if(res.status !== 200){
                console.log("您当前无法获取机器的营业收入")
            }else{
                return res.json()
            }
        }).then((res)=>{
            console.log('之前请求到的数据：',res);
            this.setState({
                machineData:res
            })
        })
    }
    /*需求：点击查询时段---> 进入日期选择页面-->选择日期--->直接跳到结束日期页
     *--->返回营收查询页面
     *
     */
    //选择开始日期
    toCalender() {
        document.title = '请选择开始日期';
        let startStamp = this.state.startTime.getTime();
        let endStamp = this.state.endTime.getTime();
        if(startStamp > endStamp) {
            let path = {
                pathname: '/calender',
                tag: 1,
                query: this.state.startTime,
            }
            this.props.history.replace(path)
        }else {
            let path = {
                pathname: '/calender',
                tag: 1,
                query: this.state.startTime,
            }
            this.props.history.replace(path)
        }
        
        
    }
    //选择结束日期
    toCalender2(){
        document.title = '请选择结束日期';
        let startStamp = this.state.startTime.getTime();
        let endStamp = this.state.endTime.getTime();
        if(startStamp > endStamp) {
            let path = {
                pathname: '/calender',
                tag: 2,
                query: this.state.endTime
            }
            this.props.history.replace(path)
        }else {
            let path = {
                pathname: '/calender',
                tag: 2,
                query: this.state.endTime
            }
            this.props.history.replace(path)
        }
        
        //this.props.history.replace(path)
    }
    
    //得到年月日和周
    getMonthWeekDay(dateTime) {
        let year,month, week, day;
        year = dateTime.getFullYear()
        month = dateTime.getMonth() + 1
        day = dateTime.getDate()
        week = dateTime.getDay()
        this.setState({
            month: month,
            week: this.numToChinese(week),
            day: day,
            year:year
        })
    }

    //得到日期
    //type代表什么？
    //type 起到标示的作用，1代表开始时间，2代表结束时间
    getMonthWeekDays(dateTime,type) {
        //console.log(dateTime,type);
        //console.log('处理时间：',dateTime);
        //console.log('type标示的作用',type);
        let year1,month1, week1, day1, year2,month2, week2, day2;
        if(type == 1){
            year1 = dateTime.getFullYear()
            month1 = dateTime.getMonth() + 1
            day1 = dateTime.getDate()
            week1 = dateTime.getDay()
            this.setState({
                month1: month1,
                week1: this.numToChinese(week1),
                day1: day1,
                year1:year1
            });
        }

        if(type == 2){
            year2 = dateTime.getFullYear()
            month2 = dateTime.getMonth() + 1
            day2 = dateTime.getDate()
            week2 = dateTime.getDay()
            this.setState({
                month2: month2,
                week2: this.numToChinese(week2),
                day2: day2,
                year2:year2
            });
        }
        
    }
    //重新选择时间
    selectTimeEvent() {
        this.setState({
            tipModel: false
        })
    }
    //得到前一天
    prevDay() {
        let prevDate = new Date(this.state.dateTime.getTime() - 24 * 60 * 60 * 1000)
        this.getMonthWeekDay(prevDate)
        this.setState({
            dateTime: prevDate
        })
        const homefalse = false
        this.getData(prevDate,homefalse)
    }
    //得到后一天
    nextDay() {
        let nextDate = new Date(this.state.dateTime.getTime() + 24 * 60 * 60 * 1000)
        this.getMonthWeekDay(nextDate);
        this.setState({
            dateTime: nextDate
        })
        const homefalse = false
        this.getData(nextDate,homefalse)
    }
    toIncomeDetail(sn) {
        let path = {
            pathname: '/income_detail',
            query: {machineId: sn, date: this.state.dateTime},
        }
        selectDateTime = this.state.dateTime
        this.props.history.push(path)
    }

    spread(index) {
        if(this.state.clickIndex === index){
            this.setState({clickIndex: -1})
        }else{
            this.setState({clickIndex: index})
        }
    }
    numToChinese(week) {
        switch (week) {
            case 0:
                return "日";
                break;
            case 1:
                return "一";
                break;
            case 2:
                return "二";
                break;
            case 3:
                return "三";
                break;
            case 4:
                return "四";
                break;
            case 5:
                return "五";
                break;
            case 6:
                return "六";
                break;
        }
    }
    tipsShowModel() {
        return (
            <div className="tipModel center">
                <div>
                    <p className='font_size12'>开始日期不能大于结束日期</p>
                    <p className='font_size12'>请重新选择</p>
                    <div className="center marginTop" onClick={()=> this.selectTimeEvent()}>
                        <p className="border confrim font_size12">确认</p>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        const {month1, week1, day1, month2, week2, day2, clickIndex,machineData} = this.state
        return (
            <div>
                <div style={bg} className="bg_box">
                    <div className="bill-date">
                        {/*
                            <div onClick={this.prevDay.bind(this)}>前一天</div>
                        */}
                        <div className="bill-date-left" onClick={this.toCalender.bind(this)}>
                            <img src={require('./images/calender.png')} className="caldener-img"/>
                            <span>{month1 > 9 ? month1 : '0' + month1}-{day1 > 9 ? day1 : '0' + day1}{/*周{week}*/}</span>
                        </div>
                        <div className="bill-date-middle">至</div>
                        <div  className="bill-date-right" onClick={ this.toCalender2.bind(this) }>
                            <img src={require('./images/calender.png')} className="caldener-img"/>
                            <span>{month2 > 9 ? month2 : '0' + month2}-{day2 > 9 ? day2 : '0' + day2}{/*周{week}*/}</span>
                        </div>

                        {/*
                            <div onClick={this.nextDay.bind(this)}>后一天</div>
                        */}
                    </div>

                    <div className="bill-trade-title">交易流水（元）</div>

                    <div className="bill-trade-sum">{machineData ?machineData.totalFee:'0'}</div>
                    
                    { this.state.tipModel ? this.tipsShowModel(): null}
                </div>

                <div className="wrap-bill-detail">
                    <ul>
                        {machineData && machineData.addressResponseList.map((address, index) => {
                            return <li onClick={this.spread.bind(this,index)} key={index}>
                                <div className="bill-detail-flex">
                                    <div className='bill-width'>
                                        {
                                            clickIndex === index ?<img src={require('./images/ down.png')}
                                                                       className="bill-right-img"/>:<img src={require('./images/right.png')}
                                                                                                         className="bill-right-img"/>
                                        }
                                        {address.address}
                                    </div>
                                    <div className="addressIncome">
                                        {address.addressIncome}
                                    </div>
                                </div>
                                {index == clickIndex? <ul>
                                    {address.machineTransactionResponses.map((adressDetail, indexDetail) => {
                                        return <li
                                            className="bill-detail-flex"
                                            onClick={this.toIncomeDetail.bind(this,adressDetail.sn)}
                                            key={indexDetail}
                                        >
                                            <div className="bill-detail-full">
                                                <img style={{width:'0.13rem',height:'0.13rem',paddingRight: '0.1rem'}}src={require('./images/machine_icons.jpg')}
                                                     className="bill-mechine-img"
                                                />
                                                {adressDetail.sn}
                                            </div>
                                            <div className="bill-detail-price">
                                                {adressDetail.dayIncome}
                                                <img style={{paddingLeft: '0.1rem',width: '0.1rem',height:'0.1rem',display: 'inline-block'}}
                                                     src={require('./images/index_right.png')}
                                                     className="bill-index-right"/>
                                            </div>
                                        </li>
                                    })}
                                </ul>:''}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        )

    }
}

export default billItemiezd