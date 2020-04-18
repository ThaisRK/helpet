const express = require('express');

const User = require('../models/User');

const router = express.Router();

//controller de autenticação
router.post('/register', async (req, res) => { //cria usuário ao acessar a rota
    const {email} = req.body;

    try {
        if (await User.findOne({email}))
        return res.status(400).send({error: 'Usuário já existe'})

        const user = await User.create(req.body) //pega todos os parâmetros que o usuário está enviando
        user.password = undefined;
        
        return res.send({user});
    } catch (err) {
        return res.status(400).send({error: 'Falha no registro'});
    }

});

//recupera o app do ./src/index.js
//recebe: app (parâmetro) | retorna: o app.use e define uma rota
//o auth será utilizado dentro do app a partir de uma rota
//a rota se chama /auth/register que chama a função de registro
module.exports = app => app.use('/auth', router);