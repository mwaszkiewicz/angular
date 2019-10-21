import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { Request, Response } from 'express';

@Controller('certificate')
export class CertificateController {

    constructor(private readonly certificateService: CertificateService) {
      }

    @Get()
    getAll(@Res() res: Response) : Response {
        let cert = this.certificateService.create('Fake Certificate');
        return res.status(HttpStatus.OK).json( { result: cert});
    }

    // @Get()
    // async getAll(@Req() request: Request) : Promise<Certificate[]> {
    //     console.log(request);
    //     return this.certificateService.findAll();
    // }

    @Post()
    create(@Body() certificateDto: string) {
        return certificateDto;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `we get the certificate with the id ${id}`;
    }

    @Put(':id')
    update(@Param('id') id: string) {
        return `we update the certificate with the id ${id}`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `we delete the certificate with the id ${id}`;
    }
}
