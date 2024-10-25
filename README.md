# TANGLE

## [See the App!](https://tangle-web.netlify.app/)

![App Logo](https://res.cloudinary.com/dtvuykwtv/image/upload/v1729589103/bpe9xnuncma0drfvji7t.jpg)

## Description
 TANGLE is a project presented by two junior coders. In the struggle to find work we found the need to show our portfolios in a dynamic and agile way. Not too centered in the code but more in the final product. For piers and recruiters to be able to see basic info immediately and jump in a deployed demo right away.

#### [Client Repo here](https://github.com/diegoldc/tangle-app)
#### [Server Repo here](https://github.com/diegoldc/tangle-server)

## Technologies & Libraries used

- HTML
- CSS
- Tailwind
- Flowbite
- JavaScript
- React
- React-Router-Dom
- Bcrypt
- JsonWebToken
- Cloudinary
- Axios
- ReactIcons
- Vite

## Backlog Functionalities

We would love to add a messaging system to the platform

# Client Structure

## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **project list** - As a user I want to be able to access all the projects even if I'm not logged in
- **project create** - As a user I want to create a project so that I can display my work
- **profile edit** - As a user I want to edit the data in my projects as it develops
- **profile page** - As a user I want my information to be displayed for everyone to see my projects, basic info and network
- **profile edit** - As a user I want to edit my personal information
- **network page** - As a user I want to access all my network's project so they are accessible and not mixed with other users
- **search** - As a user I want to search for users or profiles in a simple and easy to read format
- **about** - As a user I want to be able to read about this page, who did it and to what end

## Client Routes


## React Router Routes (React App)
| Path                               | Page                | Permissions            | Behavior                                                                      |
| -------------------------------    | ------------------- | ---------------------- | ------------------------------------------------------------------------------|
| `/`                                | HomePage            | public                 | Displays all projects in the platform chronologicaly, navigat to each project |
| `/signup`                          | Signup              | public                 | Signup form, link to login, navigate to homepage after signup                 |
| `/login`                           | Login               | public                 | Login form, link to signup, navigate to homepage after login                  |
| `/profile/:userId`                 | ProfilePage         | public                 | Display User info, edit user, navigate to user's projects and followers       |
| `/projects/new-project`            | AddProjectPage      | private                | Form to create a new project, navigate to project's page after creation       |
| `/projects/:projectId`             | ProjectPage         | public                 | Display project's info, comment, like, navigate to github and dedployed URL   |
| `/projects/:projectId/update`      | EditProjectPage     | private                | Form to edit project, navigate to project's page after update                 |
| `/projects/my-network`             | MyNetworkPage       | private                | Display all the projects made by users I follow, navigate to each project     |
| `/about`                           | AboutPage           | public                 | A little description about this page, who did it, for who and to what end     |
| `/profile/:userId/my-info`         | EditUserPage        | private                | Form to edit users data, navigate to the users profile page after update      |
| `/profile/:userId/change-password` | ChangePasswordPage  | private                | Form to change password, navigate to the users profile page after update      |
| `/search`                          | SearchUserPage      | public                 | Display Users that coincide with the search parameter given by the User       |
| `/tech/:tech`                      | SearchTechPage      | public                 | Display all projects that have the technology given by the user               |
| `*`                                | NotFoundPage        | public                 | Fallback page for unknown paths                                               |


## Other Components

- Navbar
- Footer


## Context

- auth.context
- theme.context
  
## Links

### Collaborators

[Diego Lazaro](https://github.com/diegoldc)

[Juan Palazzo](https://github.com/TanoPalazzo14)

### Project

[Repository Link Client](https://github.com/diegoldc/tangle-app)

[Repository Link Server](https://github.com/diegoldc/tangle-server)

[Deploy Link](https://tangle-web.netlify.app/)

### Trello

[Link to your trello board](https://trello.com/invite/b/670d3d51e9e164f58cb61d1b/ATTIae9dbe83292b812432d96fc4770754894B6375C4/proyecto-modulo-3)

### Slides

[Slides Link](www.your-slides-url-here.com)