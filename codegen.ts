import type {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://inctagram.work/api/v1/graphql',
    documents: ['src/**/*.{ts,tsx}'],
    generates: {
        './src/gql/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            }
        }
    }
}

export default config