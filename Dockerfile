FROM node:14

RUN mkdir /var/bot/

WORKDIR /var/bot/

COPY . /var/bot/

RUN npm install

RUN npm install pm2 -g

CMD [ "pm2-runtime", "start", "pm2.json" ]
