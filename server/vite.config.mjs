import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        dir: 'src',
        workspace: {
            prisma: {
                test: {
                    include: ['src/http/controllers/**'],
                    environment: 'prisma',
                },
            },
        }
    },
})