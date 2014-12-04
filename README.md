commonmark-document
===================

This application, written on Node.js, serves [Commonmark-compliant](http://commonmark.org/) markdown files in a plain and simple "document" format.

The goals of this project are simple:

* `live editing` - changes can be made to the file without restarting the server
* `document look and feel` - page renders quickly and with minimal styling
* `printing` - print physical copies without obvious web mark up showing
* `code` - code syntax highlighting
* `markdown` - also allow users to view the raw markdown file: [see here](/md/index.md)
* `responsive` - should scale nicely to any device

Note: `printing`, `code` and `responsive` still need to be worked on.

Usage
-----

Download the program

    git clone $repo

Download the `commonmark` dependency:

    cd commonmark-document
    npm install

Edit the markdown document at:

    ./public/md/index.md

Run the server:

    node app.js

The server log should inform you that your page is now visible at [http://localhost:3000](http://localhost:3000)

Bugs
----

* Watching the file on *linux* doesn't usually work more than once because of the way most user applications work. In most cases, files being edited, are actually created in memory and then moved in place of the file in question, destroying the link that is being watched by the kernel.
