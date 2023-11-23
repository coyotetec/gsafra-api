import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/database';
import Abastecimento from '../models/Abastecimento';
import AbastecimentoCiclo from '../models/AbastecimentoCiclo';
import AbastecimentoCicloTs from '../models/AbastecimentoCicloTs';
import AgriAplicacaoFase from '../models/AgriAplicacaoFase';
import AgriAtv from '../models/AgriAtv';
import AgriAtvInsumo from '../models/AgriAtvInsumo';
import AgriAtvMaquina from '../models/AgriAtvMaquina';
import AgriAtvTalhaoSafra from '../models/AgriAtvTalhaoSafra';
import AgriTipoAplicacao from '../models/AgriTipoAplicacao';
import Almoxarifado from '../models/Almoxarifado';
import CicloProducao from '../models/CicloProducao';
import Cultura from '../models/Cultura';
import Dispositivo from '../models/Dispositivo';
import Empresa from '../models/Empresa';
import EstacaoFenologico from '../models/EstacaoFenologico';
import Patrimonio from '../models/Patrimonio';
import PlanAtv from '../models/PlanAtv';
import PlanAtvInsumo from '../models/PlanAtvInsumo';
import PlanAtvMaquina from '../models/PlanAtvMaquina';
import PlanAtvTalhaoSafra from '../models/PlanAtvTalhaoSafra';
import ProdutoAlmoxarifado from '../models/ProdutoAlmoxarifado';
import Talhao from '../models/Talhao';
import TalhaoSafra from '../models/TalhaoSafra';
import TipoAtividade from '../models/TipoAtividade';
import Unidade from '../models/Unidade';
import Usuario from '../models/Usuario';
import Variedade from '../models/Variedade';

const sequelize = new Sequelize(dbConfig);

// Initialize all table models;
Empresa.initialize(sequelize);
Dispositivo.initialize(sequelize);
Usuario.initialize(sequelize);
Patrimonio.initialize(sequelize);
Almoxarifado.initialize(sequelize);
Unidade.initialize(sequelize);
ProdutoAlmoxarifado.initialize(sequelize);
Cultura.initialize(sequelize);
CicloProducao.initialize(sequelize);
Talhao.initialize(sequelize);
Variedade.initialize(sequelize);
TalhaoSafra.initialize(sequelize);
Abastecimento.initialize(sequelize);
AbastecimentoCiclo.initialize(sequelize);
AbastecimentoCicloTs.initialize(sequelize);
TipoAtividade.initialize(sequelize);
AgriAplicacaoFase.initialize(sequelize);
AgriTipoAplicacao.initialize(sequelize);
EstacaoFenologico.initialize(sequelize);
PlanAtv.initialize(sequelize);
PlanAtvInsumo.initialize(sequelize);
PlanAtvMaquina.initialize(sequelize);
PlanAtvTalhaoSafra.initialize(sequelize);
AgriAtv.initialize(sequelize);
AgriAtvInsumo.initialize(sequelize);
AgriAtvMaquina.initialize(sequelize);
AgriAtvTalhaoSafra.initialize(sequelize);

// Make all models relationships;
Empresa.associate();
Dispositivo.associate();
Usuario.associate();
Patrimonio.associate();
Almoxarifado.associate();
Unidade.associate();
ProdutoAlmoxarifado.associate();
Cultura.associate();
CicloProducao.associate();
Talhao.associate();
Variedade.associate();
TalhaoSafra.associate();
Abastecimento.associate();
AbastecimentoCiclo.associate();
TipoAtividade.associate();
AgriAplicacaoFase.associate();
AgriTipoAplicacao.associate();
EstacaoFenologico.associate();
PlanAtv.associate();
PlanAtvInsumo.associate();
AgriAtv.associate();

sequelize.sync({
  alter: {
    drop: false,
  },
}).then(() => {
  const host = process.env.DB_HOST || 'localhost';

  console.log(`✅ Database synchronized successfully with host: ${host}`);
});

export default sequelize;
