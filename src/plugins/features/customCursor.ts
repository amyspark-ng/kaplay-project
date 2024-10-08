import { Comp } from "kaplay"
import { gameLayers } from "../../game/layers"

interface customCursorComp extends Comp {
	point: () =>  void
	default: () =>  void
}

function cursorComponent() : customCursorComp {
	return {
		id: "cursorComponent",
		
		point() {
			this.sprite = "pointer"
		},

		default() {
			this.sprite = "cursor"	
		}
	}
}

/**
 * Adds a cool mouse
 * @param lerpValue The lerp the cursor will move towards mousePos
 * @returns The mouse
 */
export function addCursor(lerpValue?:number) {
	setCursor("none")
	
	let theMousePos = mousePos()
	
	const mouse = add([
		sprite("cursor"),
		anchor("topleft"),
		pos(),
		cursorComponent(),
		stay(),
		fixed(),
		layer(gameLayers.cursor),
		"gameCursor",
		{
			update() {
				theMousePos = lerp(theMousePos, mousePos(), lerpValue ?? 0.8)

				if (isMouseMoved()) {
					mouse.pos = theMousePos
				}
			}
		}
	])

	return mouse;
}

export type cursorType = ReturnType<typeof addCursor>
export const gameCursor = () => get("gameCursor")[0] as cursorType