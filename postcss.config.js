//后处理css，通过postcss优化由stylus（.styl文件，css预处理框架）编译而成的css代码
//stylus给css添加了可编程的特性，也就是说，
//在stylus中可以使用变量、函数、判断、循环一系列css没有的东西来编写样式文件，
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer()//加浏览器前缀的css属性，为其自动加前缀
  ]
}