# BLACKJACK

A simple, interactive Blackjack game built with Next.js. Players can create sessions, draw cards and try to reach a score closer to 21 without going over.

## Overview

This project is a blackjack game implemented using a NestJS backend, a Next.js frontend, and a PostgreSQL database. The backend handles game logic, player management, and data persistence, while the frontend provides the user interface for playing the game. Redis is utilized for caching to improve performance.

## Live demo

To see the application running, you can access it online at

http://blackjack.brumadu.com

## Run Locally

Clone the project:

```bash
  git clone https://github.com/brumadu/blackjack.git
```

Go to the Front-end project directory:

```bash
  cd ./blackjack/blackjack_front
```

Create a .env file and write these enviroments inside:

```bash
    API_HOST = http://localhost:3050/
    ALLOWED_METHODS="GET, HEAD, PUT, PATCH, POST, DELETE"
    ALLOWED_ORIGIN=""
    ALLOWED_HEADERS="Content-Type, Authorization"
    EXPOSED_HEADERS=""
    MAX_AGE="86400"
    CREDENTIALS="true"
```

Docker will handle all the startup for you, to do so you need to run the command:

```bash
  docker-compose up --build
```

To access it locally:

```bash
  http://localhost:3000
```

## Ports

The Application utilizes the following ports:

- Front-end: 3000:3000
- Back-end: 3050:3050
- PostgresDB: 5432:5432
- Redis: 6379:6379

## Next Steps

- [ ] Signup and login
- [ ] User Statistics (Win/Lose Ratio)
- [ ] Economy per session
- [ ] Player Actions: Double down and split
- [ ] Session player cap
- [ ] Multiplayer loop actions
