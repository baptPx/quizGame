
## Run with docker-compose

Just lend in the repository and run (you have to install docker-compose before)

```
$ docker-compose up 
```


## Run with node

First, be sure you have a Postgresql accessible, then edit with the corresponding parameterr the file ``` .env ```
Install the dependencies with 

```bash
$ npm install
```
Then start the application with
``` 
npm run start
```

## Test

Be sure you have installed the dependencies 
```bash
$ npm install
```
Then start the tests 
```bash
# unit tests
$ npm run test
```

## Usage

First you should create a user on 
POST ```/api/users```
Body 
``` 
{
    email: string;
    password: string;
}
```
You can log with 
POST ``/api/users/login``
Body
``` 
{
    username: string; // email
    password: string;
}
```
return 
``` 
{ 
    token: string;
    username: string;
    quizAnswers: {
        quizId: string,
        attempts : {
            nbCorrectAnswers: number,
            answers: {
                questionId: number,
                answersId: number[],
                correct: boolean
            }[]
        }
    }
}
```
You can now use this token for request that require authentication 

POST user account
Place this token in header as following 
``` 
Authorization: Bearer <access_token>
```
PUT ```/users/:userId```
Body 
``` 
{
    email: string;
    password: string;
    firstName: string;
}
```
