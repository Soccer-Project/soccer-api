import { Router } from "express";
import { CreateDataSeasonController } from "../../controllers/DataSeason/CreateDataSeasonController";
import { CreatePlayerController } from "../../controllers/Player/CreatePlayerController";
import { CreateSeasonController } from "../../controllers/Season/CreateSeasonController";

import { verifyAdmin } from "../../middlewares/verifyAdmin";

const authenticatedRouter = Router();


const createPlayerController = new CreatePlayerController();
const createSeasonController = new CreateSeasonController();
const createDataSeasonController = new CreateDataSeasonController();

authenticatedRouter.use(verifyAdmin)
authenticatedRouter.post('/player', createPlayerController.handle)
authenticatedRouter.post('/season', createSeasonController.handle)
authenticatedRouter.post('/season/data', createDataSeasonController.handle)

export { authenticatedRouter }
