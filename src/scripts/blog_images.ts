export const images = {};

const files_orginal: Record<string, any> = import.meta.glob(
	'/blog/_media/*.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)',
	{
		import: 'default',
		query: {
			as: 'metadata'
		},
		eager: true
	}
);
const files_avif: Record<string, string> = import.meta.glob(
	'/blog/_media/*.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)',
	{
		import: 'default',
		query: {
			w: '256;512;1024;2048;4096',
			format: 'avif',
			as: 'srcset'
		},
		eager: true
	}
);
const files_webp: Record<string, string> = import.meta.glob(
	'/blog/_media/*.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)',
	{
		import: 'default',
		query: {
			w: '256;512;1024;2048;4096',
			format: 'webp',
			as: 'srcset'
		},
		eager: true
	}
);
const files_jpeg: Record<string, string> = import.meta.glob(
	'/blog/_media/*.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)',
	{
		import: 'default',
		query: {
			w: '256;512;1024;2048;4096',
			format: 'jpeg',
			as: 'srcset'
		},
		eager: true
	}
);

const files_png: Record<string, string> = import.meta.glob(
	'/blog/_media/*.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)',
	{
		import: 'default',
		query: {
			w: '256;512;1024;2048;4096',
			format: 'png',
			as: 'srcset'
		},
		eager: true
	}
);
const files_preview: Record<string, string> = import.meta.glob(
	'/blog/_media/*.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)',
	{
		import: 'default',
		query: {
			w: '128',
			format: 'avif'
		},
		eager: true
	}
);

for (const file in files_orginal) {
	const metadata = files_orginal[file];
	const srcset_avif = files_avif[file];
	const srcset_webp = files_webp[file];
	const srcset_png = files_png[file];
	const srcset_jpeg = files_jpeg[file];
	const src_preview = files_preview[file];

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	images[file.substring(13)] = {
		metadata,
		preview: src_preview,
		//preload avif
		preload_sets: [0],
		srcsets: [
			{
				type: 'image/avif',
				set: srcset_avif
			},
			{
				type: 'image/webp',
				set: srcset_webp
			},
			{
				type: 'image/jpeg',
				set: srcset_jpeg
			},
			{
				type: 'image/png',
				set: srcset_png
			}
		]
	};
}
