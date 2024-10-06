import { assets, objects } from "@kaplayjs/crew";
import { goScene, sceneNameType } from "../scenes";
import { utils } from "../../utils";
import { playSound } from "../../plugins/features/sound";
import { gameLayers } from "../layers";
import { GameObj, StayComp } from "kaplay";

// taken from the type 'Type' from @kaplayjs/crew
type spriteType = "crew" | "food" | "objects" | "animals" | "brand" | "fonts" | "ui" | "tiles" | "icons" | "books"

/** Scale of stickers */
const STICKER_SCALE = 3.5

/** Time it'll take to add a sticker, removal will be half of it */
const STICKER_TIME = 0.05

/**
 * Amount of sticker there'll be, will determine the time the transition will and how "good" it'll look
 * @default [70, 80]
 */
const STICKERS_AMOUNT = [70, 80]

/** Optional, can use a pack lol */
const STICKER_PACK:spriteType = "food"

/** Gets all the usable sticker names, lightly based on STICKER_PACK */
function getStickerNames(STICKER_PACK?:spriteType) {
	let stickerNames = []
	for (let i = 0; i < Object.keys(assets).length; i++) {
		if (STICKER_PACK) {
			const assetName = Object.keys(assets)[i]
			if (assets[assetName].type == STICKER_PACK) {
				stickerNames.push(assetName)
			}
		}
	
		else {
			const assetName = Object.keys(assets)[i]
			if (!(getSprite(assetName).data.width > 80 || getSprite(assetName).data.height > 80)) {
				stickerNames.push(assetName)
			}
		}
	}
	
	return stickerNames;
}

// Hold stickers stuff
let maxStickersAmount = 0
let stickerAmount = 0

function getStickerRandPos(widthOfSticker:number) {
	let newPos = utils.randomPos()

	while (get("transitionSticker").some((sticker) => Math.abs(sticker.pos.x - newPos.x) < widthOfSticker && Math.abs(sticker.pos.y - newPos.y) < widthOfSticker)) {
		newPos = utils.randomPos()
	}

	return newPos
}

/** Actually adds the sticker */
function addSticker(stickerArray: string[]) {
	const assetsWhoAreCrew = Object.keys(assets).filter((key) => assets[key].type == "crew")
	const randomCrew = choose(assetsWhoAreCrew)

	const sticker = add([
		sprite(choose(stickerArray)),
		anchor("center"),
		scale(STICKER_SCALE),
		pos(),
		rotate(rand(0, 360)),
		timer(),
		stay(),
		layer(gameLayers.background),
		z(1),
		color(),
		"transitionSticker",
	])

	stickerAmount++
	// debug.log(stickerAmount + "/" + maxStickersAmount)
	if (stickerAmount == maxStickersAmount) {
		// LAST STICKER
		sticker.color = WHITE
		sticker.pos = center()
		sticker.angle = 0
		sticker.scale = sticker.scale.add(0.1)
		sticker.z += 1
		// assures the last one is always a crew
		sticker.sprite = randomCrew
	
		// Tweens the scale so it pops out a bit MORE
		sticker.tween(vec2(STICKER_SCALE + 0.2), vec2(STICKER_SCALE), 0.25, (p) => sticker.scale = p, easings.easeOutQuint)
	}

	// Regular random sticker
	else {
		sticker.color = WHITE.darken(20)
		sticker.pos = getStickerRandPos(sticker.width)
		// Tweens the scale so it pops out a bit
		sticker.tween(vec2(STICKER_SCALE + 0.1), vec2(STICKER_SCALE), 0.25, (p) => sticker.scale = p, easings.easeOutQuint)
	}

	return sticker;
}

/** Adds an X amount of stickers */
function addXAmountStickers(amount: number, stickerArray: string[]) {
	for (let i = 0; i < amount; i++) {
		addSticker(stickerArray)
	}
}

/** Sticker transition inspired by FNF, i think it looks pretty cool */
export function stickersTransition(newSceneName:sceneNameType) {
	const manager = add([ stay(), timer()])
	const stickerNames = getStickerNames()

	// ADDS 5 TO START
	addXAmountStickers(5, stickerNames)

	// Resets some variable stuff
	maxStickersAmount = randi(STICKERS_AMOUNT[0], STICKERS_AMOUNT[1])
	stickerAmount = 0

	// ACTUALLY ADDS THEM
	const addingLoop = loop(STICKER_TIME, () => {
		if (stickerAmount < maxStickersAmount) {
			let amount = randi(2, 4)
			addXAmountStickers(amount, stickerNames)
			playSound("stickerKey").randomizePitch([-50, 50])
		}

		else {
			addingLoop.cancel()
			wait(1, () => {
				goScene(newSceneName)
			})
		}
	})

	// REMOVES ALL OF THEM ON SCENE CHANGE
	const sceneLeave = onSceneLeave(() => {
		get("transitionSticker").forEach((sticker, index) => {
			manager.wait((STICKER_TIME * 0.3) * index, () => {
				sticker.tween(vec2(STICKER_SCALE), vec2(STICKER_SCALE + 0.1), 0.05, (p) => sticker.scale = p, easings.easeInQuint).onEnd(() => {
					sticker.destroy()
					stickerAmount--
					// debug.log(stickerAmount + "/" + maxStickersAmount)
					playSound("stickerKey").randomizePitch([-50, 50])
				})
			})
		})

		sceneLeave.cancel()
	})
}