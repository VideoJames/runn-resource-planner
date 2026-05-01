import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
	uri: 'https://kind-polecat-55.hasura.app/v1/graphql',
	cache: new InMemoryCache(),
	headers: {
		'x-hasura-admin-secret': import.meta.env.VITE_HASURA_SECRET,
	},
})