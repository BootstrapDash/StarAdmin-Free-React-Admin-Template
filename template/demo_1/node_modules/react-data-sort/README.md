# React data sort

A simple react component that helps you sort and paginate a list of data.

[![GitHub license](https://img.shields.io/github/license/Corjen/react-data-sort.svg)](https://github.com/Corjen/react-data-sort/blob/master/LICENSE.md)
[![Build Status](https://travis-ci.org/Corjen/react-data-sort.svg?branch=master)](https://travis-ci.org/Corjen/react-data-sort)
![](https://img.shields.io/badge/size-7.19%20kB-brightgreen.svg) ![](https://img.shields.io/badge/gzip%20size-2.02%20kB-brightgreen.svg)

# The problem

You want to display a custom set of data in a table or list and want to be able to sort and/or paginate it. You also want to have freedom of
styling and a simple API.

# This solution

Components with a [render prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) like [Downshift](downshift) and React Router's
[Route](https://reacttraining.com/react-router/web/api/Route) are gaining popularity. The render prop pattern gives you maximum flexibility
in the way you render and style your components because the render prop itself doens't render anything.

I've made this component because I was looking for a React table component that would give me as much control as possible over rendering and
styling. I couldn't find it, so I decided to build something myself. This is my first open source React Component, any feedback or
contributions are very welcome!

> Note: If you need to render a really large dataset where performance is vital, something like
> [react-virtualized](https://github.com/bvaughn/react-virtualized) is probably a better fit.

# Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Props](#props)
* [Render prop function](#render-prop-function)
* [Examples](#examples)
* [Todo](#todo)
* [License](#license)

# Installation

This modules is distributed via [npm](https://www.npmjs.com/package/react-data-sort). You can install it with npm:

```
npm install --save react-data-sort
```

This package has `react` and `prop-types` as [peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies/). Make sure to install
them if you haven't.

# Usage

```javascript
import Datasort from 'react-data-sort'

const tableData = [{ id: 1, name: 'b', id: 2, name: 'c', id: 3, name: 'a' }]

function App() {
  return (
    <Datasort
      data={tableData}
      paginate
      render={({ data }) => (
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    />
  )
}

export default App
```

By default, it will return the data in the same order that you've given it. The above code will result in this table:

| ID  | Name |
| --- | ---- |
| 1   | b    |
| 2   | c    |
| 3   | a    |

# Props

## data

> `array` | defaults to `[]` An array of data that you want to render

## defaultDirection

> `string` | defaults to `desc` | can be `asc` or `desc` This is the direction in which the data is sorted by default.

## defaultSortBy

> `string` | defaults to `null` | can be null or an object key in your data array. This is the key by which your data is sorted.

## itemsPerPage

> `number` | defaults to `10` The number of items to show on one page. Only works if `paginate` prop is `true`.

## paginate

> `boolean` | defaults to `false`

Enables pagination functionality and slices your data to the current page.

## searchInKeys

> `array` | defaults to the keys of the first item in `data`

Sets the keys to search in

# Controlled vs Uncontrolled

The internal state manages `direction`, `sortBy`, `searchQuery` and `activePage`. In some cases, you want to control that state outside the component, for
example if you use `redux` or `mobx` to manage your state. You can set `direction`, `sortBy`, `searchQuery` and `active` as props, thus making that part of
the state 'controlled'.

# Render Prop Function

The render prop expects a function and doesn't render anything. It's argument is an object, with the internal state and a couple of actions.

```javascript
<Datasort
      data={tableData}
      paginate
      render={({
         data,
         activePage,
         pages,
         sortBy,
         searchQuery,
         // etc..
        }) => (
        // Render jsx stuff here
      )}
    />
```

## actions

You can change the internal state with these actions.

| property        | type                          | description                                            |
| --------------- | ----------------------------- | ------------------------------------------------------ |
| toggleDirection | `function()`                  | toggle the direction from `asc` to `desc` or viceversa |
| setDirection    | `function(direction: string)` | set the direction to `asc` or `desc`                   |
| prevPage        | `function()`                  | go to the previous page (only if `paginate` is true)   |
| nextPage        | `function()`                  | go to the next page (only if `paginate` is true)       |
| goToPage        | `function(index: number)`     | go to a specific page                                  |
| setSortBy       | `function(key: string)`       | set the key to sort the data by                        |
| reset           | `function()`                  | reset to the initial state                             |
| search          | `function(query: string)`     | search for a query in given data                       |

## state

These are the internal state values

| property    | type              | description                                       |
| ----------- | ----------------- | ------------------------------------------------- |
| activePage  | `number`          | the current active page                           |
| pages       | `number`          | the total amount of pages The current active page |
| sortBy      | `string` / `null` | the current key where the data is sorted by       |
| direction   | `string`          | the current direction where the data is sorted by |
| searchQuery | `string`          | the current search query                          |

# Examples

* [Uncontrolled example](https://codesandbox.io/s/2zmrjm564r)
* [Controlled example](https://codesandbox.io/s/4r08q2vx94)
* [Without pagination](https://codesandbox.io/s/4rw4pvykzx)

# TODO

* UMD build
* Add helpers for aria labels
* Change the name to something fancier?

# License

MIT
