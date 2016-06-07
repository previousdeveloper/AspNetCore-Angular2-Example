This project would help AspNet developers to jump start with a blank Angular application with login/registration support.

<a href="http://aancseed.azurewebsites.net/account/login" target="_blank"><b>LIVE DEMO</b></a>

Frameworks, IDE & plugins
====================
* Visual studio 2015
* Angular 2 RC 1
* AspNetCore (aka Asp Net 5 or vNext) which targets both .Net Core & .Net 4.5.1
* Bootstrap 3
* Alertify for notifications
* Fancybox for login/registration modals
* Automatic node package restore for client side libraries with Visual Studio 2015
* Automatic bower package restore for client side libraries with Visual Studio 2015
* Gulp to compile & transpile typescript to JavaScript, rename, uglify, generate source maps for debugging typescipt on browser etc
* Task explorer to watch and compile typescript with gulp during development and during build process
* System.JS as JS module loader with support for an on demand asynchronous loading of js modules.

<img src="https://raw.githubusercontent.com/justcoding121/AspNetCore-Angular2-Seed/master/screenshots/login.PNG" width="800px">
<img src="https://raw.githubusercontent.com/justcoding121/AspNetCore-Angular2-Seed/master/screenshots/home.PNG" width="800px">

Features
=======
* AspNetCore (aka Asp Net 5 or vNext) as server side framework with purely REST services (JSON)
* Angular 2 beta as a pure Single Page Application (SPA) with static typings using typescript for client side code.
* Angular 2 PathLocationStrategy implemented with URL rewrite on server side. This will help to implement server side rendering for faster initial page loads in future.
* Cookie authentication seed for login/logout/registration

Future updates
=============
* Add karma/jasmine test runner suite for client side code
* Add server side unit testing (using xunit) along with integration testing (using Microsoft.AspNet.TestHost) 
* Use SCSS along with gulp compile to CSS
* Seed multilevel rest style routing (for example user/{userId}/account/{accountid}
* Seed multi-level side bar menu
* Seed a paged grid
* Seed authorization for child routes
* Bundle minified Angular2/Rx files when stable version is released
