// Fixes a bug where staying still in the water will spam duplicate location packets, causing the server to disconnect the player

module.exports = function SwimFix(dispatch) {
	let lastPos = null

	dispatch.hook('C_PLAYER_LOCATION', 5, {order: -90}, event => {
		if(lastPos &&
			lastPos.w === event.w &&
			lastPos.loc.equals(event.loc) &&
			lastPos.dest.equals(event.dest) &&
			lastPos.type === event.type
		)
			return false

		lastPos = event
	})
}