import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { FightersModule } from './fighters/fighters.module';
import { EventsModule } from './events/events.module';
import { FightsModule } from './fights/fights.module';
import { WeightClassesModule } from './weight-classes/weight-classes.module';
import { FightResultsModule } from './fight-results/fight-results.module';
import { RankingsModule } from './rankings/rankings.module';
import { TeamsModule } from './teams/teams.module';
import { FighterStatsModule } from './fighter-stats/fighter-stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: process.env.NODE_ENV !== 'production',
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME', 'ufc_db'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') !== 'production',
        retryAttempts: 3,
        retryDelay: 3000,
      }),
      inject: [ConfigService],
    }),
    FightersModule,
    EventsModule,
    FightsModule,
    WeightClassesModule,
    FightResultsModule,
    RankingsModule,
    TeamsModule,
    FighterStatsModule,  // Add this line
  ],
})
export class AppModule {}