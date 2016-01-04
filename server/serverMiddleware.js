import webpack			from 'webpack'
import config			from '../webpack.config'
import devMiddleware	from 'webpack-dev-middleware'
import hotMiddleware	from 'webpack-hot-middleware'

const compiler = webpack(config)

export default function applyMiddleware(app) {
	
	app.use(devMiddleware(compiler, {
	    noInfo: true, publicPath: config.output.publicPath, colors: true
	}))
	app.use(hotMiddleware(compiler))
} 
