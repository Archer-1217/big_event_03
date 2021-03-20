let baseURL = 'http://ajax.frontend.itheima.net';

$(function () {
    $.ajaxPrefilter(function (params) {
        params.url = baseURL + params.url;

    })
})