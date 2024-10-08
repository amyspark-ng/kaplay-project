import { DEBUG, DFEATURE_FOCUS, PRODUCT_AUTHOR, PRODUCT_NAME, PRODUCT_VERSION, STARTING_SCENE } from "../main"
import { setupCamera } from "../plugins/features/camera"
import { addCursor } from "../plugins/features/customCursor"
import { drag } from "../plugins/features/drag"
import { setupSoundtray } from "../plugins/features/soundtray"
import { GameSave } from "./gamesave"
import { setupLayers } from "./layers"
import { loadAssets, loadingScreen } from "./loader"
import { goScene, setupScenes } from "./scenes"

export function initGame() {
	document.title = PRODUCT_NAME

	setCursor("none")

	loadAssets()
	onLoading((progress:number) => loadingScreen(progress))
	onLoad(() => {
		GameSave.load()
		addCursor()

		// sets up a bunch of stuff
		setupScenes();
		setupLayers();
		setupCamera();
		setupSoundtray();
	
		console.log(`${PRODUCT_AUTHOR}.${PRODUCT_NAME} v: ${PRODUCT_VERSION}`)
		
		// determins the scene
		if (DFEATURE_FOCUS) {
			if (isFocused()) go(`${STARTING_SCENE}`)
			else goScene("focus", null)
		}

		else go(`${STARTING_SCENE}`)
	})
	
	// for drag
	document.getElementById("kanva").addEventListener("mouseout", () => {
		// all of the objects that are draggable have this function
		if (drag.getCurDragging()) drag.getCurDragging().drop()
	}, false);
}