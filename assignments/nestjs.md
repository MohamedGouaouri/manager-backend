## NestJS assignment
In this assignment, you're going to implement the backend app used by managers to create and manage their challenges. It's seperate from the previous express backend application but it uses the same database. Also this backend will be integrated with managers dashboard next js application.


First, initialize a `nestjs` project and set the serving port to an unutilized port. Next we are going to use a set of nestjs packages, so make sure they're installed.
- Install `@nestjs/mongoose` and `mongoose` as detailed [here](https://docs.nestjs.com/techniques/mongodb).
- Install `class-validator` and `class-transformer` for [validation](https://docs.nestjs.com/techniques/validation).
- Install `@nestjs/jwt` for [jwt-based authentication](https://github.com/nestjs/jwt).


After you install all of these packages, proceed to the tasks.

### 1. Challenges CRUD opertions
- Create a `challenges` module and add a `controller` and `service` to it. Make sure, that the controller and the service are registered in the module and the module is added to the root module.
- Add routes to `get all the challenges`, `get a challenge by id`, `update a challenge`, and `delete a challenge`.
- Add the `Manager` and `Challenge` mongoose schemas 
    - The schemas are the same as your previous express backend app.
    - Make sure to import these model in the challenges module.
    - Make sure to connect mongoose module to the root module.
- Create the set of `DTOs` (Data transfer objects) for challenge creation and update. Make sure to add validation decorators.
- Add the dtos their assiociated routes in the controller and enable validation.
- Implement the different service functions in the challenges service for each one of the previous controller endpoints.


### 2. Authentication and authorization
We want make sure that clients are authenticated and they're indeed managers so that only managers are able to manage the challenges.

>Note: Managers get their token from your express backend via the login endpoints, and they should pass it as an authorization header when they make requests to this application.

- First, create a `Roles` decoractors that assigns metadata to the controller. It should accept a list of role strings that signifies the allowed roles to make requests to a specific controller. You can find more about the metadata decorator [here](https://docs.nestjs.com/fundamentals/execution-context).

- Create an authentication guard that checks the existence of the token in the authorization header. If the header is not present, the request is denied.

- If the header is present, make sure to verify it using `JwtService` from `@nestjs/jwt`. If it's not valid, deny the request.
- If the request is valid:
    - Extract the roles from the payload.
    - Extract the list of allowed roles that was declared when decorating the controller.
    - Make sure that request role is included in the declared roles.
