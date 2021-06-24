import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Profile } from './models/profile.model';
import { User } from './models/user.model';
import { Project } from './models/project.model';

const models = TypegooseModule.forFeature([Profile, User, Project]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/liuc_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
