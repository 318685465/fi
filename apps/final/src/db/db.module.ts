import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './schema/profile.schema';
import { ProjectSchema } from './schema/project.schema';
import { UserSchema } from './schema/user.schema';

const MONGO_MODELS = MongooseModule.forFeature([
  {
    name: 'USER_MODEL',
    schema: UserSchema,
    collection: 'user',
  },
  {
    name: 'PROJECT_MODEL',
    schema: ProjectSchema,
    collection: 'project',
  },
  {
    name: 'PROFILE_MODEL',
    schema: ProfileSchema,
    collection: 'profile',
  },
]);

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/liuc_management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    MONGO_MODELS,
  ],
  exports: [MONGO_MODELS],
})
export class DbModule1 {}
