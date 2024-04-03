FROM node
WORKDIR /app
COPY package.json /app

RUN npm install

# this is the argument we are going to pass
# we have to set this file in our docker-compose dev and prod
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install;  \
        else npm install --only=production; \
        fi

COPY . /app

RUN npm install

ENV PORT 3000
EXPOSE $PORT

CMD ["node","app.js"]