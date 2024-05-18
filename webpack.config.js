//webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "@pages": path.resolve(__dirname, "src", "pages"),
            "@core": path.resolve(__dirname, "src", "core"),
            "@component": path.resolve(__dirname, "src", "component"),
            "@images": path.resolve(__dirname, "src", "assets", "images"),
            "@icon": path.resolve(__dirname, "src", "assets", "icon"),
            "@utils": path.resolve(__dirname, "src", "utils"),
            "@redux": path.resolve(__dirname,"src", "redux"),
            "@api": path.resolve(__dirname,"src", "api"),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.scss$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader','sass-loader'],
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 5000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
};