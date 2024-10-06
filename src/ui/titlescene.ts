import { goScene, sceneNameType } from "../game/scenes"
import { fadeOutTransition } from "../game/transitions/fadeOutTransition"
import { stickersTransition } from "../game/transitions/stickersSubstate"

export function titlescene() { return scene("title" as sceneNameType, () => {
	setBackground(BLUE.lighten(30))
	
	onKeyPress("enter", () => {
		goScene("game", stickersTransition)
	})
})} // END OF SCENE
