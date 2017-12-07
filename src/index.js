// import _ from 'lodash'
import printMe from './print.js'
import {cube} from './math.js'
import './style.css'

// if (process.env.NODE_ENV !== 'production') {
//   console.log(process.env.NODE_ENV)
//   console.log('looks like we are in development mode')
// }
if (process.env.NODE_ENV === 'development') {
  console.log(process.env.NODE_ENV)
  console.log('looks like we are in development mode')
}

function component() {
  // var element = document.createElement('div');
  var btn = document.createElement('button');
  var element = document.createElement('pre')
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n')
  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  btn.innerHTML = 'click me and show the consoles'
  btn.onclick = printMe

  element.appendChild(btn)
  return element;
}
let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element);

if(module.hot) {
	module.hot.accept('./print.js', function(){
		console.log('Accepting the updated printMe module!')
    document.body.removeChild(element);
    element = component(); // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element);
	})
}