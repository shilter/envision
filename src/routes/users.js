import {Router} from "express";
import models from "../models/index.js";

const usersRouter = Router();

usersRouter.get('/', async (req,res) => {
    const usersFindAll  = await models.users.findAll();
    return res.send(usersFindAll);
});

usersRouter.get('/:id', async (req, res) => {
    const usersFindById = await models.users.findByPk(req.params.id);
    res.send(usersFindById);
});

usersRouter.post('/', async (req, res) => {
    const usersCreated = await models.users.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        dateOfBirth:req.body.dateOfBirth,
        location:req.body.location
    });
    res.send(usersCreated);
});

usersRouter.put('/:id', async (req, res) => {
    try {
        const usersUpdated = await models.users.update({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            dateOfBirth:req.body.dateOfBirth,
            location:req.body.location
        }, {
            where:{id:req.params.id}
        });
        if (!usersUpdated) throw('Error Updated Data');
        const resultUsers = await models.users.findByPk(req.params.id);
        if (!resultProducts) throw('Error while fetch data');
        res.send(true);   
    } catch (error) {
        res.send(error);
    }
});

usersRouter.delete('/:id',async (req, res) => {
    try {
        const usersDeleted = await models.users.destroy({
            where:{id:req.params.id},
        });
        if (!usersDeleted) throw('Error Deleted Data');
        res.send(true);   
    } catch (error) {
        res.send(error);
    }
});

export default usersRouter;