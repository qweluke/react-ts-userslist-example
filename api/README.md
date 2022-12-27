# Technical Documentation
 
## File structure overview
 
The project consists of two folders:
 
`api` - contains the data to be used in the project through mocked API server
 
`client` - should contain application's source code
 
Task solution should be delivered retaining this structure.
 
## API
 
### Running API server
 
To run the API server, in `api` directory run commands:
 
`npm i` - install dependencies
 
`npm start` - initiate server
 
This will run local API server based on [JSON server](https://github.com/typicode/json-server) on address http://localhost:8080.
 
### Available resources
 
`/users` - list of the users
 
```json
{
     "name": "Brenda Jakubowski",
     "username": "Darby.Haag",
     "email": "Cicero_Hermann24@gmail.com",
     "address": {
       "street": "Jaylen Underpass",
       "suite": "Apt. 134",
       "city": "Lake Adellaview",
       "zipcode": "39704-2194",
       "geo": {
         "lat": "-63.1949",
         "lng": "114.8543"
       }
     },
     "phone": "825-356-9347",
     "website": "candida.name",
     "company": {
       "name": "Kohler - Reinger",
       "catchPhrase": "Managed context-sensitive solution",
       "bs": "streamline scalable paradigms"
     }
   }
```
 
### Pagination query params
 
`_page` - number of the page
 
`_limit` - the size of the page
 
To get one element, it is possible to use filter functionality:
 
`GET  http://localhost:8080/users?username=Darby.Haag`
 
Pagination details are available in the `Link` and `X-Total-Count` response headers for each request.
