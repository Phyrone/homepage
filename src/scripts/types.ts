import type Hls from 'hls.js';

export type VideoQuality = {
	name?: string;
	height: number;
	width: number;
};
export type VideoSource = {
	thumbnail?: string;
} & (
	| { type: 'none' }
	| {
			type: 'hls';
			src: string;
			fallback?: string[];
	  }
	| {
			type: 'plain';
			src: {
				src: string;
				label?: string;
				height?: number;
			}[];
	  }
	| {
			type: 'static';
			base: string;
			subsets: string[];
	  }
);
