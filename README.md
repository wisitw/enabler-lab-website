# enabler-lab-website
The website of Enabler Lab (Assistive Technology Research Group, Faculty of Engineering, Chulalongkorn University)

## 1. Requirements
* [Node.js with NPM](https://nodejs.org/en/)

## 2. Project Structures
* client development/: Client source code directory (for development)
* server/: Server source code
  * static/: Distribution static items directory (for production)
    * css/: Style (using CSS)
    * js/: Script (using JS)
    * index.html: Entry point for client.

## 3. Commands
* First, setup using [NPM](https://www.npmjs.com/).

  ```
  $ npm install
  ```

* Then build source items (development) to static items (production).

  ```
  $ webpack
  ```
 
* Finally start the server.

  ```
  $ npm start
  ```

## Contact Us
* [Seehait Chockthanyawat](https://seehait.me/)
* [Wisit Wongchaianukul](http://www.xn--w3cel3dtg.xyz/)
