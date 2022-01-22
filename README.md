CREATE DATABASE:
    sudo mysql;
    CREATE DATABASE confusion;
    SET GLOBAL validate_password.policy=LOW;
    CREATE USER 'confuseduser'@'localhost' IDENTIFIED BY 'enigma123!';
    GRANT ALL ON confusion.* TO 'confuseduser'@'localhost' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
    exit
    sudo mysql -u confuseduser -p confusion

SEQUELIZE Migration Setup:
    sequelize init
    sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
    sequelize db:migrate
    sequelize seed:generate --name demo-user
    sequelize db:seed:all

START APPLICATION:
    npm start

FOR ENV variables
node REPL
require('crypto').randomBytes(64).toString('hex')

POST on POSTMAN body option x-www-form-urlencoded



HTTPS:
cd bin
openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem