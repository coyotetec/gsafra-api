import express from 'express';

import { dispositivoValidation } from './validators/DispositivoValidator';
import { empresaValidation } from './validators/EmpresaValidator';
import { usuarioValidation } from './validators/UsuarioValidator';

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
import AbastecimentoCicloController from './controllers/AbastecimentoCicloController';
import AbastecimentoCicloTsController from './controllers/AbastecimentoCicloTsController';
import VariedadeController from './controllers/VariedadeController';
import TipoAtividadeController from './controllers/TipoAtividadeController';
import AgriAplicacaoFaseController from './controllers/AgriAplicacaoFaseController';
import AgriTipoAplicacaoController from './controllers/AgriTipoAplicacaoController';
import UnidadeController from './controllers/UnidadeController';
import CulturaController from './controllers/CulturaController';
import EstacaoFenologicoController from './controllers/EstacaoFenologicoController';
import PlanAtvController from './controllers/PlanAtvController';
import PlanAtvInsumoController from './controllers/PlanAtvInsumoController';
import PlanAtvMaquinaController from './controllers/PlanAtvMaquinaController';
import PlanAtvTalhaoSafraController from './controllers/PlanAtvTalhaoSafraController';
import AgriAtvController from './controllers/AgriAtvController';
import AgriAtvInsumoController from './controllers/AgriAtvInsumoController';
import AgriAtvMaquinaController from './controllers/AgriAtvMaquinaController';
import AgriAtvTalhaoSafraController from './controllers/AgriAtvTalhaoSafraController';

const routes = express.Router();

routes.get('/empresas', EmpresaController.index);
routes.post('/empresas', empresaValidation, EmpresaController.store);
routes.post('/empresas/login', (req, res, next) => {
  console.log('Middleware login');
  next();
}, EmpresaController.login);

routes.get('/dispositivos', DispositivoController.index);
routes.get('/dispositivos/:id', DispositivoController.show);
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

routes.get('/talhoes-safras', TalhaoSafraController.index);

routes.get('/abastecimentos', AbastecimentoController.index);
routes.post('/abastecimentos', AbastecimentoController.store);

routes.get('/abastecimentos-ciclos', AbastecimentoCicloController.index);
routes.get('/abastecimentos-ciclos-ts', AbastecimentoCicloTsController.index);

routes.get('/tipos-atividades', TipoAtividadeController.index);
routes.post('/tipos-atividades', TipoAtividadeController.store);

routes.get('/fases-aplicacao', AgriAplicacaoFaseController.index);
routes.post('/fases-aplicacao', AgriAplicacaoFaseController.store);

routes.get('/tipos-aplicacao', AgriTipoAplicacaoController.index);
routes.post('/tipos-aplicacao', AgriTipoAplicacaoController.store);

routes.get('/unidades-medida', UnidadeController.index);
routes.post('/unidades-medida', UnidadeController.store);

routes.get('/culturas', CulturaController.index);
routes.post('/culturas', CulturaController.store);

routes.get('/estadios-fenologicos', EstacaoFenologicoController.index);
routes.post('/estadios-fenologicos', EstacaoFenologicoController.store);

routes.get('/planejamento-atividade', PlanAtvController.index);
routes.post('/planejamento-atividade', PlanAtvController.store);

routes.get('/planejamento-atividade-insumos', PlanAtvInsumoController.index);
routes.get('/planejamento-atividade-maquinas', PlanAtvMaquinaController.index);
routes.get('/planejamento-atividade-talhoes-safras', PlanAtvTalhaoSafraController.index);

routes.get('/atividades-agricolas', AgriAtvController.index);
routes.post('/atividades-agricolas', AgriAtvController.store);

routes.get('/atividades-agricolas-insumos', AgriAtvInsumoController.index);
routes.get('/atividades-agricolas-maquinas', AgriAtvMaquinaController.index);
routes.get('/atividades-agricolas-talhoes-safras', AgriAtvTalhaoSafraController.index);

export { routes };
