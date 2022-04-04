import {Router} from "express";
import models from "../models/index.js";
import * as https from 'https';

const messageRouter = Router();

messageRouter.get('/', async (req,res) => {
    const messageFindAll  = await models.messages.findAll();
    return res.send(messageFindAll);
});

messageRouter.get('/:id', async (req, res) => {
    const messageFindById = await models.messages.findByPk(req.params.id);
    res.send(messageFindById);
});

messageRouter.post('/', async (req, res) => {
    const messageCreated = await models.messages.create({
        users:req.body.users,
        messages:req.body.messages,
    });
    res.send(messageCreated);
});

messageRouter.put('/:id', async (req, res) => {
    try {
        const messageUpdated = await models.messages.update({
            users:req.body.users,
            messages:req.body.messages,
        }, {
            where:{id:req.params.id}
        });
        if (!messageUpdated) throw('Error Updated Data');
        const resultMessage = await models.messages.findByPk(req.params.id);
        if (!resultMessage) throw('Error while fetch data');
        res.send(true);   
    } catch (error) {
        res.send(error);
    }
});

messageRouter.delete('/:id',async (req, res) => {
    try {
        const messageDeleted = await models.messages.destroy({
            where:{id:req.params.id},
        });
        if (!messageDeleted) throw('Error Deleted Data');
        res.send(true);   
    } catch (error) {
        res.send(error);
    }
});

messageRouter.get('/name/:id',async (req, res) => {
    try {
        const messagesend = await models.users.findByPk(req.params.id);
        if (!messagesend) throw('Error Deleted Data');
        const data = JSON.stringify({
            name: messagesend.firstname
            });

        const options = {
            hostname: "hookb.in",
            port: 443,
            path: "/YV9zXX86LeCQERGGdl9w",
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length
            }
        }

        const req = https.request(options, (res) => {
            console.log(`status: ${res.statusCode}`);
        });

        req.send(data);
        req.end();
           
    } catch (error) {
        res.send(error);
    }
});

export default messageRouter;