import { DrawTextOpt } from "kaplay"
import { utils } from "../../utils";

type watches = {
	stringName: string,
	value: any,
	beingWatched?: boolean,
}

/** Array containing all the variables currently being watched */
export let watchedVariables:watches[] = []


/** Watch a var, must be run onUpdate so the value gets updated */
export function watchVar(stringName: string, value:any) {
	// watch is not on watchedVariables
	if (!watchedVariables.find(watch => watch.stringName == stringName)) {
		watchedVariables.push({ stringName, value })
	}

	// watch IS on watchedVariables, must update
	else {
		if (watchedVariables.find(watch => watch.stringName == stringName).beingWatched == true) {
			watchedVariables.find(watch => watch.stringName == stringName).value = value
		}
	}
}

export function unwatchVar(stringName: string) {
	watchedVariables.find(watch => watch.stringName == stringName).beingWatched = false
}

/** Sets up the debug watcher */
export function setupWatch() {
	const watchDebug = add([
		stay(),
	]).onDraw(() => {
		if (debug.inspect == false) return

		let watchesText:string = ""

		watchedVariables.forEach((watch) => {
			if (watch.beingWatched == false) return
			watchesText += `${watch.stringName}: ${watch.value}\n`
		})

		const textOpts = {
			text: watchesText,
			size: 16,
			anchor: "left",
			align: "left",
		} as DrawTextOpt

		const formattedText = formatText(textOpts)

		const padding = 20;
		let textPos = vec2(padding, padding)
		const squarePos = vec2(width() - padding / 2, padding / 2)
		let squareWidth = formattedText.width + padding
		let squareHeight = formattedText.height + padding

		drawRect({
			width: squareWidth,
			height: squareHeight,
			color: BLACK,
			anchor: "topright",
			pos: squarePos,
			opacity: 0.8,
			radius: 4,
			fixed: true,
		})

		textPos.x = squarePos.x - squareWidth + 10
		textPos.y = squarePos.y + squareHeight / 2
		textOpts.pos = textPos
		drawText(textOpts)
	})
}