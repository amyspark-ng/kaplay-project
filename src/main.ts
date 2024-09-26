import kaplay, { KAPLAYOpt } from "kaplay"
import "kaplay/global"

import { loadEverything, loadingScreen } from "./loader"
import { addCursor } from "./plugins/customCursor"
import { utils } from "./utils"
import { getCurrent, WebviewWindow } from "@tauri-apps/api/window"
import { GameSave } from "./gamesave"

import * as env from "./env.json"
import { volumeManager } from "./plugins/sound"

// ===== FLAGS =====
let DEBUG = true
const VERSION = "0.0.0"
console.log(`GAME VERSION: ${VERSION}`)

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
GameSave.load()
loadEverything()
onLoading((progress:number) => loadingScreen(progress))
onLoad(() => {
	addCursor()
	volumeManager()
	
	go("gamescene")
})

// the top ones go below
layers([
	"background",
	"cursor",
], "cursor")

// make sure ENV exists
console.log(env.FAKE_KEY)