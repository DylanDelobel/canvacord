import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import { readFile } from "fs/promises";
import { Font as FontData } from "satori";
import { FontFactory } from "./AssetsFactory";
import { GlobalFonts } from "@napi-rs/canvas";
import { Fonts } from "./fonts/fonts";

const randomAlias = () => randomUUID() as string;

let defaultLoaded: Font;

export class Font {
  /**
   * Creates and registers a new Font instance for both canvas and builder apis.
   * @param data The font data
   * @param [alias] The font alias. If not provided, a random UUID will be used.
   *
   * const data = await readFile('path/to/font.ttf');
   * const font = new Font(data, 'my-font');
   
   */
  public constructor(public data: Buffer, public alias = randomAlias()) {
    GlobalFonts.register(data, alias);
    FontFactory.set(this.alias, this);
  }

  /**
   * The alias for this font.
   */
  public get name() {
    return this.alias;
  }

  /**
   * Returns the font data that includes information such as the font name, weight, data, and style.
   */
  public getData(): FontData {
    return {
      data: this.data,
      name: this.alias,
      weight: 400,
      style: "normal",
    };
  }

  /**
   * String representation of this font.
   */
  public toString() {
    return this.alias;
  }

  /**
   * JSON representation of this font.
   */
  public toJSON() {
    return this.getData();
  }

  /**
   * Creates a new Font instance from a file.
   * @param path The path to the font file
   * @param [alias] The font alias. If not provided, a random UUID will be used.
   *
   * const font = await Font.fromFile('path/to/font.ttf', 'my-font');
   
   */
  public static async fromFile(path: string, alias?: string) {
    const buffer = await readFile(path);
    return new Font(buffer, alias);
  }

  /**
   * Creates a new Font instance from a file synchronously.
   * @param path The path to the font file
   * @param [alias] The font alias. If not provided, a random UUID will be used.
   *
   * const font = Font.fromFileSync('path/to/font.ttf', 'my-font');
   */
  public static fromFileSync(path: string, alias?: string) {
    const buffer = readFileSync(path);
    return new Font(buffer, alias);
  }

  /**
   * Creates a new Font instance from a buffer.
   * @param buffer The buffer containing the font data
   * @param [alias] The font alias. If not provided, a random UUID will be used.
   *
   * const buffer = await readFile('path/to/font.ttf');
   * const font = Font.fromBuffer(buffer, 'my-font');
   
   */
  public static fromBuffer(buffer: Buffer, alias?: string) {
    return new Font(buffer, alias);
  }

  /**
   * Loads the default font bundled with this package.
   *
   * const font = Font.loadDefault();
   
   */
  public static loadDefault() {
    if (defaultLoaded) return defaultLoaded;
    defaultLoaded = Font.fromBuffer(Fonts.Geist, "geist");
    return defaultLoaded;
  }
}
