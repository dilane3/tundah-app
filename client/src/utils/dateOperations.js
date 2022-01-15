// This function display the relative date
const getRelativeDate = (date) => {
	const currentDate = new Date().getTime()/1000
	let diffDate = Math.floor((currentDate - Number(date)))

	const months = [
		"janvier",
		"fevrier",
		"mars",
		"avril",
		"mai",
		"juin",
		"juillet",
		"aout",
		"septembre",
		"octobre",
		"novembre",
		"decembre"
	]

	if (diffDate < 60) {
		return "A l'instant"
	} else if (diffDate < 3600) {
		return `Il y a ${Math.floor(diffDate/60)}min`
	} else if (diffDate < 86400) {
		return `Il y a ${Math.floor(diffDate/3600)}h`
	} else if (diffDate >= 86400 && diffDate < 86400*2) {
		return "Hier"
	} else {
		const exactDate = new Date(date)
		
		return `${exactDate.getDate() + 1} ${months[exactDate.getMonth()]} ${exactDate.getFullYear()}`
	}
}

export {getRelativeDate}