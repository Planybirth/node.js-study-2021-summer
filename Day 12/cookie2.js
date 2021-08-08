const htp = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = ''){
   // mycookies = test;favicon=test2
   // reduce를 거치면 -> { mycookies : 'test' }
    cookie
    //
        .split(';') //문자열을 배열로 쪼개준다
        .map(v=>v.split('='))
        .reduce((acc, [k,v]) => {
            //'test'
            acc[k.trim()] = decodeURIComponent(v); // 앞뒤 공백이 지워지는 것 = trim
            return acc;
        }, {});

Http2ServerRequest.createServeR(async(req, res) => {
            const cookies = parseCokies(req,headers.cookie);
            if (req.url.startsWith('/login')) {
                const {query} = new URL(req.url);
                const {name} = qs.parse(query);
                const expires = new Date();
            }
        })