import { Router } from "express";
import { CreateDataSeasonController } from "../../controllers/DataSeason/CreateDataSeasonController";
import { GetAllPlayersDataSeasonController } from "../../controllers/DataSeason/GetAllPlayersDataSeasonController";
import { GetOnePlayerAllDataSeasonController } from "../../controllers/DataSeason/GetOnePlayerAllDataSeasonController";

import { MessageController } from '../../controllers/MessageController'
import { CreatePlayerController } from "../../controllers/Player/CreatePlayerController";
import { GetAllPlayerController } from "../../controllers/Player/GetAllPlayerController";
import { CreateSeasonController } from "../../controllers/Season/CreateSeasonController";
import { AuthenticateUserController } from "../../controllers/User/AuthenticateUserController";

const router = Router();

const messageController = new MessageController();
const createPlayerController = new CreatePlayerController();
const getAllPlayerController = new GetAllPlayerController();
const createSeasonController = new CreateSeasonController();
const createDataSeasonController = new CreateDataSeasonController();
const getAllPlayerDataSeasonController = new GetAllPlayersDataSeasonController();
const getOnePlayerAllDataSeasonController = new GetOnePlayerAllDataSeasonController();
const authenticateUserController = new AuthenticateUserController();

router.get('/', messageController.handle)
router.get('/players', getAllPlayerDataSeasonController.handle)
router.get('/playersid', getAllPlayerController.handle)
router.get('/players/:playerId', getOnePlayerAllDataSeasonController.handle )
router.post('/player', createPlayerController.handle)
router.post('/season', createSeasonController.handle)
router.post('/season/data', createDataSeasonController.handle)
router.post('/authuser', authenticateUserController.handle)

export { router }
