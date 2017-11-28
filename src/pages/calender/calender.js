import React, {Component} from 'react'
import {Calendar} from 'react-date-range'
import './calender.css'

class Calender extends Component {
    constructor(props) {
        super(props)
        console.info('------日期页面的信息------')
        console.log('日期页面的props');

        const selectDay = props.location.query !== undefined 
        ? props.location.query:new Date()

        //只要我选择了日期，就会从营销页面传过来一个tag
        var tag = props.location.tag;
        console.log('tag',tag);

        this.state={
            selectDay:selectDay.getDate()+'/'
            +( selectDay.getMonth()+1)
            +'/'+selectDay.getFullYear(),
            tag: tag
        }
    }
    // componentDidMount() {
    //     document.title = '请选择开始日期'
    // }
    handleChange(date) {
        //date._d 就是选择的日期
        console.log('date._d什么？',date._d);
        var _this = this;

        //我选完日期，这时需要把tag传回去到营收页面
        var path = {
            pathname: '/billitemized',
            query: date._d,
            tag: this.state.tag
        }

        //如果是选择开始日期，就存储这个日期
        if(this.state.tag == 1){
            localStorage.setItem("start",date._d);
        } else {
            //如果是选择结束日期，就存储这个日期
            localStorage.setItem("end",date._d)
        }
        setTimeout(function(){
            _this.props.history.replace(path)
        })

        
    }

    render() {
        return (
            <div className="wrap-calender">
                <Calendar
                    lang="cn"
                    date={this.state.selectDay}
                    theme={{DaySelected: {background: '#ffce00', borderRadius: '20px', color: '#000'}}}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }
}

export default Calender