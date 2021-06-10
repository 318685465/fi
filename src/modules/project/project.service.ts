import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/interfaces/project.interface';
import { IResponse } from 'src/interfaces/response.interface';

const logger = new Logger('project.service');

@Injectable()
export class ProjectService {
  private response: IResponse;
  constructor(
    @InjectModel('PROJECT_MODEL') private readonly projectModel: Model<Project>,
  ) {}

  /**
   * @description 创建项目
   * @date 10/06/2021
   * @param {Project} project
   * @return {*}
   * @memberof ProjectService
   */
  public async createProject(project: Project) {
    const createProject = new this.projectModel(project);
    try {
      const data = await createProject.save();
      this.response = {
        code: 0,
        msg: {
          msg: '创建项目成功',
          projectId: data._id,
        },
      };
    } catch (error) {
      logger.warn('创建项目失败');
      this.response = { code: 6, msg: '创建项目失败' };
    } finally {
      return this.response;
    }
  }

  /**
   * @description 删除项目
   * @date 10/06/2021
   * @param {string} projectId
   * @memberof ProjectService
   */
  public async deleteProjectById(projectId: string) {
    try {
      await this.projectModel.findByIdAndDelete(projectId);
      this.response = { code: 0, msg: '项目删除成功' };
    } catch (error) {
      this.response = { code: 7, msg: '删除项目失败' };
    }

    return this.response;
  }

  /**
   * @description 项目修改
   * @date 10/06/2021
   * @param {string} projectId
   * @param {Project} project
   * @return {*}
   * @memberof ProjectService
   */
  public async alterProjectById(projectId: string, project: Project) {
    try {
      await this.projectModel.findByIdAndUpdate(projectId, project);
      this.response = { code: 0, msg: '项目修改成功' };
    } catch (error) {
      this.response = { code: 7, msg: '项目修改失败' };
    }
    return this.response;
  }

  public async findProjectById(ProjectId: string) {
    try {
      const _project = await this.projectModel.findById(ProjectId);
      this.response = { code: 0, msg: _project };
    } catch (error) {
      this.response = { code: 7, msg: '查询项目失败' };
    }
    return this.response;
  }
}
