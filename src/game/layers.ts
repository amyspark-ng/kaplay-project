// TODO: Come up with a better system
export const gameLayers = { 
	"background": "background",
	"cursor": "cursor"
}

// The ones most to the right draw the most behind
export const theLayers = Object.keys(gameLayers)

export function setupLayers() {
	// the top ones go below
	layers(theLayers, "background")
}