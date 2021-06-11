import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Project } from 'src/interfaces/project.interface';
import { ProjectService } from './project.service';

@Controller('project')
@ApiTags('用户项目模块')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @ApiOperation({
    summary: '新增项目',
  })
  public addProject(@Body() project: Project) {
    return this.projectService.createProject(project);
  }

  @Post('delete/:id')
  @ApiOperation({
    summary: '删除项目',
  })
  public removeProject(@Param('id') projectId: string) {
    return this.projectService.deleteProjectById(projectId);
  }

  @Post('alter/:id')
  @ApiOperation({
    summary: '修改项目',
  })
  public changeProject(
    @Param('id') projectId: string,
    @Body() project: Project,
  ) {
    return this.projectService.alterProjectById(projectId, project);
  }

  @Post('find/:id')
  @ApiOperation({
    summary: '查询项目',
  })
  public findProject(@Param('id') projectId: string) {
    return this.projectService.findProjectById(projectId);
  }

  @Get('projects/:id/:page')
  @ApiOperation({
    summary: '根据用户id获取所有项目',
  })
  public getAllProject(
    @Param('id') userid: string,
    @Param('page') page: number,
  ) {
    return this.projectService.getProjectsByUser(userid, page);
  }
}
