import { goScene, sceneNameType } from "../game/scenes";
import { STARTING_SCENE } from "../main";

export function focusscene() { return scene("focus" as sceneNameType, () => {
	setBackground(BLACK.lighten(50))
	
	add([
		text("CLICK TO FOCUS")
	])

	onClick(() => {
		goScene(STARTING_SCENE, null)  
	})
})}