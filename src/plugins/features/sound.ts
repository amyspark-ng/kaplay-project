
import { AudioPlay, AudioPlayOpt, Key } from "kaplay";

// ======= SOUND PLAYING ==========
export class volumeChannel {
	muted: boolean = false;
	volume: number = 1;
}

/**
 * Custom interface that extends {@link AudioPlay `AudioPlay`}
 */
export interface customAudioPlay extends AudioPlay {
	/**
	 * Randomized the pitch of the sound 
	 */
	randomizePitch: (minMax?: [number, number]) => void
	/**
	 * Scratches a sound (like a record)
	 * @param change -1 being unscratch and 1 scratch
	 */
	scratch: (change: -1 | 1) => void
}

/**
 * Custom type that extends {@link AudioPlayOpt `AudioPlayOpt`}
 */
type customAudioPlayOpt = AudioPlayOpt & {
	channel?: volumeChannel
}

/**
 * Custom function for playing sound
 */
export function playSound(soundName: string, opts?:customAudioPlayOpt) : customAudioPlay {
	opts = opts ?? {} as customAudioPlayOpt
	opts.channel = opts.channel ?? { volume: 1, muted: false } as volumeChannel
	
	const audioPlayer = play(soundName, { 
		...opts,
		volume: opts.channel.muted ? 0 : opts.channel.volume,
	}) as customAudioPlay

	audioPlayer.randomizePitch = (minMax?: [number, number]) => {
		minMax = minMax ?? [-100, 100]
		audioPlayer.detune = rand(minMax[0], minMax[1])
	}

	audioPlayer.scratch = (change: -1 | 1) => {
		if (change == -1) {
			tween(audioPlayer.detune, audioPlayer.detune - 50, 0.3, (p) => audioPlayer.detune = p)
			tween(audioPlayer.speed, audioPlayer.speed * 0.8, 0.3, (p) => audioPlayer.speed = p)
			tween(audioPlayer.volume, 0, 0.3, (p) => audioPlayer.volume = p)
		}

		else if (change == 1) {
			tween(audioPlayer.detune, opts.detune, 0.3, (p) => audioPlayer.detune = p)
			tween(audioPlayer.speed, opts.speed, 0.3, (p) => audioPlayer.speed = p)
			tween(audioPlayer.volume, opts.volume, 0.3, (p) => audioPlayer.volume = p)
		}
	}

	return audioPlayer
}
