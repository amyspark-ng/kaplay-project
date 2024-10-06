import kaplay, { KAPLAYOpt } from "kaplay"
import "kaplay/global"

import { addCursor } from "./plugins/features/customCursor"
import { utils } from "./utils"
import { getCurrent, WebviewWindow } from "@tauri-apps/api/window"

import { loadEverything, loadingScreen } from "./game/loader"
import * as env from "./game/env.json"
import { drag } from "./plugins/features/drag"
import { setupSoundtray } from "./plugins/features/soundtray"
import { setupLayers } from "./game/layers"
import { sceneNameType, setupScenes } from "./game/scenes"

// ===== FLAGS =====
export let DEBUG = true
export const VERSION = "0.0.0"
export const PRODUCT_NAME = "amyspark-ng.clickery" // lol
export const SAVE_NAME = `${PRODUCT_NAME}_save`
export const STARTING_SCENE:sceneNameType = "title"
document.title = PRODUCT_NAME.replace("amyspark-ng.", "")

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

// All the loading
loadEverything()
onLoading((progress:number) => loadingScreen(progress))
onLoad(() => {
	addCursor()
	setupScenes()

	console.log(`GAME VERSION: ${VERSION}`)
	console.log(env.FAKE_KEY)
	go(`${STARTING_SCENE}`)
	setupSoundtray()
})

setupLayers()

// for drag
document.getElementById("kanva").addEventListener("mouseout", () => {
	// all of the objects that are draggable have this function
	if (drag.getCurDragging()) drag.getCurDragging().drop()
}, false);