import { Router } from "express";
import { GetAllPlayersDataSeasonController } from "../../controllers/DataSeason/GetAllPlayersDataSeasonController";
import { GetOnePlayerAllDataSeasonController } from "../../controllers/DataSeason/GetOnePlayerAllDataSeasonController";

import { MessageController } from '../../controllers/MessageController'
import { GetAllPlayerController } from "../../controllers/Player/GetAllPlayerController";
import { GetAllSeasonController } from "../../controllers/Season/GetAllSeasonController";
import { AuthenticateUserController } from "../../controllers/User/AuthenticateUserController";

const router = Router();

const messageController = new MessageController();
const getAllPlayerController = new GetAllPlayerController();
const getAllPlayerDataSeasonController = new GetAllPlayersDataSeasonController();
const getOnePlayerAllDataSeasonController = new GetOnePlayerAllDataSeasonController();
const getAllSeasonController = new GetAllSeasonController();
const authenticateUserController = new AuthenticateUserController();

router.get('/', messageController.handle)
router.get('/players', getAllPlayerDataSeasonController.handle)
router.get('/allplayers', getAllPlayerController.handle)
router.get('/player/:playerId', getOnePlayerAllDataSeasonController.handle )
router.get('/seasons', getAllSeasonController.handle)
router.post('/authuser', authenticateUserController.handle)

export { router }
