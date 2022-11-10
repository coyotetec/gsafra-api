import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import AbastecimentoCiclo from './AbastecimentoCiclo';
import Almoxarifado from './Almoxarifado';
import CicloProducao from './CicloProducao';
import Dispositivo from './Dispositivo';
import Empresa from './Empresa';
import Patrimonio from './Patrimonio';
import ProdutoAlmoxarifado from './ProdutoAlmoxarifado';
import Usuario from './Usuario';

class Abastecimento extends Model<
  InferAttributes<Abastecimento>,
  InferCreationAttributes<Abastecimento>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare data_atual: string;
  declare data: string;
  declare hora: string;
  declare horimetro: number;
  declare id_patrimonio: ForeignKey<Patrimonio['id']>;
  declare id_almoxarifado: ForeignKey<Almoxarifado['id']>;
  declare id_produto_almoxarifado: ForeignKey<ProdutoAlmoxarifado['id']>;
  declare quantidade: number;
  declare numero_requisicao: CreationOptional<string>;
  declare id_usuario: ForeignKey<Usuario['id']>;
  declare id_dispositivo: ForeignKey<Dispositivo['id']>;
  declare status: CreationOptional<number>;
  declare data_atualizacao: CreationOptional<string>;

  static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_origem: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      data_atual: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      horimetro: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      quantidade: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false,
      },
      numero_requisicao: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
      },
      data_atualizacao: {
        type: DataTypes.DATE,
      },
    }, {
      sequelize,
      modelName: 'Abastecimento',
      tableName: 'abastecimento',
    });
  }

  static associate() {
    this.belongsToMany(CicloProducao, {
      through: AbastecimentoCiclo,
      foreignKey: 'id_abastecimento',
      uniqueKey: 'abastecimento_ciclo',
      as: 'safras',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
    this.belongsTo(Patrimonio, {
      foreignKey: 'id_patrimonio',
      as: 'patrimonios',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
    this.belongsTo(ProdutoAlmoxarifado, {
      foreignKey: 'id_produto_almoxarifado',
      as: 'produtos_almoxarifado',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default Abastecimento;
