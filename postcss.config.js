module.exports = {
	modules: true,
	plugins: [
		require('postcss-import'),
		require('autoprefixer'),
		require('cssnano')
	]
}