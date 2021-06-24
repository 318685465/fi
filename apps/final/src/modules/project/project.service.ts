import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../../interfaces/project.interface';
import { IResponse } from '../../interfaces/response.interface';
import { UserService } from '../user/user.service';

const logger = new Logger('project.service');

@Injectable()
export class ProjectService {
  private response: IResponse;
  private pageSize: number = 8;
  constructor(
    @InjectModel('PROJECT_MODEL') private readonly projectModel: Model<Project>,
    private readonly userService: UserService,
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
      const project = await createProject.save();
      this.userService.addUserProject(project._id, project.creatorId);
      this.response = {
        code: 0,
        msg: {
          msg: '创建项目成功',
          projectId: project._id,
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

  public async getProjectsByUser(userid: string, page?: number) {
    const identifies = {};
    let projects: Array<Project>;
    let pageNums: number;
    try {
      const user = await this.userService.findOneById(userid);
      const projectIds = user.projects.map(v => {
        identifies[v.projectId] = v.identify;
        return v.projectId;
      });
      pageNums = Math.ceil(user.projects.length / this.pageSize);
      projects = await this.projectModel
        .find({
          _id: { $in: projectIds },
        })
        .skip(page ? (page - 1) * this.pageSize : 0)
        .limit(this.pageSize);
    } catch (error) {
      this.response = { code: 7, msg: '查询项目失败' };
    }
    projects = projects.map(v => {
      const date: Date = v._id.getTimestamp();
      v['date'] = date.toLocaleString();
      v['identify'] = identifies[v._id];
      return v;
    });
    this.response = { code: 0, msg: { projects, pageNums, page } };
    return this.response;
  }
}
