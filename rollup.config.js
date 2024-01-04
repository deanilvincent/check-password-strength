import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy'
import pkg from './package.json';

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
		plugins: [commonjs(), terser()]
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
					{ src: 'src/*', dest: 'dist' }
				]
			})
		]
	},
];
