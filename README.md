# Tündah-app

Tündah is a web platform where are published information on how wedding are organized in Cameroon. It's an academic project.

## Project structure

This project is divided into many sections (represented by folders)

#### Documentations folder

This folder stores all the documentation of this project including **diagrams**, **graphical models**.

#### Client folder

This folder concerns only the client side of the project, the user interface part.
This app section will be made using **Reactjs** (a javascript framework).

#### Server folder

This folder concerns only the server side of the project, the place where will be writen the core functionalities of the project, where the database will be managed.
This part will be made using **Nodejs/Express** (a javascript framework). Concerning the database, we will use Neo4j, a database oriented graph

## List of developers

| Matricules | Firstnames and Lastnames           |
| ---------- | ---------------------------------- |
| 18T2610    | FENYEP WANGUE                      |
| 19M2441    | FOTSO WAFO Omer Élysé              |
| 19M2557    | KANA ZANLEFACK Blondelle           |
| 19M2069    | KOMBOU MBIANDA Armel Dilane (chef) |
| 18U2355    | NGIMDOCK ZEMFACK                   |

## Modules almost done

Here is the list of modules that we have already done.

### Authentication module

This module concerns the handling of users (signup and signin features).
This module is already done, it's possible to:

- Signup as a new user (Subscriber only) and be able to access to the social network module
- Signin by providing personal informations (username and password) and connect himself to his account.
- Users who are not connected, will not be able to access to the social network part, and will only navigate inside the wiki section.

### Social Network module

This Module concerns the part of the applications where users will publish posts and share them to their followers. So It's already possible to do many thing:

- Create and publish a cultural post to talk about one aspect of the african culture. It can be weeding, foods, sport, languages etc...
- Create a comment below a specific post, for giving an opinion of the given post.
- Like a specific post.
- Follow a user and be able to get notifications from his activities.

### Research Engine

This Module allow users to search about a specific element directly without going through the list of post and users and searching manually what they want.
So now, it's possible to:

- Give a keyword in the search and press on the submit button and receive all the result corresponding to the request. The result concerns only the post now, but we will include the result that include users too later.

- Research for posts from Social network and Wiki modules.
