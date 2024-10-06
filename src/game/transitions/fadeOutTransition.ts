import { gameLayers } from "../layers";
import { goScene, sceneNameType } from "../scenes";

export function fadeOutTransition(newScene: sceneNameType) {
	const fade = add([
		rect(width(), height()),
		pos(center().x, center().y),
		anchor("center"),
		color(BLACK),
		opacity(1),
		stay(),
		layer(gameLayers.background),
		z(1),
		timer(),
	])

	const FADE_TIME = 1

	// Changes the scene
	fade.tween(0, 1, FADE_TIME, (p) => fade.opacity = p).onEnd(() => {
		goScene(newScene)
	})
	
	// Runs when the scene has succesfully been changed
	const sceneLeaveChange = onSceneLeave(() => {
		fade.tween(1, 0, FADE_TIME, (p) => fade.opacity = p).onEnd(() => {
			goScene(newScene)
			fade.destroy()
			sceneLeaveChange.cancel()
		})
	})
}