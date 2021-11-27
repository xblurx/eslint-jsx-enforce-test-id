import path from 'path';
import webpack, { ContextReplacementPlugin } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// @ts-ignore
import CompressionPlugin from 'compression-webpack-plugin';

const plugins = [
    new ForkTsCheckerWebpackPlugin(),
    new ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
    new CompressionPlugin(),
    new webpack.ProvidePlugin({ process: 'process/browser' }),
];

const tsLoader = (test: any) => {
    const presets = ['@babel/preset-env', '@babel/preset-typescript'];
    const plugins = ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-runtime'];

    const use = [
        'thread-loader',
        {
            loader: 'babel-loader',
            options: {
                plugins,
                presets,
            },
        },
    ];

    return {
        test,
        use,
    };
};

const rules = [tsLoader(/\.(j|t)s$/)];

const config = {
    entry: './src',
    optimization: { minimize: true, minimizer: [new TerserPlugin({ parallel: true })] },
    target: ['web', 'es5'],
    module: {
        rules,
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin()],
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        library: {
            type: 'umd',
            name: 'jsx-enforce-test-id',
        },
        clean: true,
    },
    plugins,
};

export default config;
