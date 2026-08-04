# Next.js 16.3 ImageResponse reproduction

Minimal reproduction of an order-dependent interaction between `next/image` and Node.js `ImageResponse` in Next.js 16.3.0.

## Reproduce

Install, build, and start the app:

```sh
pnpm install
pnpm build
pnpm start
```

In another terminal, render an Open Graph image, run one uncached image optimization, and render the same Open Graph image again:

```sh
image_id="$(node -p 'crypto.randomUUID()')"

curl -o /dev/null -w 'OG before: %{http_code}\n' http://localhost:3000/og
curl -D - -o /dev/null "http://localhost:3000/_next/image?url=%2Fpixel%2F${image_id}&w=640&q=75"
curl -v -o /dev/null http://localhost:3000/og
```

The first request returns `200`. The optimizer request returns `200` with `X-Nextjs-Cache: MISS`. The final request closes without a response, while the server logs:

```text
Error: failed to pipe response
[cause]: Error: Input buffer contains unsupported image format
```
