import { ApolloLink } from "apollo-link";
import { firestore } from "firebase";
import { DocumentNode } from "graphql";
export interface Options {
    database: firestore.Firestore;
    partialSchema: DocumentNode;
}
export declare function createFirestoreLink({ database, partialSchema }: Options): ApolloLink;
