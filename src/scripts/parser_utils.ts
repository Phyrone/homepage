import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { VFile } from 'vfile';
import jsYaml from 'js-yaml';

export function json_stringify() {
	/**
	 * @type {Compiler}
	 */
	function compiler(tree: any) {
		return JSON.stringify(tree);
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	this['compiler'] = compiler;
}

export function extract_metadata_compiler() {
	function compiler(tree: any) {
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
