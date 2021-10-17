CREATE DATABASE:
    sudo mysql;
    CREATE DATABASE confusion;
    exit

SEQUELIZE Migration Setup:
    sequelize init
    sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
    sequelize db:migrate
    sequelize seed:generate --name demo-user
    sequelize db:seed:all
