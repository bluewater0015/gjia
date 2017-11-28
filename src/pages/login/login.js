//login.js
import "./login.css";
import React,{ Component } from 'react';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Title from '../../components/title/title';
import loginbackground from '../../assets/images/loginbackground.png';
const loginImage = {
    backgroundImage: 'url(' + loginbackground + ')',
    backgroundSize: '100% 100%'
}
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            isShowMoadl:false
        }
    }
    /**
     *  @getPhoneEvent 获取电话号码
     *  @param {number} 参数value 电话号码
     */
    getPhoneEvent(value){
        //console.log('phone',value);
        this.setState({
            username: value
        },()=>{
            localStorage.setItem('username',this.state.username);
        })

    }

    /**
     *  @getPasswordEvent 获取登录密码
     *  @param {number} 参数value 密码
     */
    getPasswordEvent(value){
        //console.log('psw',value);
        this.setState({
            password: value
        },()=>{
            localStorage.setItem('password',this.state.password);
        })
    }

    getLocalStorage(){
        let username = localStorage.getItem("username");
        let password = localStorage.getItem('password');
        username && password && this.setState({
            username,
            password
        })
    }
    componentDidMount(){
        this.getLocalStorage();
    }
    renderModal(){
        return (
            <div className="center" style={{backgroundColor:"rgba(0,0,0,0.5)",width:'200px',height:"100px",color:'#FFF',position:'fixed',left:'50%',top:"44%",transform:"translate(-50%,-50%)",borderRadius:'10px'}}>
                您的账号或密码有误
            </div>
        )
    }

    /**
     *  @loginEvent 点击登录
     *  
     */
    loginEvent(){
        let url = "/admin/login";
        var form = new FormData();
        let username;
        let password;
        let _this = this;
        localStorage.getItem("username") && localStorage.getItem('password') && getUserInfo();
        function getUserInfo() {
            username = localStorage.getItem("username");
            password = localStorage.getItem('password');
        }
        (!localStorage.getItem("username") || !localStorage.getItem('password')) && dealInputUserInfo();
        function dealInputUserInfo() {
            console.log(_this.state.username,_this.state.password);
            username = _this.state.username;
            password = _this.state.password;
        }
        form.append('username', username);
        form.append('password', password);
        const request = new Request(url, {
            method: 'POST',
            body: form
        })
        return fetch(request)
        .then((response) => {
            localStorage.setItem('jwt_token',response.headers.get('jwt_token'));
            return response.json();
        })
        .then((responseData) => {
            localStorage.setItem('user', JSON.stringify(responseData));
            if(responseData.enabled){
                localStorage.setItem('username',this.state.username);
                localStorage.setItem('password',this.state.password);
                this.props.history.replace('/home');
            }
        }).catch(err => {
                _this.setState({
                    isShowMoadl:true
                },()=>{
                    setTimeout(()=>{
                        _this.setState({
                            isShowMoadl:false
                        })
                    },2000);
                });
                console.log(err);
            })

    }
    
    render(){
        return (
            <div className="login_container" style={ loginImage }>
                <div className="alliance_business center">
                    <Title title="加盟商管家" style={{ width: '110px',fontSize: '22px'}}/>
                </div>
                <div className="login_input">
                    <div className='baseHeight flex align_items borderRadius bgColorMain border borderColorWhite'>
                        <img
                            alt=""
                            src={ require('../../assets/images/phone.png') }
                            className='icons margin-left'
                        />
                        <Input
                            onChange={(value)=>{this.getPhoneEvent(value)}}
                            value="请输入手机"
                            type="text"
                            style={{marginLeft: '16px',backgroundColor:'#FAD51B',color:'#FFF'}}
                            myvalue={this.state.username}
                        />
                    </div>
                    <div className='baseHeight flex align_items borderRadius bgColorMain border borderColorWhite'>
                        <img
                            alt=""
                            src={ require('../../assets/images/password.png') }
                            className='icons margin-left'
                        />
                        <Input
                            onChange={(value)=>{this.getPasswordEvent(value)}}
                            value="请输入密码"
                            type="password"
                            style={{marginLeft: '16px',backgroundColor:'#FAD51B',color:'#FFF'}}
                            myvalue={this.state.password}
                        />
                    </div>

                </div>
                <div className="login_btn center">
                    <Button style={{width:'100%',height:'42px',backgroundColor: '#fff',color: '#03030'}} title="登录" onClick={this.loginEvent.bind(this)}/>
                </div>
                {
                    this.state.isShowMoadl ? this.renderModal() : null
                }

            </div>
        )
    }
}