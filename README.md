1- Docker network create your-network-name -d bridge

2- Docker run —name  postgres-container -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=your-postgres -p 5433:5432 -v pgdata:/var/lib/data —network your-network-name -d postgres

3- docker run --name pgadmin-container -p 82:80 -e 'PGADMIN_DEFAULT_EMAIL=your-email' -e 'PGADMIN_DEFAUL_PASSWORD=your-password' --network your-network -d dpage/pgadmin4

3.5- OPTIONAL: go to pgadmin port and link to database for testing

4- Create a Dockerfile in your backend: 
FROM openjdk:23-jdk

ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-container:5432/postgres
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=postgres

COPY target/your-app.jar /app/your-app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/your-app.jar"]

5- Create a jar file:
    -press on the maven m on the right of IntelliJ
    -click on your project name
    -click on lifecycle
    -double click on clean (wait for it to finish)
    -double click on install (wait for it to finish)

6- docker build -t your-image-name .

7- docker run -d -p 8080:8080 —name your-container-name —network your-network-name your-image-name:latest

7.5- OPTIONAL test backend using postman

8- Open frontend, replace all localhost with your background container name and port.

9- create Dockerfile for your frontend:


FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


10- docker build -t frontend-image .

11- docker run -d -p 3000:3000 --name frontend-container --network your-network-name frontend-image:latest
