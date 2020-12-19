# Together

## Descripción

Es una aplicación par aque puedas crear partidos/torneos deportivos en los cuales los usuarios podrán unirse. 
También contará con una página de rankings para ver sus cualidades.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - Tendrás opción a ver todas las funciónes(Ver partidos,torneos,ranking) de la web y cuando clickes te salga el login
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend.
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **matches list** - As a user I want to see all the events available so that I can choose which ones I want to attend
- **matches create** - As a user I want to create an event so that I can invite others to attend
- **matches detail** - As a user I want to see the event details and attendee list of one event so that I can decide if I want to attend 
- **matches  attend** - As a user I want to be able to attend to event so that the organizers can count me in
-**My profile** - Podrás ver tu perfil donde saldrán los partidos/torneos donde estás inscrito, tu info de usuario y modificarla.


## Backlog

List of other features outside of the MVPs scope

Podré ver los ranking de usuarios por diferentes deportes.

Crear diferentes deportes aparte de Tenis y Paddle

Chat para conversar entre usuarios

Api de geolocation

User profile: Añadir fotos en su perfil

Create Torunames as more or less matches

## ROUTES:

- GET / 
  - renders the homepage

- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form 

- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - name
    -lastname
    -age
    -country
    -level
    -favoriteclub
    -sports
    -username
    - email
    - password


- GET /auth/login
  - redirects to / if user logged in
  - renders the login form


- POST /auth/login
  - redirects to / if user logged in
  - body:
    - email
    - password

- POST /auth/logout
 - redirects to /
  - body: (empty)

- GET /matches
  - renders the matches list where you can join in.

- GET /matches/create 
  - renders create matches form

- POST /matches/create 
  - redirects to /username/my-matches
  - body: 
    - center
    - level
    - nº of players
    - location
    - sport
    - date
    - created by
    - players


- POST /matches/:id/attend 
  - redirects to /username/my-matches
  - body: 
   - User id ???
   - Matches id ???

- GET /username
- renders my profile

- POST /username
- To modify your profile


## Models

User model
```
    - name
    -lastname
    -age
    -country
    -level
    -favoriteclub
    -sports
    -username
    - email
    - password
```

Event model

```
    - center
    - level
    - nº of players
    - location
    - sport
    - date
    - created by
    - players
``` 

## Links

### Trello

https://trello.com/b/1T9ipqmI/mvp-ih

### Git

https://github.com/projav23/webproject

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
