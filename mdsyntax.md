## Markdown语法介绍
&copy;[w5e.me](http://w5e.me "w5e")
### 标题 ，段落 ， 强制换行，分隔线
> ### 行首插入1到6个#来生成1到6阶标题
>> #### 强制换行需要前一行末  
>> 有==2==个以上的***空格***
>> ++否则不会换行++
一行中只有三个-，则会生成一个分隔线
---
### 列表
-  *无序列表第一级*
    - 第二级前面需要有一个制表符
        - 第三级
1. ***以1. 开始用于生成有序列表***
0. *后续同级的数字会自动改为连续值*
    2016. 不同级的首行不会自动更改   
2016\. 12. 14 [数字.空格]在行首要转义
---
### 代码
```
//let's code
let foo = 0x0001 var bar = "code"
void code(){}
```
---
### 表格
~~h1~~  |==h2== |*h3*
:-      |:-:    |-:
a       |bbbbbb | c
aaaaaa  |b      | c
a       |b      | cccccc
a       |b      | c
---
### 链接 ，图片 ，任务列表
![](https://note.youdao.com/yws/api/image/normal/1414809567564?userId=waynegreen%40163.com)

- [x] DONE  
Markdown的语法就介绍到这里
- [ ] ***++TODO++***  
[更多语法介绍](http://daringfireball.net/projects/markdown/syntax)