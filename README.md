# ConfAgenda

[ConfAgenda](http://confagenda.audero.it) is a fast and small web application built to allow conferences attendees to easily navigate through the conference information and mark the talks of interest to create their own, personalized track.

## Features at a glance

- **Compatible with modern browsers**: Internet Explorer 9+, Chrome, Opera, Firefox, Safari, iOS, Android, and more
- **Light-weight**: ~110Kb minified and gzipped with less than 10 HTTP requests
- **Fast**: ~1.5 seconds loading time with a 3G connection
- **Mobile-friendly**: Built using a mobile-first approach, it includes touch gesture for a better mobile experience
- **100% offline**: Once loaded all the operations can be performed offline
- **Isomorphic views**: The views are built with [React](http://facebook.github.io/react/), so you can use them on the server using [Node.js](http://nodejs.org/)
- **100% configurable**: Modify the source code to create a look and feel that adheres to your conference's branding

## Demo

A live demo is available at [http://confagenda.audero.it/demo](http://confagenda.audero.it/demo).

## Why ConfAgenda?

I've had the pleasure to attend and [speak at a few conferences](http://aurelio.audero.it/speaking) in the last years and every time I had to download a different app or use a not-so-mobile-friendly website to navigate the agenda and decide the talks to attend. Sometimes I even ended up using the paper sheet the staff provided at the entrance. Everyone is reinventing the wheel over and over again, often in a sub-optimal way. This is a pain both for conference organizers and attendees.

Organizers should take care of managing other aspects of the conference in order to provide the best experience possible to everyone involved in the event. They should not spend their time in creating a web or a mobile application. For those that decide to create a mobile application the effort is even more. They have to develop *at least* two different versions and then deal with the painful process of some stores (*\*cough*\* Apple *\*cough*\*). In case there are last-minute updates, they also have to update the applications and submit them again to the store. In some cases the process is so long (i.e. application approval), the updates are simply never made.

Attendees want to have the most straightforward and simple experience possible. They don't want to download a new app every time. They don't want to be online to navigate the conference information. They don't want to use a paper sheet and the pen to mark the talks to attend. All they want to do is being able to take a look at the agenda whenever they need and to mark the talks of interest. This is particularly important for multi-day, multi-track conferences.

To solve these issues, I decided to develop ConfAgenda.

## Installation

The [basic setup](#basic-setup) is for conference organizers who want to use ConfAgenda without any customization. This process is suggested for people without programming knowledge.

The [full setup](#full-setup) gives you access to the source code of ConfAgenda so that you can modify its look and feel to adhere to the current style of the conference's website and brand.

### Basic setup

For the basic setup, follow the instructions below:

1. Download the latest version of ConfAgenda from [https://github.com/AurelioDeRosa/ConfAgenda/releases](https://github.com/AurelioDeRosa/ConfAgenda/releases)

2. Unzip the archive

3. Modify the [`database.json` file](#database-structure) contained in the `dist` folder to add the information about your conference (tracks, talks, general info, and so on)

4. Open the `index.html` file contained in the `dist` folder in your browser of choice to check that everything is shown properly

5. Upload all the files contained in the `dist` folder to your web server

### Full setup

If you want to modify the look and feel of ConfAgenda or how it works, you can modify the source code located in the `app` folder. To perform all the tests, the optimizations, and run the building process, you need to install on your machine [Node.js](http://nodejs.org), a [git client](http://git-scm.com/download/), [Grunt](http://gruntjs.com), and [Bower](http://bower.io).

The following instructions detail the process:

1. Install [Node.js](http://nodejs.org/)

2. Install a [git client](http://git-scm.com/download/)

3. Install [Grunt](http://gruntjs.com/getting-started#installing-the-cli)

4. Install [Bower](http://bower.io/#install-bower)

5. Clone the ConfAgenda repository
   ```sh
   $ git clone https://github.com/AurelioDeRosa/ConfAgenda.git
   ```

6. Install the project's dependencies
   ```sh
   $ npm install
   $ bower install
   ```

7. Serve the web application and monitor the source files for changes. The most important one is [`database.json`](#database-structure) that contains the data of the conference
   ```sh
   $ grunt serve
   ```

8. If a browser window or tab is not automatically opened, open a new one  by yourself accessing the URL [http://localhost:9000](http://localhost:8000) to view the application

### Database structure

The `database.json` file has the following structure:

- conference: Array of objects
  - day 1 date (format "mm/dd/yyyy")
     - track 1 name
         - title
         - description
         - speaker
             - name
             - bio
             - avatar
             - twitter
             - website
         - startTime
         - endTime
         - language
     - track 2 name
     - ...
  - day 2 date (format "mm/dd/yyyy")
  - ...
- about
  - name
  - logoUrl
  - location
  - date
  - twitter
  - website

## Contribute

I'd love the contribution of anyone who is keen to help. Report a bug, fix a issue, suggest a feature: any contribution to improve the project is highly appreciated. If you're uncertain whether an addition should be made, feel free to open up an issue so we can discuss it.

Keep in mind that ConfAgenda is both a complete and working application and a skeleton you can use to build your own version that better fits your need. Because of that, I'll only consider requests of features that can be of general utility. I want to keep the project as small and fast as possible.

## License

ConfAgenda is dual licensed under the [MIT](http://www.opensource.org/licenses/MIT) and the [GPL-3.0](http://opensource.org/licenses/GPL-3.0) licenses.

## Author

[Aurelio De Rosa](http://www.audero.it) ([@AurelioDeRosa](https://twitter.com/AurelioDeRosa))
