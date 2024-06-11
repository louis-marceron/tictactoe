# Louis Marceron - Fargate, Cognito, TicTacToe report

Course: Cloud programming
Group: 3
Date: 2024-06-11

## Environment Architecture:

### Compute

- ECS Fargate services running the frontend and backend applications
- Load Balancer to manage traffic between frontend and backend
- Cognito user pool 

### Authentication

- AWS Cognito for user authentication and management

### Software

- Frontend application running in Bun with the framework Svelte
- Backend application running in Bun
- Both applications are containerized with Docker
- Cognito integration for user login and nickname display when a game is started

## Screenshots
![image](https://github.com/pwr-cloudprogramming/a10-louis-marceron/assets/72874947/02aec3f7-abf2-415d-8ec2-8d0aee5d3385)

## Reflections

### What did you learn?

- Had difficulty finding easily understandable documentation for the frontend cognito integration

### What helped most in overcoming obstacles?

- Using the AWS Cognito React tutorial as a guide and adapting the code for Svelte
