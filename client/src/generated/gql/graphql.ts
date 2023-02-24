/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateMessageInput = {
  body: Scalars['String'];
};

export type FollowUserInput = {
  username: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['ID'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage: Message;
  followUser: User;
  login: Scalars['String'];
  register: User;
  unfollowUser: User;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationFollowUserArgs = {
  input: FollowUserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterUserInput;
};


export type MutationUnfollowUserArgs = {
  input: FollowUserInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  messages: Array<Message>;
  users: Array<User>;
};

export type RegisterUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type User = {
  __typename?: 'User';
  email: Scalars['ID'];
  followers: UserFollowers;
  following: UserFollowers;
  id: Scalars['ID'];
  username: Scalars['ID'];
};

export type UserFollowers = {
  __typename?: 'UserFollowers';
  count: Scalars['Float'];
  items: Array<User>;
};

export type TweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type TweetsQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: string, createdAt: string, body: string, user: { __typename?: 'User', username: string } }> };


export const TweetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tweets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<TweetsQuery, TweetsQueryVariables>;