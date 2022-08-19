import express from 'express';
import AlmoxarifadoController from './controllers/AlmoxarifadoController';
import DispositivoController from './controllers/DispositivoController';
import EmpresaController from './controllers/EmpresaController';
import PatrimonioController from './controllers/PatrimonioController';
import ProdutoAlmoxarifadoController from './controllers/ProdutoAlmoxarifadoController';
import CicloProducaoController from './controllers/CicloProducaoController';
import TalhaoController from './controllers/TalhaoController';
import TalhaoSafraController from './controllers/TalhaoSafraController';
import UsuarioController from './controllers/UsuarioController';
import AbastecimentoController from './controllers/AbastecimentoController';

import { dispositivoValidation } from './validators/DispositivoValidator';
import { empresaValidation } from './validators/EmpresaValidator';
import { usuarioValidation } from './validators/UsuarioValidator';
import AbastecimentoCicloController from './controllers/AbastecimentoCicloController';
import AbastecimentoCicloTsController from './controllers/AbastecimentoCicloTsController';
import VariedadeController from './controllers/VariedadeController';

const routes = express.Router();

routes.get('/empresas', EmpresaController.index);
routes.post('/empresas', empresaValidation, EmpresaController.store);
routes.post('/empresas/login', EmpresaController.login);

routes.get('/dispositivos', DispositivoController.index);
routes.post('/dispositivos', dispositivoValidation, DispositivoController.store);

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', usuarioValidation, UsuarioController.store);
routes.post('/usuarios/login', UsuarioController.login);

routes.get('/patrimonios', PatrimonioController.index);
routes.post('/patrimonios', PatrimonioController.store);

routes.get('/almoxarifados', AlmoxarifadoController.index);
routes.post('/almoxarifados', AlmoxarifadoController.store);

routes.get('/produtos-almoxarifado', ProdutoAlmoxarifadoController.index);
routes.post('/produtos-almoxarifado', ProdutoAlmoxarifadoController.store);

routes.get('/safras', CicloProducaoController.index);
routes.post('/safras', CicloProducaoController.store);
routes.get('/safras/:id/talhoes', TalhaoSafraController.getTalhoesFromSafra);
routes.post('/safras/:id/talhoes', TalhaoSafraController.addTalhaoToSafra);

routes.get('/talhoes', TalhaoController.index);
routes.post('/talhoes', TalhaoController.store);
routes.get('/talhoes/:id/safras', TalhaoSafraController.getSafrasFromTalhao);
routes.post('/talhoes/:id/safras', TalhaoSafraController.addSafraToTalhao);

routes.get('/variedades', VariedadeController.index);
routes.post('/variedades', VariedadeController.store);

routes.get('/abastecimentos', AbastecimentoController.index);
routes.post('/abastecimentos', AbastecimentoController.store);

routes.get('/talhoes-safras', TalhaoSafraController.index);

routes.get('/abastecimentos-ciclos', AbastecimentoCicloController.index);
routes.get('/abastecimentos-ciclos-ts', AbastecimentoCicloTsController.index);

export { routes };
