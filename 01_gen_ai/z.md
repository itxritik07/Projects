# MongoDb Connection:
- email: alphagem47@gmail.com
- Project: Project-gen-ai


# Authentication:
###  1. registerUserController() 
- get username, email, password from req.body
- Check: if user already exists
- bcryptjs: hash password
- register a new user
- JWT token: create JWT token   
- cookies: set token in cookie and read token from cookie
```
localhost:3000/api/auth/register
```

###  2. loginUserController() 
- get email, password from req.body
- Check: if user already exists with this email
- compare password
- JWT token: create JWT token  
- cookies: set token in cookie and read token from cookie
```
localhost:3000/api/auth/login
```

### 3. logoutUserController()
- get token from req.cookies.token
- clearCookies
```
localhost:3000/api/auth/logout
```

# Middleware: (authUser)
- get token from cookies
- verify token

### 4. getMeController()
- get the current logged in user details


# Differentiate Frontend & Backend 
- Backend (Node, Express)
- Frontend (React + Vite)

## Using SCSS instead of CSS
- style.scss
- using new package for this (npm i sass), with the help of this we can use this file in main.jsx

# 4 Layers Architecture
```
UI
- component
- pages

Hook: for managing state and API layers
- hooks

State: data store
- auth.context.jsx
- ai.context.jsx

API: for communication with backend
- services
- auth.api.js
````