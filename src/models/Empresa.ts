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
import Almoxarifado from './Almoxarifado';
import CicloProducao from './CicloProducao';
import Dispositivo from './Dispositivo';
import Patrimonio from './Patrimonio';
import ProdutoAlmoxarifado from './ProdutoAlmoxarifado';
import Talhao from './Talhao';
import TalhaoSafra from './TalhaoSafra';
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
  }
}

export default Empresa;
