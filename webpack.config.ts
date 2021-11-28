import path from 'path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

const config = {
    entry: './src',
    optimization: { minimize: true, minimizer: [new TerserPlugin({ parallel: true })] },
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.(j|t)s$/,
                use: [
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-runtime'],
                            presets: ['@babel/preset-env', '@babel/preset-typescript'],
                        },
                    },
                ],
            },
        ],
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
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new CompressionPlugin(),
        new webpack.ProvidePlugin({ process: 'process/browser' }),
    ],
};

export default config;
