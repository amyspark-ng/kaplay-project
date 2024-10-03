import { goScene, scenes } from "../game/scenes"

export function titlescene() { return scene("titlescene", () => {
	setBackground(BLUE.lighten(30))
	
	onKeyPress("enter", () => {
		go("gamescene")
	})

})} // END OF SCENE
