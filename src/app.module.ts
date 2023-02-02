import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListModel } from './lists/entities/list.model';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [ListsModule, SequelizeModule.forRoot({
    dialect: 'sqlite',
    host: ':memory:',
    models: [ListModel],
    autoLoadModels: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
