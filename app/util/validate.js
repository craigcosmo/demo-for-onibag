export default (array) =>{
	let valid = true

	function validateEmail(email) {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(email)
	}

	function doCall(i, reason){
		if (i.hasOwnProperty('callback') && typeof i.callback == 'function') {
			setTimeout(() => i.callback(reason) ,0)
		}
	}
	function isObjectLitteral(ob){
		return ob ? ob.constructor === {}.constructor : false
	}
	function condition(i) {
		if (!i.value) {
			valid = false
			doCall(i, 'length')
		}
		if (i.hasOwnProperty('type') && i.type === 'email' && !validateEmail(i.value) ) {
			valid = false
			doCall(i, 'valid')
		}

		if(i.hasOwnProperty('min') && i.value.length < i.min ){
			valid = false
			doCall(i, 'min')
		}
		if (i.hasOwnProperty('type') && i.type=== 'passwordConfirm' && i.value !== i.value2) {
			valid = false
			doCall(i, 'match')
		}
	}
	if (array.constructor === Array ) {
		// console.log('param is array')
		array.forEach(function(i){
			condition(i)
		})
	}
	if (isObjectLitteral(array)) {
		
	}
	

	return valid
}

// [
// 	{field: 'mama', value: 'ohla', type:'email', callback:null}
// ]

