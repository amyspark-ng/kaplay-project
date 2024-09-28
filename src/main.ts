import kaplay, { KAPLAYOpt } from "kaplay"
import "kaplay/global"

import { addCursor } from "./plugins/customCursor"
import { utils } from "./utils"
import { getCurrent, WebviewWindow } from "@tauri-apps/api/window"

import { volumeManager } from "./plugins/sound"
import { loadEverything, loadingScreen } from "./game/loader"
import * as env from "./game/env.json"
import { drag } from "./plugins/drag"

// ===== FLAGS =====
export let DEBUG = true
export const VERSION = "0.0.0"
export const PRODUCT_NAME = "amyspark-ng.clickery" // lol
export const SAVE_NAME = `${PRODUCT_NAME}_save`

export const libraryOpts = {
	width: 1024,
	height: 576,
	canvas: document.querySelector("#kanva"),
	debugKey: "f1",
	debug: DEBUG,
	loadingScreen: true,
	crisp: false,
	backgroundAudio: true,
	stretch: false,
	letterbox: false,
	maxFPS: 90,
} as KAPLAYOpt

// ===== GLOBALS =====
export let appWindow: WebviewWindow  = null
utils.runInDesktop(() => {
	appWindow = getCurrent()
	libraryOpts.stretch = true;
	libraryOpts.letterbox = true
})

const k = kaplay(libraryOpts)

// ===== WHERE THE GAME ACTUALLY STARTS =====
setCursor("none")

// All the loaidng
loadEverything()
onLoading((progress:number) => loadingScreen(progress))
onLoad(() => {
	addCursor()
	volumeManager()

	console.log(`GAME VERSION: ${VERSION}`)
	console.log(env.FAKE_KEY)
	go("gamescene")
})

// the top ones go below
layers([
	"background",
	"cursor",
], "cursor")

document.getElementById("kanva").addEventListener("mouseout", () => {
	// all of the objects that are draggable have this function
	if (drag.getCurDragging()) drag.getCurDragging().drop()
}, false);