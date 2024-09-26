
import { AudioPlayOpt, Key } from "kaplay";
import { GameSave, volumeProp } from "../gamesave.ts";

/**
 * Adds all the objects related to volume bar
 */
export function addSoundElements() {
	const bg = add([
		rect(width() / 6, 80, { radius: 2.5 }),
		pos(width() / 2, 0),
		anchor("top"),
		color(BLACK),
		stay(),
		opacity(0.75),
		z(999999999),
		"volElement",
	])
	
	const volumeText = bg.add([
		text("VOLUME"),
		pos(0, bg.height - 12),
		anchor("center"),
		scale(0.6),
		z(9999999999),
		"volElement",
		{
			update() {
				if (GameSave.sound.volume > 0) this.text = `VOLUME ${(Math.round(GameSave.sound.volume * 100))}%`
				else this.text = "MUTED"
			}
		}
	])

	// bars
	for (let i = 0; i < 10; i++) {
		bg.add([
			pos(-67 + i * 15, 30),
			rect(10, bg.height - 40, { radius: 1 }),
			opacity(0),
			anchor("center"),
			z(99999999999),
			"volElement",
			"bar",
			{
				volume: 0.1 * (i + 1),
				update() {
					if (GameSave.sound.volume.toFixed(1) < this.volume.toFixed(1)) this.opacity = 0.1
					else this.opacity = 1
				}
			}
		])
	}
}

export function volumeManager() {
	volume(GameSave.sound.volume)
	
	const soundElements = () => get("volElement", { recursive: true })

	let changeVolTune = 0
	let waitingTimer = wait(0)

	let soundManager = add([
		stay(),
		{
			update() {
				GameSave.sound.volume = Number(GameSave.sound.volume.toFixed(1))
				changeVolTune = map(GameSave.sound.volume, 0, 1, -250, 0)

				if (isKeyPressed("-")) {
					if (GameSave.sound.volume > 0) {
						GameSave.sound.volume -= 0.1
						volume(GameSave.sound.volume)
					}
					this.trigger("show")
				}

				else if (isKeyPressed("+" as Key)) {
					if (GameSave.sound.volume <= 0.9) {
						GameSave.sound.volume += 0.1
						volume(GameSave.sound.volume)
					}
					this.trigger("show")
				}
			}
		}
	])

	soundManager.on("hide", () => {
		if (soundElements().length === 0) return
		
		soundElements().forEach(soundElement => {
			destroy(soundElement)
		});
	})

	soundManager.on("show", () => {
		if (soundElements().length === 0) addSoundElements()

		waitingTimer.cancel()
		waitingTimer = wait(1, () => {
			soundManager.trigger("hide")
		})
		
		play("volumeChange", { detune: changeVolTune })
	})

	return soundManager;
}

// ======= SOUND PLAYING ==========

type playSoundOpts = AudioPlayOpt & {
	soundChannel: volumeProp
}

export function playSound(soundName: string, opts:playSoundOpts) {
	play(soundName, { 
		...opts,
		volume: opts.soundChannel.muted ? 0 : opts.soundChannel.volume	
	})
}