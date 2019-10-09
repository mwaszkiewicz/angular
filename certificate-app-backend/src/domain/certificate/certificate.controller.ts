import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

@Controller('certificate')
export class CertificateController {
    @Get()
    getAll() {
        return 'we get all certificate';
    }

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
