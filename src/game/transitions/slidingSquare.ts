import { goScene, sceneNameType } from "../scenes";

export function slidingSquareTransition(newScene: sceneNameType) {
	const fade = add([
		rect(width(), height()),
		pos(-width(), center().y),
		anchor("center"),
		color(BLACK),
		opacity(1),
		stay(),
		layer("background"),
		z(1),
		timer(),
	])

	fade.tween(-width(), center().x, 1, (p) => fade.pos.x = p).onEnd(() => {
		goScene(newScene)
	})

	const sceneLeave = onSceneLeave(() => {
		fade.tween(fade.pos.x, -width(), 1, (p) => fade.pos.x = p).onEnd(() => {
			fade.destroy()
			sceneLeave.cancel()
		})
	})
}