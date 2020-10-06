import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import visualizer from "rollup-plugin-visualizer";

module.exports = {
    input: "src/Editable.js",
    output: {
        name: "Editable",
        file: "dist/editable.js",
        format: "cjs"
    },
    plugins: [
        nodeResolve(),
        babel({exclude: "node_modules/**"}),
        visualizer({filename: "bundleSize.html", open: true})
    ],
    external: ["react", "prop-types", "reactstrap"]
};