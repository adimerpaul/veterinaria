import { Injectable } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Documento } from './entities/documento.entity';
import { Repository } from 'typeorm';
import {Mascota} from "../mascotas/entities/mascota.entity";

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento)
    private documentoRepository: Repository<Documento>,
    @InjectRepository(Mascota)
    private mascotaRepository: Repository<Mascota>,
  ) {}
  async create(body, req) {
    console.log(req.user);
    // console.log(body);
    // this.$axios.post('documentos', {
    //   mascota_id: this.mascota.id,
    //   documento: this.documento,
    //   html: this.html,
    // }).then(response => {
    //   console.log(response)
    //   this.$emit('getMascota')
    // })
    const mascota = await this.mascotaRepository.findOne({where: {id: body.mascota_id}});
    body.mascota = mascota;
    body.user = {id: req.user.userId};
    const documento = this.documentoRepository.create(body);
    // console.log(documento);
    return await this.documentoRepository.save(documento);
  }

  findAll() {
    return `This action returns all documentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documento`;
  }

  async update(id: number, body) {
    // Buscar el documento por ID
    const documento = await this.documentoRepository.findOne({ where: { id } });

    // Verificar si el documento existe
    if (!documento) {
      throw new Error(`Documento con ID ${id} no encontrado`);
    }

    // Actualizar los campos que necesiten ser modificados
    if (body.html !== undefined) {
      documento.html = body.html;
    }

    // Guardar los cambios
    return await this.documentoRepository.save(documento);
  }

  remove(id: number) {
    return `This action removes a #${id} documento`;
  }
}
