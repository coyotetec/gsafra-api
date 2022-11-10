import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import Abastecimento from './Abastecimento';
import AbastecimentoCiclo from './AbastecimentoCiclo';
import AbastecimentoCicloTs from './AbastecimentoCicloTs';
import AgriAplicacaoFase from './AgriAplicacaoFase';
import AgriAtv from './AgriAtv';
import AgriAtvInsumo from './AgriAtvInsumo';
import AgriAtvMaquina from './AgriAtvMaquina';
import AgriAtvTalhaoSafra from './AgriAtvTalhaoSafra';
import AgriTipoAplicacao from './AgriTipoAplicacao';
import Almoxarifado from './Almoxarifado';
import CicloProducao from './CicloProducao';
import Cultura from './Cultura';
import Dispositivo from './Dispositivo';
import EstacaoFenologico from './EstacaoFenologico';
import Patrimonio from './Patrimonio';
import PlanAtv from './PlanAtv';
import PlanAtvInsumo from './PlanAtvInsumo';
import PlanAtvMaquina from './PlanAtvMaquina';
import PlanAtvTalhaoSafra from './PlanAtvTalhaoSafra';
import ProdutoAlmoxarifado from './ProdutoAlmoxarifado';
import Talhao from './Talhao';
import TalhaoSafra from './TalhaoSafra';
import TipoAtividade from './TipoAtividade';
import Unidade from './Unidade';
import Usuario from './Usuario';
import Variedade from './Variedade';

class Empresa extends Model<
  InferAttributes<Empresa>,
  InferCreationAttributes<Empresa>
> {
  declare id: CreationOptional<number>;
  declare id_cliente_empresa: number;
  declare nome: string;
  declare senha: string;
  declare status: CreationOptional<number>;
  declare excluido: CreationOptional<number>;
  declare id_origem: CreationOptional<number>;

  static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_cliente_empresa: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      id_origem: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      senha: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
      },
      excluido: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Empresa',
      tableName: 'empresa',
    });
  }

  static associate() {
    this.hasMany(Dispositivo, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'dispositivos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(Usuario, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'usuarios',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(Patrimonio, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'patrimonios',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(Almoxarifado, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'almoxarifados',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(ProdutoAlmoxarifado, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'produtos_almoxarifado',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(Talhao, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'talhoes',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(CicloProducao, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'safras',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(TalhaoSafra, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'talhoes_safras',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(Variedade, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'variedades',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(Abastecimento, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'abastecimentos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AbastecimentoCiclo, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'abastecimentos_ciclos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AbastecimentoCicloTs, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'abastecimentos_ciclos_ts',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(TipoAtividade, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'tipos_atividades',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAplicacaoFase, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'fases_aplicacao',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriTipoAplicacao, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'tipos_aplicacao',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(Unidade, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'unidades',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(Cultura, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'culturas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(EstacaoFenologico, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'estadios_fenologicos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(PlanAtv, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'planejamentos_atividade',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(PlanAtvInsumo, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'planejamentos_atividade_insumos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(PlanAtvMaquina, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'planejamentos_atividade_maquinas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(PlanAtvTalhaoSafra, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'planejamentos_atividade_talhao_safra',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtv, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'atividades_agricolas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtvInsumo, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'atividades_agricolas_insumos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtvMaquina, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'atividades_agricolas_maquinas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtvTalhaoSafra, {
      sourceKey: 'id',
      foreignKey: 'id_empresa',
      as: 'atividades_agricolas_talhao_safra',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default Empresa;
