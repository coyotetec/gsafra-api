-- CRIA EMPRESAS
INSERT INTO `empresa` (`id`,`id_cliente_empresa`,`nome`,`senha`,`excluido`) VALUES (1,100,'GSafra','$2b$10$FOT6Q0HXl8cjJ8jtGgZP9exd6VG4C6AOjqD/A3TVpl407aNZ04aMS',0);
INSERT INTO `empresa` (`id`,`id_cliente_empresa`,`nome`,`senha`,`excluido`) VALUES (2,100,'RYD','$2b$10$dc2Zb6ow9yB6W8kyybwNEOzj5k1erhVr/jt1WhaqHoOEITnsw3X62',0);

-- CRIA USUARIOS
INSERT INTO `usuario` (`id`,`id_origem`,`nome`,`login`,`senha`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (1,NULL,'GABRIEL','GABRIEL','$2b$10$FZrT8ow3Y9eL1.PvhjFOruHKT9O0VqIAbsB2NqgrVze85lQ/uap5O','2022-09-01 13:34:07',0,1);
INSERT INTO `usuario` (`id`,`id_origem`,`nome`,`login`,`senha`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (2,NULL,'IRAN','IRAN','$2b$10$GsL8/9ZFwy3gHkbdtQJcBuRNvWF5hvjMP0A6nGNpi9t2nUo43GJp2','2022-09-01 13:34:18',0,2);

-- CRIA PATRIMONIOS
INSERT INTO `patrimonio` (`id`,`id_origem`,`codigo_patrimonio`,`descricao`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (1,NULL,NULL,'Caminhonete GSafra','2022-09-01 14:27:38',0,1);
INSERT INTO `patrimonio` (`id`,`id_origem`,`codigo_patrimonio`,`descricao`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (2,NULL,NULL,'Caminhonete RYD','2022-09-01 14:27:46',0,2);
INSERT INTO `patrimonio` (`id`,`id_origem`,`codigo_patrimonio`,`descricao`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (4,NULL,NULL,'Strada','2022-09-01 14:28:11',0,1);
INSERT INTO `patrimonio` (`id`,`id_origem`,`codigo_patrimonio`,`descricao`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (5,NULL,NULL,'Trator de Rodas','2022-09-01 16:40:37',0,2);

-- CRIA ALMOXARIFADOS
INSERT INTO `almoxarifado` (`id`,`id_origem`,`nome`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (1,NULL,'Posto 1','2022-09-01 16:49:01',0,1);
INSERT INTO `almoxarifado` (`id`,`id_origem`,`nome`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (2,NULL,'Posto 2','2022-09-01 16:49:04 ',0,1);
INSERT INTO `almoxarifado` (`id`,`id_origem`,`nome`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (3,NULL,'Posto 3','2022-09-01 16:49:11',0,2);

-- CRIA PRODUTOS ALMOXARIFADOS
INSERT INTO `produto_almoxarifado` (`id`,`id_origem`,`nome`,`tipo`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (1,NULL,'Diesel',3,'2022-09-01 16:41:03',0,1);
INSERT INTO `produto_almoxarifado` (`id`,`id_origem`,`nome`,`tipo`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (2,NULL,'Gasolina Comum',3,'2022-09-01 16:41:14',0,1);
INSERT INTO `produto_almoxarifado` (`id`,`id_origem`,`nome`,`tipo`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (3,NULL,'Gasolina Aditivada',3,'2022-09-01 16:41:29',0,1);
INSERT INTO `produto_almoxarifado` (`id`,`id_origem`,`nome`,`tipo`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (4,NULL,'Alcool',3,'2022-09-01 16:41:49',1,2);

-- CRIA VARIEDADES
INSERT INTO `variedade` (`id`,`id_origem`,`nome`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (1,NULL,'VARIEDADE 1','2022-09-01 16:49:40',0,1);
INSERT INTO `variedade` (`id`,`id_origem`,`nome`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (2,NULL,'VARIEDADE 2','2022-09-01 16:49:44',0,1);
INSERT INTO `variedade` (`id`,`id_origem`,`nome`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (3,NULL,'VARIEDADE 3','2022-09-01 16:49:53',0,2);

-- CRIA TALHOES
INSERT INTO `talhao` (`id`,`id_origem`,`descricao`,`status`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (1,NULL,'Talhao 1',1,'2022-09-01 16:50:55',0,1);
INSERT INTO `talhao` (`id`,`id_origem`,`descricao`,`status`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (2,NULL,'Talhao 2',1,'2022-09-01 16:50:59',0,1);
INSERT INTO `talhao` (`id`,`id_origem`,`descricao`,`status`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (3,NULL,'Talhao 3',1,'2022-09-01 16:51:02',0,1);
INSERT INTO `talhao` (`id`,`id_origem`,`descricao`,`status`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (4,NULL,'Talhao 4',1,'2022-09-01 16:51:08',0,2);

-- CRIA SAFRAS
INSERT INTO `ciclo_producao` (`id`,`id_origem`,`nome`,`status`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (1,NULL,'Safra 1',1,'2022-09-01 16:50:16',0,1);
INSERT INTO `ciclo_producao` (`id`,`id_origem`,`nome`,`status`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (2,NULL,'Safra 2',1,'2022-09-01 16:50:19',0,1);
INSERT INTO `ciclo_producao` (`id`,`id_origem`,`nome`,`status`,`data_atualizacao`,`excluido`,`id_empresa`) VALUES (3,NULL,'Safra 3',1,'2022-09-01 16:50:27',0,2);

-- CRIA TALHOES SAFRAS
INSERT INTO `talhao_safra` (`id`,`id_origem`,`data_atualizacao`,`hectares`,`status`,`excluido`,`id_empresa`,`id_safra`,`id_talhao`,`id_variedade`) VALUES (4,NULL,'2022-09-01 17:05:20',123.000,1,0,1,1,1,1);
INSERT INTO `talhao_safra` (`id`,`id_origem`,`data_atualizacao`,`hectares`,`status`,`excluido`,`id_empresa`,`id_safra`,`id_talhao`,`id_variedade`) VALUES (5,NULL,'2022-09-01 17:05:23',123.000,1,0,1,1,1,2);
INSERT INTO `talhao_safra` (`id`,`id_origem`,`data_atualizacao`,`hectares`,`status`,`excluido`,`id_empresa`,`id_safra`,`id_talhao`,`id_variedade`) VALUES (6,NULL,'2022-09-01 17:05:29',123.000,1,0,1,1,2,2);
INSERT INTO `talhao_safra` (`id`,`id_origem`,`data_atualizacao`,`hectares`,`status`,`excluido`,`id_empresa`,`id_safra`,`id_talhao`,`id_variedade`) VALUES (7,NULL,'2022-09-01 17:06:13',123.000,1,0,1,2,3,2);
INSERT INTO `talhao_safra` (`id`,`id_origem`,`data_atualizacao`,`hectares`,`status`,`excluido`,`id_empresa`,`id_safra`,`id_talhao`,`id_variedade`) VALUES (8,NULL,'2022-09-01 17:06:36',123.000,1,0,2,3,3,3);
