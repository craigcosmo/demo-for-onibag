
export let getDistance = (l1, l2) => {
  let dLat = toRad(l2.lat - l1.lat)
  let dLon = toRad(l2.lng - l1.lng)

  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(l1.lat)) * 
          Math.cos(toRad(l2.lat)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)

  return 7917 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

let toRad = x => x * Math.PI / 180
