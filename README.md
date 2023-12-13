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

## Routine commands

- In case there's a migration that needs to be applied, run `pnpm migrate:local`.
