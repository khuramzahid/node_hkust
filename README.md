CREATE DATABASE:
    sudo mysql;
    CREATE DATABASE confusion;
    CREATE USER 'confuseduser'@'localhost' IDENTIFIED BY 'enigma123!';
    GRANT ALL ON confusion.* TO 'confuseduser'@'localhost' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
    exit
    sudo mysql -u confuseduser -p confusion

SEQUELIZE COMMANDS:
    sequelize db:migrate
    sequelize db:seed:all

START APPLICATION:
    npm start

FOR ENV variables
node REPL
require('crypto').randomBytes(64).toString('hex')

POST on POSTMAN body option x-www-form-urlencoded