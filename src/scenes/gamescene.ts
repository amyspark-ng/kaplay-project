import { GameSave } from "../gamesave.ts";
import { gameCursor } from "../plugins/customCursor.ts";
import { positionSetter } from "../plugins/positionsetter.ts"
import { utils } from "../utils.ts";

export const gamescene = () => scene("gamescene", () => {
	const bean = add([
		sprite("bean"),
		anchor("center"),
		pos(center()),
		positionSetter(),
		area(),
		layer("background"),
	])

	GameSave.write(GameSave.getLatestSave())

	let score = GameSave.highscore

	bean.onClick(() => {
		score++
		GameSave.highscore = score
	})

	bean.onHover(() => {
		gameCursor().point()
	})

	bean.onHoverEnd(() => {
		gameCursor().default()
	})

	onKeyPress("enter", () => {
		GameSave.write(GameSave)
		debug.log("Game saved!")
	})

	utils.runInDesktop(() => {
		debug.log("This game is running on desktop!!!")
	})
}) 
