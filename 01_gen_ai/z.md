## MongoDb Connection:
- email: alphagem47@gmail.com
- Project: Project-gen-ai


## Authentication:
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
