import React from 'react'
import config from 'config'
import 'home.scss'
import validate from 'util/validate'
import request from 'util/request'
import {getDistance} from 'util/measure'

export default class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			pickupError:false,
			dropoffError:false,
			pickup:'',
			dropoff:'',
			done: false
		}
		this.submited = false

	}
	myValidate(){
		let input = [
			{
				value:this.state.pickup,
				callback: this.showPickupError.bind(this)
			},
			{
				value: this.state.dropoff,
				callback: this.showDropoffError.bind(this)
			}
		]
		if (validate(input)) return true
		else return false
	}
	getGeoCode(address){
		// console.log('this.state', this.state.pickup)
		const key = 'AIzaSyCAH7z97zbjDFireVxzfE8xPq5LPQx1ydM'
		const api = 'https://maps.googleapis.com/maps/api/geocode/json?key='+key+'&address='
		return request().get(api+address).then(res => {
			// check if there is result
			if (res.data.status === 'OK' && res.data.results.length>0) {
				console.log('geocode result',res.data.results[0])
				return res.data.results[0]
			}else{
				return false
			}

		}).catch( error => alert(error))
	}
	handleSubmit(e){
		e.preventDefault()
		// remove submitted message
		this.setState({done:false})

		if (!this.myValidate()) return

		if (this.submitted) return
		
		this.submitted = true

		let pickup = this.getGeoCode(this.state.pickup)
		
		let dropoff = this.getGeoCode(this.state.dropoff)


		Promise.all([pickup,dropoff]).then( (re) =>{
			// if can not find geocode of pick up, alert user
			if (re[0] === false) { 
				alert('your pick up address doesn\'t have geolocation data, try something else.')
			}
			// if can not find geocode of drop off, alert user
			if (re[1] === false) { 
				alert('your drop off address doesn\'t have geolocation data, try something else.')
			}
			if (re[0] === false || re[1] === false) {
				this.submitted = false
				return 
			}
			console.log('promise all result',re)

			let l1 = re[0].geometry.location
			let l2 = re[1].geometry.location
			
			// calculate distance between pickup and dropoff see it exceeds 20 miles
			if (getDistance(l1,l2) <= 20) {
				let data = {
					pickup   : re[0].address_components,
					dropoff  : re[1].address_components
				}
				this.props.submitLocation(data)
				.then( () => console.log('good, submitted') )
				.then( () => { this.clearForm(); this.submitted = false })
				.catch( err => console.log('unsuccessful') )
			}else{
				this.submitted = false
				alert('the distance is greater than 20 miles')
			}
			
		})
	}
	clearForm(){
		// clear data and show submitted message
		this.setState({
			pickup:'',
			dropoff:'',
			done:true
		})
	}
	showPickupError(){
		this.setState({pickupError:true})
	}
	showDropoffError(){
		this.setState({dropoffError:true})
	}
	pickupOnChange(e){
		this.setState({pickup: e.target.value})
	}
	dropoffOnChange(e){
		this.setState({dropoff: e.target.value})
	}
	render() {
		return (
			<div styleName="home">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div>
						<input 
							type="text" 
							value={this.state.pickup} 
							placeholder="Pick up address" 
							onChange={this.pickupOnChange.bind(this)} />
						{this.state.pickupError && <div>pickup address is required</div>}
					</div>
					<div>
						<input 
							type="text" 
							value={this.state.dropoff} 
							placeholder="Drop off address" 
							onChange={this.dropoffOnChange.bind(this)} />
						{this.state.dropoffError && <div>dropoff address is required</div>}
					</div>
					<button type="submit">Send</button>
					{this.state.done && <div>submitted</div>}
				</form>
			</div>
		)
	}
}
