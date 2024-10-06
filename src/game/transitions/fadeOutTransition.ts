import { gameLayers } from "../layers";
import { goScene, sceneNameType } from "../scenes";

export function fadeOutTransition(newScene: sceneNameType) {
	const fade = add([
		sprite("bean"),
		// rect(width() / 2, height() / 2),
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
	fade.fadeIn(FADE_TIME).onEnd(() => {
		goScene(newScene)
	})

	// Runs when the scene has succesfully been changed
	const sceneLeaveChange = onSceneLeave(() => {
		fade.fadeOut(FADE_TIME).onEnd(() => {
			fade.destroy()
			sceneLeaveChange.cancel()
		})
	})
}