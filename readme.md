
## Stack

React, Redux, firebase, CSS modules, SASS and Webpack as build tool.

## Config firebase

Go to config.js and add up firebase credential to match that of yours

## Installation & running

Install `npm` and `nodejs` if you haven't.

Then run the follwoing command

```sh
npm i
```

```sh
npm run build
```

```sh
npm run dev
```

## Test

```sh
npm run test
```


## What happen during build

This build command will generates files like bundle.js, bundle.css, index.html and assets. Those are store in `dist` folder ready to be shipped.

This build will create  one js file and one css file - `bundle.css` and `bundle.js`

Wepack will auto insert css and js link into index.html

The css and js file name will have hash as query string

On each build commnad, the dist folder will be deleted, a new one with content will replace it.

All the asset in image folder and font folder will be copied into it's relavent folders in dist during the build

## Folder structure 

`app` contains components and logic

`dist` contains the code that is ready to ship

`node_modules` open source libraries/dependcies that we need to use in the app

`test` this we where we put our test code in.

`.editorconfig` this file guides your text editor how to format code base on a preset rule. Your editor need to install editor config plugin for this to work. Overall you don't really need this thing.

`eslintrc` eslint config file

`eslintignore` contains the entries/files/codes black list that we don't want to lint during linting


`webpack.config.babel.js` contains insutruction of how we want our code to be built. What file name we want it to be, where to we want to save it after build complete, etc...

`webpack.test.config.babel.js` is simliar to `webpack.config.babel.js` but this is for bundling our test code. Why would we to build/bundle our code? there will be a session explain this later.


## Golbal CSS Rules

global rules are imported in page.js component. They are available across the app


## How to create a component

Let's say you want to create a register form component, here is how you do it

`Register.js`

```
import React from 'react'
import 'register.scss'
export default class Register extends React.Component {
	render() {
		return (
			<div className="register">
				<input type="text" name="username"  />
			</div>
		)
	}
}
```

This file will be put within the directory app/component. How you want to organize sub folder is entirely up to you.

## Naming Convention

Component names start with capitalized letter and then fowllow with cammel case rule. File extension is `.js`

CSS names follow cammel case rule, file extension is `.scss`, regardless the content is sass or postcss or just css

CSS class selectors are lowercased connected with hyphen 

Folder names follow cammel case rule

Asset like images, fonts follow cammel case rule

## Use redux in this app

Create action 

Import acction file to mainAction.js

Create reducer

import reducer to mainReducer.js

Then map state to props

In mainReducer.js, within the combineReducer function, add an entry with your reducer name

## How to add image asset to project

Images asset is store in image folder. You can make sub folder to suit your need.

You need to stop the dev server and run build commmand after you add new images. So the new images will be regconized by the dev server.

## Creating new folder in project

When creating a new folder in the project, the dev server must be restarted. Right now this process is not autmated. Developers need to restart manually.

## Automatic resolve file system

This file system basically allow to import file/module by just doing like so

`import Header from 'Header'`

As you can there's is no path needed. Just file name. 

To use this system your file name should be uniqe.

But there is case you have two file with the same name, you can import them like this

`import Header from 'userAccountFolder/Header'`

`import Header from 'adminfolder/Header'`

Just add the path to differencite the two file.

If you have mistakenly imported two file with the same name. Don't worry. Webpack build system will automatically tell you that you have duplicated file name. You can resolve it by adding the path.


## Support

If you have problem running this app, let me know via my email  craigcosmo@gmail.com







