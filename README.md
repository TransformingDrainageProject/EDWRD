# EDWRD

EDWRD provides an estimate of the potential benefits that result from capturing drained agricultural water in various sizes of water storage reservoirs for reuse as irrigation, a practiced referred to as drainage water recycling. The benefits of drainage water recycling include (1) the ability to apply supplemental irrigation during the growing season, and (2) a reduction of nutrient-rich drainage water into downstream water bodies. See [Questions and Answers About Drainage Water Recycling for the Midwest](https://mdc.itap.purdue.edu/item.asp?Item_Number=ABE-156-W) for more information on this practice.


Copyright 2020, Benjamin Reinhart, Jane Frankenberger, Chris Hay, Benjamin Hancock

This file is part of Evaluating Drainage Water Recycling Decisions (EDWRD).

EDWRD is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

EDWRD is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with EDWRD.  If not, see <https://www.gnu.org/licenses/>.

## Getting started

---

### 1. Clone repo to local machine

Install [git](https://git-scm.com/) if you have not already. Use [`git clone`](https://git-scm.com/docs/git-clone) to create a local copy of the edwrd repository in a new directory.

```
git clone https://github.com/TransformingDrainageProject/edwrd.git
```

Enter the repository once it has finished downloading.

```
cd edwrd
```

### 2. Set up environment variables

Copy `.env.example` to new file named `.env`.

```
cp .env.example .env
```

Replace the example values with the appropriate values for your system. Below is a brief description of each variable:

- `EDWRD_DB_DATA` - Location where you will store persistent database data.
- `EDWRD_LOGS_DIR` - Location where you will store logs.
- `MONGO_URI` - URI for MongoDB. Leave on default value unless you have changed the name of the database container and/or its port in `docker-compose.yml`.
- `NODE_ENV` - Set to `development` or `production`.
- `PYTHON_PATH` - Path to Python 3 _inside_ the Docker container. Leave on default value unless the base Docker image has changed.
- `SESSION_SECRET` - Enter a unique, hard to guess string of your creation. This will be used to sign the session cookies. Do not share this value.

### 3. Start the application with docker-compose

Install [Docker Engine and Docker Compose](https://docs.docker.com/compose/install/) if you have not already.

Build the EDWRD Docker containers by running:

```
docker-compose build
```

If you see messages such as `WARNING: The EDWRD_DB_DATA variable is not set. Defaulting to a blank string`, then the environment variables have not been properly set. Refer back to the previous step.

Once the build process has completed, start the EDWRD containers by running:

```
docker-compose up
```

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000). The EDWRD homepage should be visible from this address. If not, check the Docker logs to see what might have gone wrong.

---

## Miscellaneous docker commands

Build and start containers in the background:

```
docker-compose up --build -d
```

Check logs for a container `docker logs container_name`:

```
docker logs edwrd-web
```
