# buffet

All you can link

## Getting Started

To run buffet locally, make sure you have the following software installed:

- [Docker](https://docker.com)
- [Node](https://nodejs.org)

After cloning the repo, run the following commands:

- `pnpm install`: to install all the dependencies
- `cp .sample.env .env`: to make a copy of the `.sample.env` file
- `pnpm dev`: to start the Nuxt and Supabase servers locally
  - When the Supabase server starts locally it will print out the URL and the Anon Key. Grab them
    and set them in the `.env` file.
- Access the frontend at [localhost:3000](http://localhost:3000), and the local Supabase at [localhost:54323](http://localhost:54323)

## Database seeding

- On a fresh install of Supabase, the database will be seeded with data from `seed.sql`.
- To wipe the database manually and start a fresh local environment, run `npx supabase db reset`. This will also run the `seed.sql` file.
- `npx supabase start` does not run the `seed.sql` file after the Docker volume has been created. (Contrary to what the docs currently say!)
- [More documentation](https://supabase.com/docs/guides/cli/seeding-your-database)

## Routine commands

- To run Supabase database migrations, run `pnpm migrate:local`.
