# Backend
### MongoDb Connection:
- email: alphagem47@gmail.com
- Project: Project-gen-ai


### Authentication:
1. registerUserController() 
- get username, email, password from req.body
- Check: if user already exists
- bcryptjs: hash password
- register a new user
- JWT token: create JWT token   
- cookies: set token in cookie and read token from cookie
```
localhost:3000/api/auth/register
```

2. loginUserController() 
- get email, password from req.body
- Check: if user already exists with this email
- compare password
- JWT token: create JWT token  
- cookies: set token in cookie and read token from cookie
```
localhost:3000/api/auth/login
```

3. logoutUserController()
- get token from req.cookies.token
- clearCookies
```
localhost:3000/api/auth/logout
```

### Middleware: 
- token verification for authUser
- get token from cookies
- verify token

4. getMeController()
- get the current logged in user details



# Differentiate Frontend & Backend 
- Backend (Node, Express)
- Frontend (React + Vite)

----------------------

### 4 Layers Architecture in Frontend:
1. UI: designing part
- component
- pages

2. API: for communication with backend
- services
- auth.api.js

3. State: data store
- auth.context.jsx
- ai.context.jsx

4. Hook: for managing state and API layers
- hooks

------------------------

### UI includes navigation (routes)
- login page
- register page

### Services
- auth API's - (interact frontend with backend)
- using base URL for shorten code

### Context
- AuthContext

### Hooks
- useAuth.js - (for managing services and context layer)
- handleRegister()
- handleLogin()
- handleLogout()
- getAndSetUser as getMe()

### cors installation in Backend
- **Note:** backend and frontend origin should be same(localhost:5173)

### 2 way binding
- username, email, password

### Protected Route
- protect homepage using protected routes
- without login or register user can't see homepage, redirects to login page
- it takes hooks(useAuth.js) & navigate


### Note:
- if we login ⇢ homepage
- then reload it redirects to login page again
- setLoading should be (true)