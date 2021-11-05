import { Router } from "express";
import { CreateDataSeasonController } from "../../controllers/DataSeason/CreateDataSeasonController";
import { CreatePlayerController } from "../../controllers/Player/CreatePlayerController";
import { CreateSeasonController } from "../../controllers/Season/CreateSeasonController";
import { AuthenticateUserController } from "../../controllers/User/AuthenticateUserController";

import { verifyAdmin } from "../../middlewares/verifyAdmin";

const authenticatedRouter = Router();


const createPlayerController = new CreatePlayerController();
const createSeasonController = new CreateSeasonController();
const createDataSeasonController = new CreateDataSeasonController();
const authenticateUserController = new AuthenticateUserController();

authenticatedRouter.use(verifyAdmin)
authenticatedRouter.post('/player', createPlayerController.handle)
authenticatedRouter.post('/season', createSeasonController.handle)
authenticatedRouter.post('/season/data', createDataSeasonController.handle)
authenticatedRouter.post('/authuser', authenticateUserController.handle)

export { authenticatedRouter }
