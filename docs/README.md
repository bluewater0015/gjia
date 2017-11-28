### 需要注意的地方

/**
* 只有page才能放置多个elements。page在原则上负责处理逻辑。也就是所谓的智能组件。
* components在原则上，是为了复用，所以一般只嵌套一个element，components在原则上只负责展示功能。
* 也就是所谓的木偶组件，你给我什么，我展示什么。
* 所以，components处理的东西，一般是通过page上传递下来的props来实现。
*/

//特殊技巧：为了防止报错，在componets中多使用 && 和 ||.

//实例 this.props.router && this.props.router.push()
// <Button title = '确定'></Button>
// <button>{{this.props.title || '确定'}}</button>

//布局：分模块
//page:结构性的东西。
//components:单一的，仅仅用于展示的东西

//存在的问题
// 1.在组件中添加点击事件无效 是为何？
// 比如这样：<Button title="登录" onClick={this.loginEvent.bind(this)}/>