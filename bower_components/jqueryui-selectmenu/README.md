h2. jQuery UI Selectmenu Widget

This is an improved version of the jQuery UI selectmenu widget originally developed by Scott (filament group):
[[http://filamentgroup.com/lab/jquery_ui_selectmenu_an_aria_accessible_plugin_for_styling_a_html_select/]]

_Parts of this wiki are taken from the original description._

_Please note: This guide might be incomplete or have pending changes._ Be brave! Take a look in the source!

h3. Demos & Download

Latest development version: [[http://github.com/fnagel/jquery-ui/zipball/selectmenu]] (zip)
Latest stable release (v1.3): [[https://github.com/fnagel/jquery-ui/zipball/selectmenu_v1.3.0]] (zip)

Demos: [[http://jsfiddle.net/fnagel/GXtpC/embedded/result/]]

Please note: There is a new UI 1.9.x compatible, built from scratch version, please see issue #140.


h3. Features

* *Keyboard accessibility* The keyboard events match the native select implementation of popular browsers, including support for arrow keys, enter, space, tab, home, end, page up, and page down. The menu is keyboard accessible while closed as well!
* *ARIA support* ARIA attributes are added to the component, making this plugin an accessible replacement for a native select element (for users with modern screen readers).
* *Different menu types* Popup or dropdown (like native select)
* *jQuery UI Widget-factory-driven* Built using the standard jQuery UI widget pattern for creating widget instances.
* *Image support* Comes with advanced image support, see background_image.html demo file
* *ThemeRoller-Ready* Full theming support using jQuery UI ThemeRoller   
* *Form label association* If there's an associated form label on the page, clicking it will focus the selectmenu widget, and its "for" attribute will properly associate with the selectmenu widget for accessibility purposes.    
* *Option Text Formatting* The format option allows you to customize the text of every option, creating complex formatting not possible in native select elements.
* *Optgroup support* select elements with optgroups are translated into embedded HTML lists with a content-text label matching the optgroup's label.
* *Disable elements* Disable the complete selectmenu, single options or even optgroups
* *Quick Type-ahead* Like a native select menu, you can quickly access options by typing their letters.
* *Callback events* The selectmenu plugin provides callbacks for open, close, select, and change events, allowing you to execute scripting based on those events. The change event even triggers a change event on the original select element, allowing you to reliably track form change events.

h4. Tested Browsers

Firefox 3.6 - 6.x
IE 6-8
Chrome latest
Safari 3.x
Opera latest

(latest complete test: 06.11.11)

h4. Known problems

There are some minor problems but the widget is usable in every browser. We have a lot of feature requests and I’m looking for help. Even this guide is incomplete... Please see: [[https://github.com/fnagel/jquery-ui/issues]]



h3. Options and Configuration

The following options are available in this widget:

* *style:* 'popup' or 'dropdown' style
* *width:* Defaults to select width, accepts a number, fallback is native selec width
* *menuWidth:* Sets menu body separately. accepts a number
* *handleWidth:* Width that the icon arrow block will hang off the edge in a 'popup' style menu
* *maxHeight:* >The maximum height of the menu (with support for scrolling overflow).
* *icons:* An array of objects with "find" and "icon" properties. "find" is a jQuery selector, "icon" is a jQuery UI framework icon class ("ui-icon-script"). This allows you to append span elements to options for use as icons.
* *positionOptions:* jQuery UI Position Plugin options, Please see: http://jqueryui.com/demos/position/
* *format:* Accepts a function with a single argument that can be manipulated and returned with any level of manipulation you'd like
* *typeAhead* sets timeout delay given for the type ahead. Default: 1000
* *bgImage:* Accepts a function with the current option as parameter. Return a string which could be used as "background-image" CSS style.
* *wrapperElement:* Wraps all added elements into a HTML tag. $.wrap parameters accepted.
* *transferClasses:* Transfer classes from select (removed in latest version, use widget method instead)
* *appendTo*: Where to append the Selectmenu list (ul tag)
* *escapeHtml:* additional HTML escaping (not needed in most cases)

h3. Usage

Using the plugin is as simple as addressing a select element on your page and calling "selectmenu()" method on it. Like this:

```
$('select').selectmenu();
$('select').selectmenu({ optionName1: 'optionValue1', optionName2: optionValue2 });
```

Beyond that, you can utilize the options and methods mentioned using the same conventions followed by all other jQuery UI plugins.




h3. Methods

_This guide is incomplete. To help me to add something here, please visit the "issues":https://github.com/fnagel/jquery-ui/issues#issue/51._

h4. value

Retrieves or selects the value of the current option.

```
// read
$('select#speedA').selectmenu("value")
// write
$('select#speedA').selectmenu("value", "VALUE")
```


h4. index

Retrieves or selects the index of the current option.

```
// read
$('select#speedA').selectmenu("index")
// write
$('select#speedA').selectmenu("index", 4)
```


h4. widget

Returns the button link <a> and the menu list (ul). Useful to add additional CSS classes.

```
$('select#speedA').selectmenu("widget")
```


h4. destroy

Removes added elements and events, restore original select.

```
$('select#speedA').selectmenu("destroy")
```

h4. disable / enable

Disable or enable the whole selectmenu, single options or even optgroups:

```
// enable / disable complete selectmenu
$('select#speedA').selectmenu('enable');
$('select#speedA').selectmenu('disable');
// enable / disable option, parameter is index of the option
$('select#speedA').selectmenu('enable', 2);
$('select#speedA').selectmenu('disable', 2);
// enable / disable optgroup, parameter is index of the optgroup and keyword "optgroup"
$('select#speedA').selectmenu('enable', 2, "optgroup");
$('select#speedA').selectmenu('disable', 2, "optgroup");
```


Please not: When you need to exclude the disabled select from your form (for example when using serialize) you need to do something like this:
```
$('select').attr("disabled", "disabled").selectmenu('disable');
```

h3. Callbacks / Events

Available callbacks:

* open
* close
* change (fires when new option is selected)
* select (fires even when the same option is selected)

Every callback returns a object which looks like this:

* index (zero-based index of the selected option)
* option (option element itself)
* value: (value of the option, string)

```
$('select').selectmenu({
    change: function(e, object){
        alert(object.value);
    }
});
```

h3. FAQ

h4. Using Selectmenu within Tabs or Lightboxes

The problem is that the selectmenu is placed within a hidden element. Solution: Include "jQuery Peek":https://github.com/revsystems/jQuery-Peek and init like this:
```
    $("div.tabs").tabs();
    $("select").peek("selectmenu", { options if you want... });
```
See "this issue":https://github.com/fnagel/jquery-ui/issues#issue/58 for more information.
Update: seems to be fixed since v1.2

h4. Add / delete / modify options

Its possbible to rename an option or even add one to the selectmenu. Simply change the original select element and apply selectmenu() to it (again):
```
$('select').selectmenu();
```
Hint: This functionality is based upon a jQuery UI widget factory mechanism which fires the _init function again. There is no need to re-set the options.


h3. Licence

Dual licensed under the MIT and GPL licenses.


h3. Support and Bugtracking

Feel free to contact me at the issues bugtracking system (here at GitHub). However, please to be patient with the response. I have only a certain amount of time to support this effort and will allocate it the best I can. It is possible speed up development or a fix for your specific problem by placing a donation.

Please use GitHub issues for bug tracking:
[[http://github.com/fnagel/jquery-ui/issues]]

Please see here for how to post a bug:
[[https://github.com/fnagel/jquery-ui/issues/61]]


h3. What's next?

See milestones: [[https://github.com/fnagel/jquery-ui/issues/milestones]]
Official jQuery UI Selectmenu Widget, see [[https://github.com/fnagel/jquery-ui/issues/140]]


h3. Donate

Please consider a donation if you like this work: [[http://www.felixnagel.com/donate/]]
