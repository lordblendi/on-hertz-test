// import CopyPlugin from "copy-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import path from "path"
import { Configuration } from "webpack"

module.exports = (): Configuration => ({
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        // new CopyPlugin({
        //     patterns: [{ from: "public" }],
        // }),
        new HtmlWebpackPlugin({
            chunksSortMode: "none",
            template: "./src/index.html",
        }),
    ],
})
