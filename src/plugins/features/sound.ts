
import { AudioPlay, AudioPlayOpt, Key } from "kaplay";

// ======= SOUND PLAYING ==========
export class volumeChannel {
	muted: boolean = false;
	volume: number = 1;
}

/**
 * Custom interface that extends {@link AudioPlay `AudioPlay`}
 */
interface customAudioPlay extends AudioPlay {
	/**
	 * Randomized the pitch of the sound 
	 */
	randomizePitch: (minMax?: [number, number]) => void
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

	return audioPlayer
}
