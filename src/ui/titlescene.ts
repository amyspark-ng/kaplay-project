import { goScene, sceneNameType } from "../game/scenes"
import { fadeOutTransition } from "../game/transitions/fadeOutTransition"

export function titlescene() { return scene("title" as sceneNameType, () => {
	setBackground(BLUE.lighten(30))
	
	onKeyPress("enter", () => {
		goScene("game", fadeOutTransition)
	})
})} // END OF SCENE
