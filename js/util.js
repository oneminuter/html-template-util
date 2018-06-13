var util = {
	//格式化时间
    formatDate: function(timestamp) {
        t = new Date(parseInt(timestamp));
        y = t.getFullYear();
        m = t.getMonth() + 1;
        d = t.getDate();

        h = t.getHours();
        min = t.getMinutes();
        s = t.getSeconds();

        return y + "/" + m + "/" + d + " " + h + ":" + min;
    },

    /* ajax 请求
    	obj{
    		url: "",					//请求url
    		method: "",					//请求方式 get、post
    		header: {},					//请求头
    		data: {},					//请求参数
    		success: function(resp){},	//请求成功回调
    		error: function(err){}		//请求错误回调
    	}
    */
    ajax: function(obj) {
            var xhr = null;
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari 
                xhr = new XMLHttpRequest();
            } else { // code for IE6, IE5 
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
                if (4 == this.readyState) {
                    if (200 == this.status) {
                        var response = JSON.parse(this.responseText);
                        obj.success(response);
                    } else {
                        obj.error(err)
                    }
                }
            });

            //判断请求方式 obj.method ，默认使用get方法
            if (obj.method.toLowerCase() == "post") {
                xhr.open(obj.method, obj.url, true);
                //设置header
                if (obj.header != null || obj.header != "" || obj.header != "undefined") {
                    for (var key in obj.header) {
                        xhr.setRequestHeader(key, obj.header[key]);
                    }
                }
                xhr.send(obj.data);

                //处理结束返回
                return;
            }

            // get方式
            //拼接参数
            var reqData = "";
            for (var key in obj.data) {
                reqData += "&" + key + "=" + obj.data[key];
            }
            //去掉第一个&
            if (reqData.length > 1) {
                reqData = reqData.slice(1);

                obj.url = obj.url + "?" + reqData;
            }

            xhr.open(obj.method, obj.url, true);
            //设置header
            if (obj.header != null || obj.header != "" || obj.header != "undefined") {
                for (var key in obj.header) {
                    xhr.setRequestHeader(key, obj.header[key]);
                }
            }

            xhr.send();
        },
        //ajax formData 请求方式
        ajaxFormData: function(obj) {
            var form = new FormData();
            for(var key in obj.data) {
                form.append(key, obj.data[key]);
            }

            var xhr = null;
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari 
                xhr = new XMLHttpRequest();
            } else { // code for IE6, IE5 
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.withCredentials = true;
            xhr.open(obj.method, obj.url, true);
            xhr.send(form);

            xhr.addEventListener("readystatechange", function() {
                if (4 == this.readyState) {
                    if (200 == this.status) {
                        var response = JSON.parse(this.responseText);
                        obj.success(response);
                    } else {
                        obj.error(err)
                    }
                }
            });
            return;
        },
        
        //设置sessionStorage
        setSessionStorage: function(key, value) {
            sessionStorage.setItem(key,value);
        },

        //获取sessionStorage
        getSessionStorage: function(key) {
            return sessionStorage.getItem(key);
        },
        //获取url参数
        getUrlParam: function(){
            var url = location.search; //获取url中"?"符后的字串   
            var param = new Object();   
            if (url.indexOf("?") != -1) {   
                var str = url.substr(1);   
                strs = str.split("&");   
                for(var i = 0; i < strs.length; i ++) {   
                    param[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
                }   
            }   
            return param;
        },
}
