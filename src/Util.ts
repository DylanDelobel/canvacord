import { fillTextWithTwemoji } from "@canvacord/emoji-parser";
import { CanvasRenderingContext2D } from "canvas";

export class Util {
    /**
     * Canvacord Utils
     */
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    /**
     * Renders emoji in canvas
     * @param ctx Canvas rendering context
     * @param message message to render
     * @param x x co-ordinate
     * @param y y co-ordinate
     */
    static async renderEmoji(ctx: CanvasRenderingContext2D, message: string, x: number, y: number): Promise<void> {
        return await fillTextWithTwemoji(ctx, message, x, y);
    }

    /**
     * Abbreviate the given number
     * @param num The number to abbreviate
     */
    static toAbbrev(num: number): string {
        if (!num || isNaN(num)) return "0";
        if (typeof num === "string") num = parseInt(num);
        const decPlaces = Math.pow(10, 1);
        const abbrev = ["K", "M", "B", "T"];

        let dat = "";

        for (let i = abbrev.length - 1; i >= 0; i--) {
            const size = Math.pow(10, (i + 1) * 3);
            if (size <= num) {
                num = Math.round((num * decPlaces) / size) / decPlaces;
                if (num == 1000 && i < abbrev.length - 1) {
                    num = 1;
                    i++;
                }
                dat = `${num}${abbrev[i]}`;
                break;
            }
        }
        return dat;
    }
}