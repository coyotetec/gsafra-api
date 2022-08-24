import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/database';
import Abastecimento from '../models/Abastecimento';
import AbastecimentoCiclo from '../models/AbastecimentoCiclo';
import AbastecimentoCicloTs from '../models/AbastecimentoCicloTs';
import Almoxarifado from '../models/Almoxarifado';
import CicloProducao from '../models/CicloProducao';
import Dispositivo from '../models/Dispositivo';
import Empresa from '../models/Empresa';
import Patrimonio from '../models/Patrimonio';
import ProdutoAlmoxarifado from '../models/ProdutoAlmoxarifado';
import Talhao from '../models/Talhao';
import TalhaoSafra from '../models/TalhaoSafra';
import Usuario from '../models/Usuario';
import Variedade from '../models/Variedade';

const sequelize = new Sequelize(dbConfig);

// Initialize all table models;
Empresa.initialize(sequelize);
Dispositivo.initialize(sequelize);
Usuario.initialize(sequelize);
Patrimonio.initialize(sequelize);
Almoxarifado.initialize(sequelize);
ProdutoAlmoxarifado.initialize(sequelize);
CicloProducao.initialize(sequelize);
Talhao.initialize(sequelize);
Variedade.initialize(sequelize);
TalhaoSafra.initialize(sequelize);
Abastecimento.initialize(sequelize);
AbastecimentoCiclo.initialize(sequelize);
AbastecimentoCicloTs.initialize(sequelize);

// Make all models relationships;
Empresa.associate();
CicloProducao.associate();
Talhao.associate();
TalhaoSafra.associate();
Variedade.associate();
Abastecimento.associate();
AbastecimentoCiclo.associate();
Patrimonio.associate();
Almoxarifado.associate();
ProdutoAlmoxarifado.associate();
Usuario.associate();
Dispositivo.associate();

sequelize.sync().then(() => console.log('🔥 Database synchronized successfully'));

export default sequelize;
