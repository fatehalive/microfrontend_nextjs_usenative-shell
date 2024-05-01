import pkg from './package.json' assert { type: 'json' }
const deps = pkg.dependencies;

const remotes = function (isServer) {
    const location = isServer ? 'ssr' : 'chunks';
    return {
        // specify remotes
        remote: `remote@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    };
}

const shareConfig = {
    ...deps,
    react: {
        eager: true
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    webpack: (config, options) => {
        const { webpack, isServer } = options
        const { ModuleFederationPlugin } = webpack.container

        // Add Plugins
        config.plugins.push(
            new ModuleFederationPlugin({
                name: 'host',
                filename: 'static/chunks/remoteEntry.js',
                remotes: remotes(isServer),
                shared: shareConfig
            })
        )

        if (!options.isServer) {
            config.module.rules.push({
                test: /\.+\.(js|jsx|mjs|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [['next/babel']],
                    plugins: [
                        ['@babel/plugin-transform-runtime', {
                            regenerator: true,
                            useESModules: true,
                        }]
                    ],
                },
            });
        }

        return config
    }
}
export default nextConfig;