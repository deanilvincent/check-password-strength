import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json' with {type: "json"};

export default [
	{
		input: 'src/index.js',
		output: [
			{
				file: 'dist/umd.js',
				format: 'umd',
				name: 'checkPasswordStrength'
			},
		],
		plugins: [commonjs(), nodeResolve(), terser()]
	},
	{
		input: 'src/index.js',
		output: [
			{
				file: pkg.main,
				format: 'cjs',
			},
		],
		plugins: [commonjs(), nodeResolve()]
	},
	{
		input: 'src/index.js',
		output: [
			{
				file: pkg.module,
				format: 'es'
			}
		],
		plugins: [
			commonjs(),
			copy({
				targets: [
					{ src: 'src/index.d.ts', dest: 'dist' }
				]
			})
		]
	},
];
