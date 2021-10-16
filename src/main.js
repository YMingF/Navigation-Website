const $siteList=$('.siteList')
const $lastLi=$siteList.find('li.last')//到li里找类为last的元素
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)
//用数组
const hashMap=xObject || [  //一开始xObject可能为空,所以要用||，即如果xObject为空,那就去用后面的数据赋值
    {logo:'A' ,url:'https://www.acfun.cn' },
    {logo: 'B',url:'https://www.bilibili.com/' },
]

const simplifyUrl=(url)=>{
    //replace会有一个返回值,并不改变原来的元素url
    return url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace(/\/.*/,'')//此正则用于删除以/开头的内容
}
const render=()=>{
    $siteList.find('li:not(.last)').remove()//将之前界面显示的网址都删除,方便后面重新显示,有点像Python的界面刷新的功能
    hashMap.forEach((node,index)=>{//node为当前元素,index为元素下标
        const $li=$(`
        <li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
            <svg class="icon" >
                <use xlink:href="#icon-close"></use>
            </svg>
            </div>
        </div>
    </li>
        `).insertBefore($lastLi)//将新元素插到lastLi前面
        $li.on('click',()=>{ //点击$li代表的标签时，就打开一个新窗口。因为之前a标签太灵敏了,所以需要换种方法
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{//当$li里的类为close的元素被点击时,执行
            console.log('here')
            e.stopPropagation()//通过阻止冒泡,避免点击×号时的点击事件传到上层的li，导致 跳转页面
            hashMap.splice(index,1)//根据前面的索引index从数组中删除掉我点击的元素
            render()//重新渲染
        })
    })
}
render()
//监听点击事件
$('.addButton')
    .on('click',()=>{
        let url=window.prompt('请输入你要的网址')//在网页端弹出一个方框让你输入,并返回你输入的内容
        if(url.indexOf('http')!==0){//如果输入的内容里没http
           url='https://'+url
        }
        console.log(url)
        hashMap.push({
            logo:simplifyUrl(url)[0],
            logoType:'text',url:url
        })
        render()
});

window.onbeforeunload=()=>{//在你关闭或刷新页面时触发
    const string=JSON.stringify(hashMap)//将对象转换成字符串
    localStorage.setItem('x',string)//在本地的存储里设置一个x ，值为string
}

$(document).on('keypress',(e)=>{
    const {key}=e//获取到你按的是哪一个按键
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){ //若当前元素的logo值和我按的按键相同，那就打开其对应的网页
            window.open(hashMap[i].url)
        }
    }
})
