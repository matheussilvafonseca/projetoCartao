import {Router} from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CrateCartaoController } from "./controllers/cartao/CreateCartaoController";
import { ValidateCartaoController } from "./controllers/cartao/ValidateCartaoController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// Rotas para User

router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/userinfo', isAuthenticated, new DetailUserController().handle)
router.post('/cartao', isAuthenticated, new CrateCartaoController().handle)
router.post('/validarcartao', isAuthenticated, new ValidateCartaoController().handle)

export {router};