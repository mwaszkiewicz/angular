import { Injectable }       from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';
import { Certificate }      from './certificate.entity';
import * as forge           from "node-forge";


@Injectable()
export class CertificateService {
    constructor(
        @InjectRepository(Certificate)
        private readonly certificateRepository: Repository<Certificate>,
      ) {}

      findAll(): Promise<Certificate[]> {
        return this.certificateRepository.find();
      }

      create(name : string): string {
        let pki = forge.pki;
        let keys = pki.rsa.generateKeyPair(2048);
        let cert = pki.createCertificate();
        cert.publicKey = keys.publicKey;
        cert.serialNumber = '01';
        cert.validity.notBefore = new Date();
        cert.validity.notAfter = new Date();
        cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
        var attrs = [{
          name: 'commonName',
          value: 'example.org'
        }, {
          name: 'countryName',
          value: 'US'
        }, {
          shortName: 'ST',
          value: 'Virginia'
        }, {
          name: 'localityName',
          value: 'Blacksburg'
        }, {
          name: 'organizationName',
          value: 'Test'
        }, {
          shortName: 'OU',
          value: 'Test'
        }];
        cert.setSubject(attrs);
        cert.setIssuer(attrs);
        cert.setExtensions([{
          name: 'basicConstraints',
          cA: true
        }, {
          name: 'keyUsage',
          keyCertSign: true,
          digitalSignature: true,
          nonRepudiation: true,
          keyEncipherment: true,
          dataEncipherment: true
        }, {
          name: 'extKeyUsage',
          serverAuth: true,
          clientAuth: true,
          codeSigning: true,
          emailProtection: true,
          timeStamping: true
        }, {
          name: 'nsCertType',
          client: true,
          server: true,
          email: true,
          objsign: true,
          sslCA: true,
          emailCA: true,
          objCA: true
        }, {
          name: 'subjectAltName',
          altNames: [{
            type: 6, // URI
            value: 'http://example.org/webid#me'
          }, {
            type: 7, // IP
            ip: '127.0.0.1'
          }]
        }, {
          name: 'subjectKeyIdentifier'
        }]);

        cert.sign(keys.privateKey);

        // convert a Forge certificate to PE
        let pem = pki.certificateToPem(cert);

        // convert a Forge certificate from PEM
        let certFromPem = pki.certificateFromPem(pem);
        console.log(certFromPem.subject);
        return JSON.stringify(certFromPem.issuer.attributes, null, 2)
      }
}
