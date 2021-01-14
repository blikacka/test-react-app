module.exports = {
	compact: true,
	presets: [
		['@babel/preset-env', {
			targets: {
				browsers: ['last 2 versions', 'ie >= 11'],
			},
			spec: true,
			debug: false,
			shippedProposals: true,
		}],
		'@babel/preset-flow',
		'@babel/preset-react',
	],
	plugins: [
		['babel-plugin-styled-components', {ssr: false}],
		// Stage 0
		'@babel/plugin-proposal-function-bind',

		// Stage 1
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-logical-assignment-operators',
		['@babel/plugin-proposal-optional-chaining', {'loose': false}],
		['@babel/plugin-proposal-pipeline-operator', {'proposal': 'minimal'}],
		['@babel/plugin-proposal-nullish-coalescing-operator', {'loose': false}],
		'@babel/plugin-proposal-do-expressions',

		// Stage 2
		['@babel/plugin-proposal-decorators', {'legacy': true}],
		'@babel/plugin-proposal-function-sent',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-proposal-throw-expressions',

		['@babel/plugin-proposal-class-properties', {'loose': false}],
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-transform-object-assign',
		'@babel/plugin-transform-for-of',
		'@babel/plugin-transform-instanceof',
		'@babel/plugin-transform-classes',
		'@babel/plugin-transform-computed-properties',
		'@babel/plugin-transform-destructuring',
		'@babel/plugin-transform-function-name',
		'@babel/plugin-transform-object-super',
		'@babel/plugin-transform-parameters',
		'@babel/plugin-transform-shorthand-properties',
		'@babel/plugin-transform-spread',
		'@babel/plugin-transform-sticky-regex',
		'@babel/plugin-transform-template-literals',
		'@babel/plugin-transform-unicode-regex',
		'@babel/plugin-proposal-optional-catch-binding',
		'babel-plugin-transform-merge-sibling-variables',

		'babel-plugin-transform-inline-consecutive-adds',
		'babel-plugin-transform-minify-booleans',
		'babel-plugin-transform-property-literals',
		'@babel/plugin-syntax-dynamic-import',
	],
};
