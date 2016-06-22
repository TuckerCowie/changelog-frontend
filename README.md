# Changelog Frontend

By @TuckerCowie for @TheChangelog 2016

+ [Prerequisites](#prerequisites)
+ [Getting Started](#getting-started)
	+ [Building the deliverables](#building-the-deliverables)
	+ [Watching the source files](#watching-the-source-files)
+ [Gulp Toolchain Documentation](#gulp-toolchain-documentation)

## Prerequisites

+ [Node.js](https://nodejs.org/en/) @^stable
+ [Gulp](http://gulpjs.com/) @^3.x (`npm i -g gulp@^3`)
+ _Optional:_ [Livereload](http://livereload.com/extensions/)

## Get Started

Simply run `npm i` to install dependencies and compile all deliverables.

### Building the deliverables

To build all the derrived files manually, run the following command:

```bash
npm build
```

_**NOTE** The build command is run automattically after `npm install`_

### Watching the source files

To watch the source files and pipe changes to [livereload](http://livereload.com/) for active development, run the following command:

```bash
npm start
```

## Gulp Toolchain Documentation

Command/Task | Description | Dependencies
-------------|-------------|-------------
`gulp` | Compiles `sass` and `pug` files into `/dist` | `sass`, `views`
`gulp clean` | Deletes `/dist` from the filesystem |
`gulp watch` | Watches `sass` and `pug` files and livereloads changes | `clean`, `default`
`gulp views` | Compiles prettyfied `pug` templates into `/dist` |
`gulp sass` | Compiles compress `sass` templates and sourcemaps into `/dist` |