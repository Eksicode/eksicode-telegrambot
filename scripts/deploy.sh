cd /home/eksicode-telegrambot
docker stop eksicodeBot
git pull origin master
npm ci
docker-compose up --build -d