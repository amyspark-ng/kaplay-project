import { Color, Comp, Outline, Quad } from "kaplay";

interface drawDumbOutlineComp extends Comp {
	/** Outline size */
	outlineSize: number,
	outlineColor: Color,
}

/** Comp that draws a dumb outline with size */
export function drawDumbOutline(outlineSize: number, outlineColor: Color) : drawDumbOutlineComp {
	return {
		id: "drawDumbOutline",
		require: [ "sprite" ],
		outlineSize: outlineSize,
		outlineColor: outlineColor,
		
		add() {
			let quad:Quad = null;
			getSprite(this.sprite).then((data) => quad = data.frames[0] )
			const u_time = 1
			const u_pos = vec2(quad.x, quad.y)
			const u_size = vec2(quad.w, quad.h)
			const u_color = this.outlineColor

			this.parent.onDraw(() => {
				drawSprite({
					width: this.width + this.outlineSize,
					height: this.height + this.outlineSize,
					sprite: this.sprite,
					pos: this.pos ?? vec2(0, 0),
					angle: this.angle ?? 0,
					color: BLACK,
					anchor: this.anchor ?? "topleft",
					opacity: this.opacity ?? 1,
					shader: "saturate",
				})
			})
		},
	}
}