## Unititled Quiz App

Quiz app website using a Laravel API and React frontend.

---

### Deployment

Currently deploying to [untitledquizapp.co.uk](http://untitledquizapp.co.uk/)

Please note, if the website is down it is likely i have turned it off to save on costs, please email me if you would like to see it in action and i will put it back online.

Deployed onto EC2 with various AWS services (e.g. RDS) via Laravel Forge.

---

### Application Features

#### Users

-   Register and Login using token based authentication.
-   Editable User profile pages with users quizzes and scores.
-   Following system to allow users to see quizzes by their favourite users more easily.
-   Friends system with requests used to allow for collaborative working on quizzes.

#### Quizzes

-   Play quizzes created by users in a variety of subjects,
-   Create and edit quizzes using an easy to use management system.
-   View existing quizzes overview page with details and score leaderboards.
-   Leave comments and feedback on quizzes overview.
-   Like and Dislike system so users can see at a glance the quality of a quiz and help with recommendations.

#### Challenge system

-   Challenge other users to beat your score on a quiz, and receive challenges from others.
-   If you send a challenge and they fail to beat it, or you receive a challenge and beat or match it then you get a challenge point.
-   View challenge point leaderboard.

#### Explore page

-   Page designed to make finding quizzes as easy as possible.
-   Search by the name of the quiz.
-   Search by the creators username.
-   Search by tags that are added by the quiz creator when managing the quiz e.g. Sports , General knowledge.
-   Toggle to only show recommended quizzes.

#### Dashboard

-   Overview if the most popular quizzes.
-   Overview of recommended quizzes.
-   Overview of users you've followed.
-   Overview of the latest quizzes by users you've followed.
-   A list of any active challenges you have.
-   A list of friend requests that require a response.

#### Admin controls

-   Admin only section with various controls
-   Ability to search users and additional controls to ban and unban non admin users.
-   Ability to ban quizzes with a reason, allowing the user to amend the quiz to an acceptable state.
-   Admin section contains a list of banned quizzes and has the ability to unban them, no data such as scores, comments & likes are lost.
-   Ability to add and remove tags that can be used when tagging quizzes.
-   Ability to set a quiz as recommended.

## Running locally

This application was created using Laravel Sail which uses docker to create the environment required to build and run a Laravel application. For ease of use I would recommend using the docker file held within my project to create the environment but if you have a Laravel environment set up already the application will work fine with that.

Pre requisite

-   Set up docker for your operating system, information can be found in the [Laravel installation documentation](https://laravel.com/docs/8.x/installation)

### Scripted setup

If you are using the docker environment with sail you can use one of two quick set up `.sh` scripts. These run clean migrations, run one of two seeders depending on which is run and then configures keys for laravel passport. First however you must configure your `.env` file using the example `.env.example` in the root of the project.

You have a choose between running `sh setup.sh` or `sh advancedSetup.sh` to run migrations and seeder, the difference between these is explained below.
- The `setup.sh` seeder creates the database with a single admin user and some basic tags, the default admin users username and password can be set in the `.env` file by editing the values for `ADMIN_EMAIL` & `ADMIN_PASSWORD`.
- The `advancedSetup.sh` creates everything the setup.sh script creates but also adds a snapshot of the database with a number of users, quizzes, and interactions such as comments, scores, and challenges between these users. This allows you to quickly see how the operating website would look, and aid development by having a quantity of pre seeded data.

### Manual Setup

Note: If using own environment and not sail replace all instances of `sail` with `php`
Steps:

1.  Using the terminal type specified in the documentation above (e.g. A Linux terminal using WSL2 for Windows) clone the project from GitHub and Cd into that folder. [Ensure this folder destination is in WSL](https://stackoverflow.com/questions/65227492/laravel-8-laravel-sail-for-dev-on-windows-10-is-slow-how-to-speed-up) or you may experience performance issues.
2.  Before you can run sail you need to install dependencies, this can be done by following the instructions in the following Laravel documentation [Installing Composer Dependencies For Existing Applications](https://laravel.com/docs/8.x/sail#installing-composer-dependencies-for-existing-projects)
3.  Copy the `.env.example` file in the root of the project and rename it to `.env`.
4.  Now you can run sail by entering `/vendor/bin/sail up` or `/vendor/bin/sail up -d` for a detached process. This uses the docker file to create the environment required to run the application and run tests.
5.  Run migrations using `sail artisan migrate` to create the database tables.
6.  Run `sail artisan db:seed` to add a admin user to the project, see scripted setup for more information on what the seeder adds.
7.  Run `sail artisan key:generate`
8.  Run `sail artisan passport:install` without this you wont be able to login.
9.  By default the Application will be running on localhost.

## Technical overview

-   Laravel API
-   React Front end wrapped within Laravel application
-   Webpack
-   Sass
-   Tailwindcss
-   Testing using PHPUnit
-   Docker with Laravel sail
-   PHP packages see `composer.json`
-   JS packages see `package.json`
