import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.resolve();

function relativePath(target) {
    return path.join(path.dirname(fileURLToPath(import.meta.url)), target)
}

function markdown(string) {
    // Takes the first indent and trims that length from everywhere.
    // Markdown templates don't like the extra space at the beginning.
    const target = string[0]
    const trimSize = /^\s+/.exec(string)[0].length
    return target
        .split('\n')
        .map((line) => line.substr(trimSize - 1))
        .join('\n')
}

export default {
    introspection: {
        /**
         * The url type.
         */
        type: 'url',

        /**
         * Your API URL.
         */
        url: 'http://localhost:8080/query',

        /**
         * Optional headers to provide in the request.
         */
        headers: {
            /**
             * Since Magidoc uses configuration as code, you can perform
             * authentication in this file or use environment variables.
             */
            Authorization: 'Bearer xxx',
        },
    },
    website: {
        template: 'carbon-multi-page',
        staticAssets: path.join(__dirname, 'assets'),
        options: {
            appTitle: 'Harness Chaos Engineering Docs',
            appLogo: 'https://raw.githubusercontent.com/amityt/amit-chaos-hub/master/assets/icon.svg',
            appFavicon: 'https://raw.githubusercontent.com/amityt/amit-chaos-hub/master/assets/favicon.svg',
            siteMeta: {
                description: "API docs for Harness Chaos Engineering GraphQL API.",
                'og:description': "API docs for Harness Chaos Engineering GraphQL API.",
            },
            siteRoot: '/amityt/amit-chaos-hub',
            pages: [
                {
                    title: 'Welcome',
                    content: markdown`
            # 👋 Hi
            Welcome to [HCE](https://harness.io/products/chaos-engineering)'s GraphQL documentation
            generated with [Magidoc](https://github.com/magidoc-org/magidoc), a free open source software designed to build customizable static GraphQL documentation websites with little effort.
          `,
                }
            ],
        },
    },
}