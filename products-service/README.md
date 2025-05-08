# Node.js Campus

## Overview

As part of the upskill program of our company we're going to create a backend web application following some basic business logic of an eCommerce environment.

The main idea is to get to know what is Node.js, some basic and commonly used functionalities of it and mainly what is the most common usage of Node.js within the Web development world.

The application that we are going to create will be separated into few micro services which will include Database, Docker, Message broker usage and so on.

This repository has been setup with the idea of serving as a common place where people can add their Node.js code so that it's used not only for practice but also for others' visibility, progress tracking, code reviews and knowledge sharing.

## Main guidelines for the campus:

Main guidelines for the campus:

- Using Typescript is required;
- Strongly recommend to use the VSCode debugger while debugging your code. Console.log for debugging purposes is "forbidden";
- Aim to utilize the best practices while designing you project, API's, database and table structures and so on;

## Process

The approach that we will use when going through the campus is to create your own folder when you clone the repository where your own application would go. Doing this would alleviate the process when it comes to checking if something does not work as expected or when you want to use others' work as a help tool.

In addition it would be a good idea to have your own branch created where you work on your folder and add your code. PRs for each of the tasks can then be created towards this branch. Branches will eventually be merged to master so that code is visible for everyone - conflicts shouldn't happen because of the unique folders created - code inside can always be updated at a later point.

So here is a step by step what is the initial setup procedure that you should follow:

1. Create a personal master branch from master using the following naming convention: `feature/RND-1156-{{first letter of your first name and your full family name}}-master` Eg. `feature/RND-1156-dkostov-master`. From now on this will be the branch where you should merge your changes. We will merge all of the personal master branches with the original master at the end of the campus;
2. Create a folder called with the same name used for your branch eg.`dkostov`. This will be the folder where you should init your personal project;

Now when it comes to your "day to day" tasks execution and what branching strategy we are going to follow within the campus:

1. Create your own sub-task for the current task that you are working on. Eg: You are beginning the campus from the first ticket `RND-1198`. You have to create a sub-task for `RND-1198`, which name should be `the existing ticket name followed by "-{Your name}"` eg: `NodeJS Upskill Task 1 - Project setup and package managers - Dimitar`;
2. The using the number of the newly created ticket, create a branch from your personal master branch using the following convention: `feature/RND-{ticket number}}-{{meaningful branch name}`;
3. Do the required code changes for the ticket into commit/s and push them to the remote;
4. Open a PR from your personal working branch onto your personal master branch;

## Resources

The development of the app will be split in tasks that are related to each other and it would be preferable if they were done in the order they've been prepared (as JIRA tickets). However, always feel free to go back and update something if desired or introduce some concepts / suggestions that others could benefit from.

This way, each folder's code could be used as their own unique resources.

Otherwise all other information can be found in the created JIRA epic - [Node.js Upskill Epic](https://jira-emea.merkle.com/browse/RND-1156).

## FAQ

Got any further questions which are not answered here? Drop us a message at `#node-upskill` in [Slack](https://merkle-ec.slack.com/archives/C063P9JKCSH) and we'll be more than happy to support!
