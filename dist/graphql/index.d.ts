import { DocumentNode, GraphQLSchema } from "graphql";
import { PubSub } from "graphql-subscriptions";
export declare const pubsub: PubSub;
export declare function createFullSchema(partialSchema: DocumentNode): GraphQLSchema;
