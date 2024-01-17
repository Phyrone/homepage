import jsYaml from 'js-yaml';

export function json_stringify() {
	/**
	 * @type {Compiler}
	 */
	function compiler(tree: unknown) {
		return JSON.stringify(tree);
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	this['compiler'] = compiler;
}

export function extract_metadata_compiler() {
	function compiler(tree: unknown) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (!tree || typeof tree !== 'object' || tree.children === undefined) return JSON.stringify({});

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const first_block = tree.children[0];

		if (first_block.type == 'yaml') {
			return JSON.stringify(jsYaml.load(first_block.value));
		}

		return JSON.stringify({});
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	this['compiler'] = compiler;
}
