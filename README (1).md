So to run it you need to make
npm i - it will install all packages
1) front - npm run start
2) back - npm run start:server

Back Routes:
/home/protected - the path in which is authorization by using token. If token isn't correct, then user will see corresponding message on front - that he isn't authorized. ./create-session - the path in which is user authorization by login and password, if user authorized successfully, then token is being sent on front and saved in local-storage for next session

There is call from frontend to /create-session from page with the same address - /create-session. After you go on this page, there is processing authorization by credentials ---> { name: ‘user1’, password: ‘123456’ }, if you change data on some other you will got renouncement in authorization from server and on the page with table ---->
/table - you got the message the you didn't authorize

Data changing in table:
data in cells is changing by onBlur event - when there isn't selection, NOT when we click somewhere.
Sum column is disabled.

for mongoDB was used Mongoose

Main links:
localhost:3000 - front
localhost:3001 - back
I guess that's all
