FROM oven/bun:1.1.8-alpine as base
WORKDIR /usr/src/app



FROM base AS install
RUN mkdir -p /temp/dev /temp/prod

# Install all dependencies, cannot build frontend without them
COPY frontend/package.json frontend/bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install only production dependencies
COPY frontend/package.json frontend/bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --forzen-lockfile --production



# Create a prerelease image to build the frontend
FROM base AS prerelease
COPY frontend/ ./frontend/
COPY api.ts ./
COPY --from=install /temp/dev/node_modules ./frontend/node_modules

WORKDIR /usr/src/app/frontend
RUN bunx vite build



# The release image only contains the frontend build and production dependencies
FROM base AS release
COPY --from=install /temp/prod/node_modules ./frontend/node_modules
COPY --from=prerelease /usr/src/app/frontend/build ./frontend/build

ENV PUBLIC_BACKEND_URL=localhost:8080
ENV PUBLIC_AWS_REGION=us-east-1
ENV PUBLIC_AWS_USER_POOL_ID=us-east-1_e1UsqQQol
ENV PUBLIC_AWS_APP_CLIENT_ID=4nfv4sob48qh61hvoiulvolb1k

WORKDIR /usr/src/app/frontend/build
USER bun
ENTRYPOINT ["bun", "run", "index.js"]
