import { SchemaFactory } from '@nestjs/mongoose';
import { Project } from '../../interfaces/project.interface';

export const ProjectSchema = SchemaFactory.createForClass(Project);
