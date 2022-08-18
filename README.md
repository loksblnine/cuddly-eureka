# cuddly-eureka
тук, стартуем с 
```sh
git clone https://github.com/loksblnine/cuddly-eureka.git
```
в корневой директории устанавливаем все зависимости
```sh
npm install
```

//тут добавить про докер и миграции с сидами//

`http://localhost:5000/users/all` - возвращает пользователей для ролей. Роль определяется Bearer токеном приложенным в хедер авторизации, который можно 
получить залогинившись по роуту `http://localhost:5000/auth/login`. 
Также можно зарегистроваться `http://localhost:5000/auth/register` пример тела запроса JSON: 
```sh
{
  "email": "abcemail@gm.ail",
  "password": "passwordsecret",
  "role" : /*2 for Boss, 3 for Regular user*/
}
```
креды для доступа как админ лежат в папке с сидами. ТОлько админы могут создавать других админов.

crud для юзеров по айди с токеном админа доступны по роуту `http://localhost:5000/users/:id`

`http://localhost:5000/users/change-boss` для смены босса c токеном босса, пример тела запроса JSON: 
```sh
{
  "newBossId": number,
  "regularUser": number
}
```


`http://localhost:5000/users/change-boss` для добавления связей босса c токеном админа, пример тела запроса JSON: 
```sh
{
  "bossId": number,
  "regularUser": number
}
```
