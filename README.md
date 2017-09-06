# DOMino


## Getting Started
To get statrted with DOMino, download this library into your project and include the webpack output `DOMino.js` in your source code.

```html
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="./stylesheet/application.css">
  <script type="text/javascript" src="./DOMino.js"></script>
  ...
</head>
```

DOMino is a JavaScript DOM manipulation app that allow the user to interact with DOM node elements in the following way:
  * Select single or multiple DOM elements
  * Traverse and manipulate DOM elements
  * Build DOM elements
  * Create `DOMNodeCollection` objects from `HTMLElement`s
  * Queue functions until DOM is fully loaded
  * Simplify HTTP requests using ajax format


The demonstration involves utilizing a todo list app which interfaces with the DOM using the developed methods to add lists items to the DOM and to add styles to the view with use of a slider input. The list and slider utilizes the DOM manipulation methods and event-listeners.

![image of DOMino](ci_snippet.gif)

## API

[`$l`](#l)  

[DOM Traversal](#dom-traversal)  
  * [`each`](#each)  
  * [`children`](#children)  
  * [`parent`](#parent)  

[DOM Manipulation](#dom-manipulation)  
  * [`html`](#html)  
  * [`empty`](#empty)  
  * [`append`](#append)  
  * [`remove`](#remove)  
  * [`attr`](#attr)  
  * [`addClass`](#addclass)  
  * [`removeClass`](#removeclass)  
  * [`removeAllClasses`](#removeAllclasses)  

[Event Listeners](#event-listeners)  
  * [`on`](#on)  
  * [`off`](#off)  

[`$l.ajax`](#lajax)  

### $l

The DOMino library utilizes the global variable of `$l` as a wrapper for all of the methods in the DOMino library.  


`$l` is most commonly used to select elements with CSS selectors.   

`$l` can also be used to create `DOMNodeCollection` objects from unwrapped `HTMLElement`s giving these elements access to DOMino methods.  

The third use of `$l` takes in a string of HTML code, builds `HTMLElement`(s) from the code, and then wraps the `HTMLElement`(s) in a `DOMNodeCollection` object.

The final use of `$l` is as tool to queue functions to run once the COM is fully loaded.


### DOM Traversal

`DOMNodeCollection` methods to navigate DOM elements


#### `children`

Returns a `DOMNodeCollection` object containing all of the children elements of every `HTMLElement` in the original `DOMNodeCollection`.  Note that this only includes the direct children.

#### `parent`

Returns a `DOMNodeCollection` object containing the parent elements of every `HTMLElement` in the original `DOMNodeCollection`.  

### DOM Manipulation

`DOMNodeCollection` methods to view and/or change DOM elements

#### `html`

Returns the `innerHTML` for the first element in the `DOMNodeCollection` if no argument is given.  If a string argument is given, changes the `innerHTML` of each `DOMNodeCollection` element to the string argument.

#### `empty`

Empties the innerHTML of each `DOMNodeCollection` element

#### `append`

Takes a single `HTMLElement`, `DOMNodeCollection`, or `string` argument and appends it to each `DOMNodeCollection` element.

#### `remove`

Remove each `DOMNodeCollection` element from the DOM.

#### `attr`

Takes either one (`attr(attribute)`) or two (`attr(attribute, value)`) arguments.  If given one argument, the method gets the value of the attribute given for the the first element in the `DOMNodeCollection`.  The method sets the attribute, given as the first argument, as the value, given as the second argument, for each `DOMNodeCollection` element.

#### `addClass`

Adds a class, given as an argument, to each `DOMNodeCollection` element.

#### `removeClass`

Removes a class, given as an argument, from each `DOMNodeCollection` element.

#### `removeAllClasses`

Removes all associated classes, for each `DOMNodeCollection` element.

### Event Listeners

#### `on`

Adds event listener to each `DOMNodeCollection` element.  List of events are available [here](https://developer.mozilla.org/en-US/docs/Web/Events).

#### `off`

Removes event listener from each `DOMNodeCollection` element.

### $l.ajax

Accepts a `Hash` object as an argument with any of the following attributes:
  * method (default: "GET"): HTTP Request method or type
  * url (default: window.location.href): URL for HTTP Request
  * success: success callback
  * error: error callback
  * contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8'): content type of HTTP Request
