# ---- Build Stage ----
FROM node:22.22.0-alpine3.22 AS builder

# Set the working directory in the container to /console
WORKDIR /console

# Create the pnpm directory and set the PNPM_HOME environment variable
RUN mkdir -p ~/.pnpm
ENV PNPM_HOME=/root/.pnpm
ENV PATH=/root/.pnpm/bin:$PATH

# Install system tools and trust GitHub (cached permanently across builds)
RUN apk update && apk add --no-cache git openssh-client \
    && mkdir -p -m 0600 ~/.ssh \
    && ssh-keyscan github.com >> ~/.ssh/known_hosts

# Install global dependencies (cached permanently across builds)
RUN npm install -g ember-cli pnpm

# Set environment & attribution
ARG ENVIRONMENT=production
ARG DISABLE_FLEETBASE_ATTRIBUTION=false
ENV DISABLE_FLEETBASE_ATTRIBUTION=$DISABLE_FLEETBASE_ATTRIBUTION

# Copy package metadata first for better dependency caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patche[s] ./patches/

# Copy over .npmrc if applicable
COPY .npmr[c] ./

# Install app dependencies with BuildKit cache mount for downloaded tarballs
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --no-frozen-lockfile

# Copy the console directory contents into the container at /console
COPY . .

# Build the application with 2.5GB heap to fit safely within Docker VM memory
ENV NODE_OPTIONS="--max-old-space-size=2560"
RUN pnpm build --environment $ENVIRONMENT

# ---- Serve Stage ----
FROM nginx:alpine

# Copy the built app to our served directory
COPY --from=builder /console/dist /usr/share/nginx/html

# Expose the port nginx is bound to
EXPOSE 4200

# Use custom nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
