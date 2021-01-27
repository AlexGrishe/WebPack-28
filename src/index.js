import * as $ from 'jquery';

import '@css/style.css';

import Post from '@/model/posts';

import json from '@assets/data.json';

import webpackLogo from '@assets/icon-square-big.png';

import xml from '@assets/data.xml';

import csv from '@/assets/data.csv';

const post = new Post('Webpack Post Title!', webpackLogo);

console.log('Post to string:', post.toString());
$('pre').addClass('code').html(post.toString());
console.log('JSON', json);
console.log('XML', xml);
console.log('CSV', csv);