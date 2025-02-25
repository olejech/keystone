## Feature Example - Extend GraphQL Schema GraphQL TS

This project demonstrates how to extend the GraphQL API provided by Keystone with custom queries and mutations using [graphql-ts](https://github.com/Thinkmill/graphql-ts).
It builds on the [Blog](../blog) starter project.

## Instructions

To run this project, clone the Keystone repository locally, run `pnpm` at the root of the repository then navigate to this directory and run:

```shell
pnpm dev
```

This will start the Admin UI at [localhost:3000](http://localhost:3000).
You can use the Admin UI to create items in your database.

You can also access a GraphQL Playground at [localhost:3000/api/graphql](http://localhost:3000/api/graphql), which allows you to directly run GraphQL queries and mutations.

## Features

This project demonstrates how to extend the GraphQL API provided by Keystone with custom queries and mutations.
Schema extensions are set using the [`extendGraphqlSchema`](https://keystonejs.com/docs/config/config#extend-graphql-schema) config option.

The `graphql.extend` function allows you to extend the existing query and mutation types and define new types or use existing types in your extension.

See the [`@graphql-ts/schema`](https://docsmill.dev/npm/@graphql-ts/schema) and [`@graphql-ts/extend`](https://docsmill.dev/npm/@graphql-ts/extend) docs for more information.

## Try it out in CodeSandbox 🧪

You can play with this example online in a web browser using the free [codesandbox.io](https://codesandbox.io/) service. To launch this example, open the URL <https://githubbox.com/keystonejs/keystone/tree/main/examples/extend-graphql-schema-graphql-ts>. You can also fork this sandbox to make your own changes.
