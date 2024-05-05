import { Router } from "express";
import charactersController from "./controller/characters.controller";
import comicsController from "./controller/comics.controller";
import creatorsController from "./controller/creators.controller";
import { createCompilerHost } from "typescript";

const routes = Router()

//BUSCA PERSONAGENS API
routes.get('/characters', charactersController.findAll);       
routes.get('/characters/:id', charactersController.findById);

//BUSCA QUADRINHOS API
routes.get('/comics', comicsController.findAll);       
routes.get('/comics/:id', comicsController.findById);

//BUSCA ESCRITORES API
routes.get('/creators', creatorsController.findAll);
routes.get('/creators/:id', creatorsController.findById);

/*------------------------------------------------------------------------------------------------*/

//ROTAS PERSONAGENS BANCO
routes.get('/charactersDB', charactersController.findAllBanco);       
routes.get('/charactersDB/:id', charactersController.findByIdBanco);
routes.post('/charactersDB', charactersController.create);
routes.put('/charactersDB/:id', charactersController.update);
routes.delete('/charactersDB/:id', charactersController.delete);

//ROTAS QUADRINHOS BANCO
routes.get('/comicsDB', comicsController.findAllBanco);       
routes.get('/comicsDB/:id', comicsController.findByIdBanco);
routes.post('/comicsDB', comicsController.create);
routes.put('/comicsDB/:id', comicsController.update);
routes.delete('/comicsDB/:id', comicsController.delete);

//ROTAS ESCRITORES BANCO
routes.get('/creatorsDB', creatorsController.findAllBanco);       
routes.get('/creatorsDB/:id', creatorsController.findByIdBanco);
routes.post('/creatorsDB', creatorsController.create);
routes.put('/creatorsDB/:id', creatorsController.update);
routes.delete('/creatorsDB/:id', creatorsController.delete);

/*------------------------------------------------------------------------------------------------*/

//ROTAS ADICONAIS
//Personagem com mais de 1000 quadrinhos publicados
routes.get('/charactersDB/nome/:name', charactersController.findCharacterByName)
routes.get('/comicsDB/title/:title', comicsController.findComicByName)
routes.get('/creatorsDB/creator/:fullName', creatorsController.findCreatorByName)
routes.get('/charactersDB/maisQueMilComics', charactersController.findCharactersWithComicsAbove1000)
routes.get('/comicsDB/comicsComMaisDe25Paginas', comicsController.findComicsMorethan25Pages)


export{
    routes
}