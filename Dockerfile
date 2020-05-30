# Base docker image
FROM node:10-alpine

# Setup Timezone
RUN apk add --update tzdata
ENV TZ=Asia/Jakarta

# Install python and extra
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python build-base cairo-dev jpeg-dev pango-dev giflib-dev

# Create app directory
WORKDIR /app

# Copy all files
COPY . /app/

# Install dependency
RUN npm install --silent

# Build the app
RUN npm run build

CMD ["npm", "run", "start:prod"]