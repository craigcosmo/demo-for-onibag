import React from 'react'
import i from 'actionConstant'
import {db} from 'firebaseApp'

export let submitLocation = (payload) => {
	return dispatch => {
		return db.ref('/orders/').push(payload).then( (snap) => {
			dispatch({
				type: i.SUBMIT_LOCATION,
				payload: payload
			})
			return snap.key
		})
	}
}

