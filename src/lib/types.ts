export type Color = Record<string | number, string>;

export type HSL = {
	h: number;
	s: number;
	l: number;
};

export type Options = {
	colors?: string[];
	names?: string[];
	preserve?: boolean;
	shades?: Shade[];
};

export type Palette = Record<string, Color>;

export type Shade = { name: string | number; lightness: number };
