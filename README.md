Template Engine Watcher
==

When you develop JavaScript, HTML and CSS locally using template engines like Coffee, Jade and Stylus, you don't want to convert the files by hand. Client side js convertors are a good option, but often slow (especially when you use several). TEW is very simple: watches the directories where your template engine files are in and converts them when you make a change.

+ Download/copy watch.js
+ Replace the base and out paths
+ If you need to add an engine, just add an object and add it to the convertors array
+ Run with Node.js using 'node watch.js'

Enjoy!
