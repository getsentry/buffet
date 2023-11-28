create sequence "public"."test_tenant_id_seq";

create table "public"."author_profiles" (
    "id" bigint generated by default as identity not null,
    "name" text not null,
    "twitter" text,
    "youtube" text,
    "mastodon" text,
    "bsky" text,
    "instagram" text,
    "tiktok" text,
    "discord" text,
    "reddit" text,
    "linkedin" text,
    "website" text,
    "threads" text
);


create table "public"."item_types" (
    "id" bigint generated by default as identity not null,
    "name" text not null
);


alter table "public"."item_types" enable row level security;

create table "public"."items" (
    "id" bigint generated by default as identity not null,
    "date_created" timestamp with time zone not null default now(),
    "last_updated" timestamp with time zone,
    "url" text not null,
    "type" bigint not null default '1'::bigint,
    "meta_data" json,
    "description" text default ''::text,
    "plate_id" bigint
);


create table "public"."plates" (
    "id" bigint generated by default as identity not null,
    "date_created" timestamp with time zone not null default now(),
    "last_updated" timestamp with time zone,
    "fingerprint" text not null,
    "title" text default ''::text,
    "description" text,
    "author_profile" bigint
);


create table "public"."test_tenant" (
    "id" integer not null default nextval('test_tenant_id_seq'::regclass),
    "details" text
);


alter sequence "public"."test_tenant_id_seq" owned by "public"."test_tenant"."id";

CREATE UNIQUE INDEX author_profiles_pkey ON public.author_profiles USING btree (id);

CREATE UNIQUE INDEX item_types_pkey ON public.item_types USING btree (id);

CREATE UNIQUE INDEX items_pkey ON public.items USING btree (id);

CREATE UNIQUE INDEX plates_fingerprint_key ON public.plates USING btree (fingerprint);

CREATE UNIQUE INDEX plates_pkey ON public.plates USING btree (id);

CREATE UNIQUE INDEX test_tenant_pkey ON public.test_tenant USING btree (id);

alter table "public"."author_profiles" add constraint "author_profiles_pkey" PRIMARY KEY using index "author_profiles_pkey";

alter table "public"."item_types" add constraint "item_types_pkey" PRIMARY KEY using index "item_types_pkey";

alter table "public"."items" add constraint "items_pkey" PRIMARY KEY using index "items_pkey";

alter table "public"."plates" add constraint "plates_pkey" PRIMARY KEY using index "plates_pkey";

alter table "public"."test_tenant" add constraint "test_tenant_pkey" PRIMARY KEY using index "test_tenant_pkey";

alter table "public"."items" add constraint "items_plate_id_fkey" FOREIGN KEY (plate_id) REFERENCES plates(id) not valid;

alter table "public"."items" validate constraint "items_plate_id_fkey";

alter table "public"."items" add constraint "items_type_fkey" FOREIGN KEY (type) REFERENCES item_types(id) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."items" validate constraint "items_type_fkey";

alter table "public"."plates" add constraint "plates_author_profile_fkey" FOREIGN KEY (author_profile) REFERENCES author_profiles(id) ON DELETE SET NULL not valid;

alter table "public"."plates" validate constraint "plates_author_profile_fkey";

alter table "public"."plates" add constraint "plates_fingerprint_key" UNIQUE using index "plates_fingerprint_key";

