import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    BookModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, 
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), 
      context: ({ req, res }) => ({ req, res }),
      playground: true, 
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
