import { Request, Response } from 'express';
import Dispositivo from '../models/Dispositivo';
import Empresa from '../models/Empresa';

export default {
  async index(request: Request, response: Response) {
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const dispositivos = await Dispositivo.findAll({
      where: {
        id_empresa: Number(id_empresa),
      },
    });

    return response.json(dispositivos);
  },

  async show(request: Request, response: Response) {
    const { 'id-empresa': id_empresa } = request.headers;
    const { id } = request.params;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const dispositivo = await Dispositivo.findByPk(Number(id));

    if (!dispositivo) {
      return response.status(400).json({ erro: 'Dispositivo não existe' });
    }

    return response.json(dispositivo);
  },

  async store(request: Request, response: Response) {
    const { nome, informacoes } = request.body;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const dispositivo = await Dispositivo.create({
      id_empresa: Number(id_empresa),
      nome,
      informacoes,
      ...(empresa.id_cliente_empresa === 1212 && { status: 1 }),
    });

    return response.status(201).json(dispositivo);
  },
};
