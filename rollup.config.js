import pkg from './package.json';

export default [
	{
		input: 'index.js',
		output: [
			{
				file: pkg.browser,
				format: 'umd',
				name: 'chyme',
				sourcemap: true
			},
			{
				file: pkg.module,
				format: 'es',
				sourcemap: true
			}
		]
	}
];
