// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last'); //到li里找类为last的元素
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
//用数组
var hashMap = xObject || [//一开始xObject可能为空,所以要用||，即如果xObject为空,那就去用后面的数据赋值
{ logo: 'A', url: 'https://www.acfun.cn' }, { logo: 'B', url: 'https://www.bilibili.com/' }];

var simplifyUrl = function simplifyUrl(url) {
    //replace会有一个返回值,并不改变原来的元素url
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //此正则用于删除以/开头的内容
};
var render = function render() {
    $siteList.find('li:not(.last)').remove(); //将之前界面显示的网址都删除,方便后面重新显示,有点像Python的界面刷新的功能
    hashMap.forEach(function (node, index) {
        //node为当前元素,index为元素下标
        var $li = $('\n        <li>\n        <div class="site">\n            <div class="logo">' + node.logo + '</div>\n            <div class="link">' + simplifyUrl(node.url) + '</div>\n            <div class="close">\n            <svg class="icon" >\n                <use xlink:href="#icon-close"></use>\n            </svg>\n            </div>\n        </div>\n    </li>\n        ').insertBefore($lastLi); //将新元素插到lastLi前面
        $li.on('click', function () {
            //点击$li代表的标签时，就打开一个新窗口。因为之前a标签太灵敏了,所以需要换种方法
            window.open(node.url);
        });
        $li.on('click', '.close', function (e) {
            //当$li里的类为close的元素被点击时,执行
            console.log('here');
            e.stopPropagation(); //通过阻止冒泡,避免点击×号时的点击事件传到上层的li，导致 跳转页面
            hashMap.splice(index, 1); //根据前面的索引index从数组中删除掉我点击的元素
            render(); //重新渲染
        });
    });
};
render();
//监听点击事件
$('.addButton').on('click', function () {
    var url = window.prompt('请输入你要的网址'); //在网页端弹出一个方框让你输入,并返回你输入的内容
    if (url.indexOf('http') !== 0) {
        //如果输入的内容里没http
        url = 'https://' + url;
    }
    console.log(url);
    hashMap.push({
        logo: simplifyUrl(url)[0],
        logoType: 'text', url: url
    });
    render();
});

window.onbeforeunload = function () {
    //在你关闭或刷新页面时触发
    var string = JSON.stringify(hashMap); //将对象转换成字符串
    localStorage.setItem('x', string); //在本地的存储里设置一个x ，值为string
};

$(document).on('keypress', function (e) {
    var key = e.key; //获取到你按的是哪一个按键

    for (var i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            //若当前元素的logo值和我按的按键相同，那就打开其对应的网页
            window.open(hashMap[i].url);
        }
    }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.ab187e4c.map