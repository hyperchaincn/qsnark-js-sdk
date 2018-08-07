// var request = require('request')
function request(options,callback){
    
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () { // 状态发生变化时，函数被回调
        if (httpRequest.readyState === 4) { // 成功完成
            // console.log('httpRequest',httpRequest)
            // 判断响应结果:
            if (httpRequest.status === 200) {
                // 成功，通过responseText拿到响应的文本:
                return callback(undefined, {statusCode:httpRequest.status},httpRequest.responseText);
            } else {
                // 失败，根据响应码判断失败原因:
                return callback(httpRequest.status, {statusCode:httpRequest.status},httpRequest.responseText);
            }
        } else {
            // HTTP请求还在继续...
        }
    }
    httpRequest.open(options.method,options.url,true);
    httpRequest.setRequestHeader("Authorization",options.headers['Authorization']);

    if(options.method==='POST'){
        httpRequest.setRequestHeader("Content-Type",options.headers['Content-Type']);
        httpRequest.send(options.body) 
    } else {
        httpRequest.send();
    }
}
function getURLEncodeBody(data){
     var result = '';
     for(var key in data){
        result += key+'='+data[key]+'&';
     }
     return result;
}

exports.get = function(url, tokens, callback){
    request({
        url: url,
        method: "GET",
        headers: {
            "Authorization": tokens?tokens.getAccessToken():"",
        },
    }, function(error, response, body) {
        callback(error, response, body)
    });
}

exports.postjson = function(url, tokens, requestData, callback){
    request({
        url: url,
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": tokens?tokens.getAccessToken():"",
        },
        body: JSON.stringify(requestData)
    }, function(error, response, body) {
        callback(error, response, body)
    });
}

exports.postform = function(url, tokens, requestData, callback){
    request({
        url: url,
        method: "POST",
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Authorization": tokens?tokens.getAccessToken():"",
        },
        body: getURLEncodeBody(requestData),
    }, function(error, response, body) {
        callback(error, response, body)
    });
}
