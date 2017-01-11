// process.env.NODE_ENV var is available during build process
const env = process.env.NODE_ENV

let port = 5566
let hostPort = 5577
let url = 'http://localhost:'+port+'/'
let api = 'http://localhost:'+hostPort+'/'
let img = url+'image/'

let firebaseConfig = {
	apiKey: 'AIzaSyCr25G76-gRssZjTm52sb1bcsPZ0o4SORE',
	authDomain: 'location-f1ebc.firebaseapp.com',
	databaseURL: 'https://location-f1ebc.firebaseio.com',
	storageBucket: 'location-f1ebc.appspot.com',
	messagingSenderId: '404127751984'
}

if (env=== 'production') {

}

export const siteUrl = url
export const sitePort = port
export default {
	siteUrl : url,
	img: img,
	firebase: firebaseConfig
}