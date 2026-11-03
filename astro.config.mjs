import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

const contentDirectory = fileURLToPath(new URL('./content/', import.meta.url));

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: {
    plugins: [{
      name: 'reload-imported-content',
      configureServer(server) {
        let reload;
        server.watcher.add(contentDirectory);
        server.watcher.on('change', file => {
          if (!file.startsWith(contentDirectory)) return;
          clearTimeout(reload);
          reload = setTimeout(() => {
            server.moduleGraph.invalidateAll();
            server.ws.send({ type: 'full-reload' });
          }, 200);
        });
      },
    }],
  },
});
