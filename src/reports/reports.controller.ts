import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin-guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/model/user.entity';
import { ApprovedReportDto } from './dto/approve-report-dto';
import CreateReportDto from './dto/create-report-dto';
import { GetEstimateDto } from './dto/get-estimate-dto';
import { ReportDto } from './dto/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportService: ReportsService) {}

    @Post()
    //Make sure user is signed in.
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.createReport(body, user)
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    changeApproval(@Param('id') id: string, @Body() body: ApprovedReportDto) {
        this.reportService.changeApproval(id, body)
    }

    @Get()
    getCarEstimate(@Query() query: GetEstimateDto) {
       this.reportService.createEstimate(query)
    }
}

/*
Order of execution from an incoming request

Middlewares
Guards
Interceptors

*/
