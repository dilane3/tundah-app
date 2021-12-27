# Server side app
This part of the project concerns only the server side.

## Structure of the project
There is so many folders inside this server folder, below are described all what these folder contains and how you should start with.

#### Controllers folder
This folder contains all the controller needed to handle all the actions initiated by actors of the system. Inside this folder we should have 3 files such as: userController, postController and commentController. These controllers are considered as javascript class with static methods inside.

#### entities folder
This folder contains only classes which represent entities of our app. As entities we have: Subscriber, Expert, Post, Comment. We have to create 4 classes that represent theses entities, with attributes and methods based on the class diagram.

We also have some interfaces for these entities, these interfaces are store into the interfaces folder inside the entities folder.

#### middlewares
This folder contains all the custom middleware created by the developpers of this app

#### models
This folder contains all classes which permit to manage all the operations that concerns entities inside the database

#### public
This folder contains all static files like images, videos

#### routers
This folder contains routers, which are files that allow us to catch a group of reques that concern a specific entities

#### utils
This folder contains some functions that are use for a specific aim, like connection to database, upload file, sendmail etc...


## How to start the project

After cloned the project, open it into your favourite text editor, then move yourself into the server foler.
Inside this folder, you have to create your branch first, the branch where you will work on, name it using your name, **omer** or **wangue** for example.

the command is
```bash
  git branch omer
```

Then you have to run the following command to install all the dependancies

```bash

npm install
```

After that, you have to configurate your database access. For doing that, you need to create a **.env** file inside the server folder and copy all the configuration from the **.env-example** to it. Remove all the **X** characters and replace it by the right one.

Then run this command to launch the server

if you use **nodemon**
```bash
  npm run dev
```

If you don't have **nodemon** installed
```bash
  npm run start
```