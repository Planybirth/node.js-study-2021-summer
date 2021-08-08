const htp = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = ''){
     cookie
         .split(';') 
         .map(v=>v.split('='))
         .reduce((acc, [k,v]) => {
             acc[k.trim()] = decodeURIComponent(v); 
             return acc;
         }, {});