/// <reference types="@cloudflare/workers-types" />
import { Hono } from 'hono';

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  KV: KVNamespace;
}

const app = new Hono<{ Bindings: Env }>();

// API Routes
app.get('/api/ping', (c) => c.text('pong'));

// Export the worker
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // 1. If it's an API request, let Hono handle it
    if (url.pathname.startsWith('/api/')) {
      return app.fetch(request, env, ctx);
    }
    
    // 2. Otherwise, it's a request to the React SPA (Client-side routing)
    // Cloudflare Workers [assets] binding will automatically serve files that exist in `dist/`.
    // If a file doesn't exist (e.g. /dashboard), it reaches this fetch handler.
    // So we fallback to returning index.html for React Router to handle it.
    try {
      const indexRequest = new Request(url.origin + '/index.html', request);
      return await env.ASSETS.fetch(indexRequest);
    } catch (e) {
      return new Response('Not found', { status: 404 });
    }
  }
};
