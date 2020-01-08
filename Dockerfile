# client
# base image
FROM node:10.18.0-buster-slim as client

# set working directory
WORKDIR /app/client

# install and cache app dependencies
COPY client/package.json ./
COPY client/yarn.lock ./
RUN yarn install
COPY client/ ./
RUN yarn run build

# server
# base image
FROM node:10.18.0-buster-slim

# set working directory
WORKDIR /app/
COPY --from=client /app/client/build/ ./client/build/

# working directory
COPY package*.json ./
COPY yarn*.lock ./
RUN yarn install
COPY . ./

# set up python environment
RUN curl https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh --output /tmp/miniconda \
  && chmod +x /tmp/miniconda && bash /tmp/miniconda -b -p /miniconda \
  && /miniconda/bin/conda create --name edwrd --file spec-file.txt

CMD [ "yarn", "start" ]
