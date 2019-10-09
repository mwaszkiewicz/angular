import { Injectable }       from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';
import { Certificate }      from './certificate.entity';

@Injectable()
export class CertificateService {
    constructor(
        @InjectRepository(Certificate)
        private readonly certificateRepository: Repository<Certificate>,
      ) {}

      findAll(): Promise<Certificate[]> {
        return this.certificateRepository.find();
      }
}
