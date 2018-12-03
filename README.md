# Activity

Well, this activity has 2 main sub-repositories. One holding the frontend and the other one the backend. To make things easy, `.env` is commited.

Link for the app: https://country-activity.herokuapp.com/question1

## A few words

* Fist of all, I'd like to thank you for the opportunity, hope these pieces of code find you well
* I've done this application avoiding the most of BDUF as possible. Code is simple, but it's Open-Closed from its roots. Some functions would be optimized when needed.
* I usually avoid comments on code, which should be self-explained, but in this case, comments will rise on points I think could be improved if an application as this one would scale.
* For the sake of the time taken to setup and analyze the code, I'll commit `.env` and put frontend and backend in the same repository to make things easier. Even knowing it's not a good practice and highly unrecommended
* In order to get things simple and avoid repetition, I'm putting the 3 first activities (which were very similar) in one page, so you can analyze it all in one page. The 4th, however, was quite different and I got it in another page.
* Most of the application was built from scratch, except for some specific pieces of code I've recently written in my projects.
* If this project had a database, it would be way better to do all the logic about the coins on the backend, maybe get a hash for wallet like cryptocurrencies, thus, bringing some of the logic on the frontend to the backend.

That's all, folks!


## Backend

### Starting

After cloning the repository run
```
cd activity/backend`
npm install
npm start
```

if you need, you can edit `.env` file before starting

### Testing

To run the automated tests:
 `npm tst`
 
## Frontend

### Starting

After starting the backend, run
```
cd front
npm install
npm start
```

### Testing
Just run:
```
npm tst
```
