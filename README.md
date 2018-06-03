# html模板和工具

## css 初始化

## js 常用工具封装
**formatDate**  
时间戳（ms）转化为时间字符串

**ajax**
```
	obj{
		url: "",					//请求url
		method: "",					//请求方式 get、post
		header: {},					//请求头
		data: {},					//请求参数
		success: function(resp){},	//请求成功回调
		error: function(err){}		//请求错误回调
	}
```

**setSessionStorage**  
设置sessionStorage

**getSessionStorage**  
获取sessionStorage