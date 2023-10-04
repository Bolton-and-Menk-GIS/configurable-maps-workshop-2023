# configurable-maps-workshop-2023

Workshop Materials for the 2023 MN GIS LIS Conference in Duluth, MN. October 4th, 9 am - 5 pm.

- [configurable-maps-workshop-2023](#configurable-maps-workshop-2023)
- [Getting Started](#getting-started)
- [1. Installation](#1-installation)
  - [IDE Setup](#ide-setup)
    - [Typescript Support](#typescript-support)
  - [Vue CLI (Legacy)](#vue-cli-legacy)
  - [Vite Setup](#vite-setup)
  - [Browser Plugin](#browser-plugin)
- [TypeScript Basics](#typescript-basics)
  - [Primitive Types](#primitive-types)
  - [Advanced Types](#advanced-types)
    - [Interfaces](#interfaces)
    - [Unions and Intersections](#unions-and-intersections)
    - [Type Aliases](#type-aliases)
    - [Generics](#generics)
    - [Conditionals](#conditionals)
  - [Typescript Configuration](#typescript-configuration)
- [About Vue](#about-vue)
  - [Comparison to Other Frameworks](#comparison-to-other-frameworks)
  - [Components](#components)
    - [Lifecycle Hooks](#lifecycle-hooks)
  - [Performance](#performance)
    - [The Virtual DOM](#the-virtual-dom)
    - [Vapor Mode](#vapor-mode)
- [Template Syntax](#template-syntax)
  - [String Interpolation](#string-interpolation)
  - [Directives](#directives)
    - [Using v-model](#using-v-model)
    - [Conditionals](#conditionals-1)
    - [Lists with v-for](#lists-with-v-for)
    - [Event handling with v-on](#event-handling-with-v-on)
  - [Class and Style Binding](#class-and-style-binding)
- [Options API (legacy)](#options-api-legacy)
- [Composition API](#composition-api)
  - [Reactivity Fundamentals](#reactivity-fundamentals)
    - [ref](#ref)
    - [reactive](#reactive)
    - [computed](#computed)
    - [watch and watchEffect](#watch-and-watcheffect)
- [Single File Components](#single-file-components)
  - [Setup Function](#setup-function)
  - [Setup Script (Recommended)](#setup-script-recommended)
    - [TypeScript Support (Macros)](#typescript-support-macros)
      - [defineProps \& defineEmits](#defineprops--defineemits)
      - [defineSlots](#defineslots)
      - [defineExpose](#defineexpose)
    - [Async Components](#async-components)
    - [Using Generics with Props](#using-generics-with-props)
  - [Scoped CSS](#scoped-css)
- [Using Slots](#using-slots)
  - [Default Slot](#default-slot)
  - [Named Slots](#named-slots)
  - [Scoped Slots](#scoped-slots)
- [Using the Composition API](#using-the-composition-api)
  - [Composable Functions](#composable-functions)
  - [@vueuse](#vueuse)
- [Advanced Usage](#advanced-usage)
  - [render functions](#render-functions)
  - [JSX/TSX Support](#jsxtsx-support)
  - [Dynamic Components](#dynamic-components)
- [Core Plugins](#core-plugins)
  - [Vue Router (SPA)](#vue-router-spa)
    - [Defining Routes](#defining-routes)
      - [Passing Props](#passing-props)
    - [Navigation Guards](#navigation-guards)
  - [Pinia (state management)](#pinia-state-management)

# Getting Started

This workshop has two ways to approach it. VMs are available for individuals who would like to get right into the application building process and not have to install a bunch of unfamiliar tools on your personal laptops. The downside to the VMs is that once you leave the workshop, you lose all of your work (unless you plan on forking this repo to your own github accounts), so consider heavily whether you would like to take the time to set up your development environment locally or quickstart this workshops with the VM. Skip ahead to the [About Vue](#about-vue) section if you're using a VM, otherwise, continue with the installation steps below.

# 1. Installation

There's three main components to the installation process: your IDE, your build tools, and your dev tools. We'll go over what we're using in this project, as well as some other options that have been necessary prior to the release of the most recent tools.

## IDE Setup

IDE stands for Integrated Development Environment. This is your main environment for interacting with all of your build tools. From here, you will select and install the build tools you want. Your main action items are:

- [ ] Get Visual Studio Code (VSCode): https://code.visualstudio.com/
- [ ] configure basic plugins: ESLint, Prettier, Vue language features Volar, Vue VSCode snippets

For the plugins, you can grab just the basic ones from the store on the Extensions tab on the left of the VSC environment. You can also search for "Vue Volar Extension Pack", which will install the 9 packages found on the VMs. Not all of these are necessary. You will have to visit the store page for each of these to get the most functionality out of them, but the ones listed specifically in the action item will be covered in this workshop to some extent or another.

### Typescript Support

If you did not install the Vue Volar Extension Pack from the previous section, please search for and install:

- [ ] TypeScript Vue Plugin (Volar)

This is what this workshop will rely on for the majority of our code autocompletion and type checking. VSCode does have its own typescript plugins, but since we will be working with .vue files, we will want the extra compatibility this plugin brings to our project.

## Vue CLI (Legacy)

This is the old way of doing things. The official docs give a quick overview of what this all is. https://cli.vuejs.org/guide

Lately, people have been stepping away from Vue CLI in favor of Vite. (You can even see this warning at the top of the page when you visit the link.) We won't be using this this build tool, but it's good to know that the primary reason for Vue CLI was to bundle and translate modern code into older code to deploy on the internet BCE (Before Current ~~Microsoft~~ Edge). Keywords: Internet Explorer, ES4, ES6 / ESM, Webpack.

## Vite Setup

As noted earlier, Vite will be our primary build tool. It's fast. Like, really fast. Slacking off because "your code is compiling" is no longer an excuse. Let's get up and running with Vite by going into our VSC terminal and entering:

- [ ] npm create vite@latest

You'll be asked a bunch of questions about how you want to setup your environment. Check in with Part 1 the timeline mapper for a list of recommended setup methods. It doesn't hurt to run this command a couple of times with different parameters to see what environment each one nets you. You can always delete the created projects and try again.

## Browser Plugin

With the Vue browser plugin, we can inspect things without needing to console.log() them. We can also look at our variables throughout time to see how they change during the application, or inject values to them to change our application state without needing to update our code in VSC. Download it from the chrome web store below.

- [ ] https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd

# TypeScript Basics

TypeScript is a superset of JavaScript that enhances the developer experience and results in safer and more reliable code by including static typing and improving the tooling and IDE support. JavaScript was created as scripting language with loose and dynamic variables with the intention of only making simple changes to websites. Over the years, JavaScript has evolved and is now used in full stack development and large scale applications can be difficult to maintain and finding bugs isn't always obvious. This is where TypeScript can be useful to prevent bugs by showing errors when using the wrong data types. Readability is also improved as the function signatures will show exactly what parameters are expected in great detail as well as the return types.


* Strong Typing: TypeScript introduces static typing to JavaScript, allowing developers to specify types for variables, function parameters, and return values. This helps catch errors during development and provides better code documentation and tooling support.

* Enhanced IDE Support: TypeScript provides improved support for code editors and integrated development environments (IDEs). With type information, IDEs can offer features like autocompletion, intelligent code navigation, and error detection, leading to enhanced productivity and fewer bugs.
  
* Improved Maintainability: By enforcing strict typing, TypeScript makes code easier to read, understand, and maintain. Types help in documenting the expected structure of data and enable developers to catch potential issues early on, reducing bugs and improving long-term code maintainability.
  
* Advanced Language Features: TypeScript is a superset of JavaScript, meaning it includes all JavaScript features and adds additional functionalities. These include features like classes, interfaces, generics, modules, and decorators, which aid in writing cleaner and more organized code.

* Better Collaboration: With TypeScript, developers can define clear contracts using interfaces and types, which improves communication and collaboration among team members. The shared understanding of data structures and interfaces facilitates teamwork and reduces misunderstandings.
  
* Code Refactoring and Scalability: TypeScript allows for easier refactoring due to its strong typing and tooling support. As projects grow in size and complexity, TypeScript's ability to catch errors early and support large codebases makes it easier to maintain and scale applications.
  
* Compatibility with JavaScript Ecosystem: TypeScript is designed to be a superset of JavaScript, so existing JavaScript code can be seamlessly integrated into TypeScript projects. It offers incremental adoption, allowing developers to gradually introduce TypeScript into their existing JavaScript codebases.

## Primitive Types

Just the basics such as `string`, `number`, and `boolean`

## Advanced Types

Includes custom interfaces, type aliases and [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### Interfaces
A quick way to define properties for an object

### Unions and Intersections

use one of several types (union) or combine properties from 2 or more types (intersection)

### Type Aliases

can create new types from combinations of other typings

### Generics

Very powerful feature, can be used to pass in custom typings to create more dynamic types. 

[https://www.typescriptlang.org/docs/handbook/2/generics.html](https://www.typescriptlang.org/docs/handbook/2/generics.html)

### Conditionals

Another powerful feature to infer typings based on conditions

## Typescript Configuration

TypeScript projects should contain a [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file for the TypeScript Settings

# About Vue

Our Framework of choice for this course. From here on, we'll be relying heavily on the official documentation, as it often includes videos, interactive examples, and in-depth explanations.

- [ ] Check out the video and "get started" link at https://vuejs.org/
- [ ] Take a quick Vue quiz to see what you know https://www.w3schools.com/vue/vue_quiz.php
- [ ] Interactive vue tutorial to learn the ropes https://vuejs.org/tutorial/#step-1

## Comparison to Other Frameworks

From personal experience, React and Ember seem to be popular ones in the ESRI realm, but we're not particularly fond of those for a number of reasons.

## Components

- [ ] You'll want to keep this one handy. Vue Components are very complex. https://vuejs.org/guide/essentials/component-basics.html

### Lifecycle Hooks

Follow the api refernce link at the bottom to read about each one in depth.
This diagram lays out the basic flow here. https://vuejs.org/guide/essentials/lifecycle.html

## Performance

Performance is always an issue when using maps. Code splitting and lazy loading will be your friends. https://vuejs.org/guide/best-practices/performance.html

### The Virtual DOM

The magic of template strings and v-bind. https://vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom

### Vapor Mode

An experimental option for future versions of Vue that will let you opt out of the virtual DOM.

# Template Syntax

< template /> is the way. There's other ways of doing it, but please don't ever consider them unless you're trying to retrofit Vue into some existing app and you don't want to overhaul everything. https://vuejs.org/guide/essentials/template-syntax.html#template-syntax

## String Interpolation

`{{ IsGoodStuff }}` https://vuejs.org/guide/essentials/template-syntax.html

## Directives

Here's the cheatsheet. The W3 schools quiz link from earlier is great to learn this stuff quickly and interactively. https://vuejs.org/api/built-in-directives.html

### Using v-model

This is your bread and butter. If you have to remember one thing about Vue, remember v-model. https://vuejs.org/guide/components/v-model.html

### Conditionals

`v-if`, `v-else`, and `v-show`! https://vuejs.org/guide/essentials/conditional.html

### Lists with v-for

Everyone loves a good for-loop. Vue has that too. https://vuejs.org/guide/essentials/list.html

### Event handling with v-on

Listening for events is essential in every application. Vue gives you a lot of control over what happens with `v-on` https://vuejs.org/guide/essentials/event-handling.html

## Class and Style Binding

More of the magic of v-bind with the virtual DOM https://vuejs.org/guide/essentials/class-and-style.html

# Options API (legacy)

Useful to know if you're familiar with Vue 2 and like how things are generally structured. We won't be using this in our workshop. https://vuejs.org/guide/typescript/options-api.html#typing-component-props

# Composition API

Loses access to the 'this' instance the Options API provides in favor of fine-grained control of individual variables and methods. Much easier to share items between components. https://vuejs.org/guide/typescript/composition-api.html#typescript-with-composition-api

## Reactivity Fundamentals

Vue has many ways to keep watch over variables in a project, and each system has it's pros and cons. Learn about Vue's reactivity system and styles here. https://vuejs.org/guide/essentials/reactivity-fundamentals.html

### ref

Wraps items in a reactive shell that can be watched by Vue.
https://vuejs.org/guide/essentials/reactivity-fundamentals.html

### reactive

Makes objects themselves reactive, no wrapper needed. Only works for Objects, however.
https://vuejs.org/guide/essentials/reactivity-fundamentals.html

### computed

These allow us to instantly process data into a different form, with the added benefit of caching those results, saving on computations.
https://vuejs.org/guide/essentials/computed.html

### watch and watchEffect

These give us the ability to trigger side effects with custom functions when ever something we watch for happens.
https://vuejs.org/guide/essentials/watchers.html

# Single File Components

One of the best parts about Vue. Having everything related to an individual piece of functionality all in one place! https://vuejs.org/guide/scaling-up/sfc.html#single-file-components

## Setup Function

Using the composition API in a more direct manner. Requires more explicit calls to initiate certain kinds of functionality. https://vuejs.org/api/composition-api-setup.html

## Setup Script (Recommended)

Where the magic happens. https://vuejs.org/api/sfc-script-setup.html#script-setup

### TypeScript Support (Macros)

We can use runtime declaration or type-based declaration to get typescript support in our Vue project. https://vuejs.org/guide/typescript/composition-api.html

#### defineProps & defineEmits

complier macros that let you quickly setup the use of props and emit handling events. https://vuejs.org/guide/typescript/composition-api.html

#### defineSlots

provides type hints to the IDE. Useful when you know more about an object than the IDE does. https://vuejs.org/api/sfc-script-setup.html#defineslots

#### defineExpose

This lets you share items between components without the need for the state store. https://vuejs.org/api/sfc-script-setup.html#defineexpose

### Async Components

Components that are very polite and will ask other components to be patient with them while they finish their tasks. https://vuejs.org/guide/components/async.html

### Using Generics with Props

## Scoped CSS

Adding `scoped` to your `<style>` tags will ensure all of your CSS stays limited to the component in which you're developing. No more global CSS shenanigans or playing "find the offender" when something randomly decides it wants to look different from what it's supposed to. https://vuejs.org/api/sfc-css-features.html#scoped-css

# Using Slots

Customizable parts of custom components! https://vuejs.org/guide/components/slots.html

## Default Slot

This is a slot you can pass to without having to ask for an introduction first. Anything you put between the `<ComponentTag>Will be picked up<ComponentTag>` and used by the default slot.

## Named Slots

He'll ignore you if you don't call him by his chosen name. Be courteous. https://vuejs.org/guide/components/slots.html#named-slots

## Scoped Slots

Doesn't want to do things alone. Will need help from the parent and child components to render fully. Very specialized. https://vuejs.org/guide/components/slots.html#scoped-slots

# Using the Composition API

Our Vue flavor of choice. (We will be using the `script setup` tag in our app, but it's good to look over how things are defined more explicitly with the setup function) https://vuejs.org/api/composition-api-setup.html#basic-usage

## Composable Functions

A nice way to code split out functions you find yourself using in multiple places. https://vuejs.org/guide/reusability/composables.html

## @vueuse

The magic of open source tool kits. If you have an idea for a good composable, someone else has probably thought of it already! Look for it here! https://vueuse.org/

# Advanced Usage

The stuff past this point is really cool advanced functionality, but we won't need any of it for this workshop.

## render functions

You want power? You got power. Take control of the DOM and component loading like you know better than Vue itself. https://vuejs.org/api/render-function.html

## JSX/TSX Support

Vue has some built-in "play-nice" with extended Javascript libraries. https://vuejs.org/guide/extras/render-function.html#jsx-tsx

## Dynamic Components

v-for and v-show are cool, but what if you can just pick the exact component you need instead of making a list and then showing only the one you want? https://vuejs.org/guide/essentials/component-basics.html#dynamic-components

# Core Plugins

The plugins listed below are useful for building advanced Vue applications with multiple pages.

## Vue Router (SPA)

When you have to swap out entire pages of an application and navigate to very different application states. https://router.vuejs.org/

### Defining Routes

There's a few different ways of defining routes. https://router.vuejs.org/guide/#router-view

#### Passing Props

Usually the route you're going to needs something from the route where you already are. Don't forget to pack your bags and bring your essentials! https://router.vuejs.org/guide/essentials/passing-props.html#Passing-Props-to-Route-Components

### Navigation Guards

We don't really want people mashing weird routes into the address bar and breaking the application state. Place some catch-all logic in there to 404 them back to the home page. https://router.vuejs.org/guide/advanced/navigation-guards.html#Navigation-Guards

## Pinia (state management)

The Single Source of Truth. (You can actually have more than one Pinia store in an app, but it's nice to have one place you can go to track the majority of your application state at a glance.) https://pinia.vuejs.org/
