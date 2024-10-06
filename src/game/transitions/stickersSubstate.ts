import { assets } from "@kaplayjs/crew";
import { goScene, sceneNameType } from "../scenes";
import { utils } from "../../utils";
import { playSound } from "../../plugins/features/sound";
import { gameLayers } from "../layers";

const STICKER_SCALE = 2.5
/**
 * Time it'll take to add a sticker, removal will be half of it
 */
const STICKER_TIME = 0.05

function addSticker(stickerArray: string[]) {
	const SCALE_S = 2.5
	
	const sticker = add([
		sprite(choose(stickerArray)),
		anchor("center"),
		scale(SCALE_S),
		pos(utils.randomPos()),
		rotate(rand(0, 360)),
		timer(),
		stay(),
		layer(gameLayers.background),
		z(1),
		color(),
		"transitionSticker",
	])

	sticker.tween(vec2(SCALE_S + 0.1), vec2(SCALE_S), 0.25, (p) => sticker.scale = p, easings.easeOutQuint)

	return sticker;
}

function addXAmountStickers(amount: number, stickerArray: string[]) {
	for (let i = 0; i < amount; i++) {
		addSticker(stickerArray)
	}
}

export function stickersTransition(newSceneName:sceneNameType) {
	let stickerNames = []

	const manager = add([ stay(), timer() ])

	for (let i = 0; i < Object.keys(assets).length; i++) {
		const assetName = Object.keys(assets)[i]
		stickerNames.push(assetName)
	}

	addXAmountStickers(5, stickerNames)

	/** Counts the amount of times the loop has been called */
	let loopCounter = 0
	const LAST_LOOP = rand(40, 50)

	const addingLoop = loop(STICKER_TIME, () => {
		let amount = randi(2, 4)
		addXAmountStickers(amount, stickerNames)
		playSound("stickerKey").randomizePitch([-50, 50])

		loopCounter++
		
		if (loopCounter > LAST_LOOP) {
			addingLoop.cancel()
			wait(1, () => {
				goScene(newSceneName)
			})
		}
	})

	const sceneLeave = onSceneLeave(() => {
		get("transitionSticker").forEach((sticker, index) => {
			manager.wait((STICKER_TIME * 0.3) * index, () => {
				sticker.destroy()
				playSound("stickerKey").randomizePitch([-50, 50])
			})
		})
		
		sceneLeave.cancel()
	})
}