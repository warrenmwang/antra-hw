## Questions

1. What’s package.json and package-lock.json?
> These two JSON files contain configuration data for a JS project, including information
> such as third party library package names and their versions and custom scripts
> for development or building the project for a production release.
> They also contain other meta data on the project such as project name, project version,
> and configuration details for dev tools like ESLint.
> While some parts of `package.json` can be modified manually like writing your 
> own scripts, `package-lock.json` is a generated file and should not be modified.
> The most important purpose of these two files is ensuring that different developers
> of the project use the same versions of the JS packages for the application.

2. What’s the difference between npm and npx?
> The `npm` command is used to manage your node modules or JS library dependencies. 
> It will directly modify your current project's package*.json files when you install or remove
> packages.
> The `npx` command is used to run commands from any npm package, either from local ones or not.
> If you use `npx` to run a command from a package that you don't have in your local node_modules
> or local npm cache, node will fetch that command from the respective package and save it in the cache
> (something like `~/.npm/_npx`), which doesn't affect your project or pollute the global PATH.

3. What is babel?
> Babel is a JS transpiler that converts your source JS code into JS code of a potentially 
> different ECMAscript standard, depending on the minimum browsers' versions you want to support.
> For example if you write JS following ES7 but the browsers you support can only run
> JS of ES5, then you will need to use a tool like Babel to transpile your JS.

4. What is webpack?
> Webpack is a JS module bundler. Module bundlers process your JS code which may span
> multiple files and have third party library dependencies, which browsers may not know how 
> to run natively, into a single, minified file that is browser ready. Webpack 
> also has the concept of loaders which are other pre-processors that can do extra
> stuff before bundling such as running Babel transpilation and/or resolving CSS style imports.

