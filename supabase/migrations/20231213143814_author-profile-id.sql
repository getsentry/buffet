alter table "public"."plates" drop constraint "plates_author_profile_fkey";

alter table "public"."plates" drop column "author_profile";

alter table "public"."plates" add column "author_profile_id" bigint not null;

alter table "public"."plates" add constraint "plates_author_profile_id_fkey" FOREIGN KEY (author_profile_id) REFERENCES author_profiles(id) ON DELETE SET NULL not valid;

alter table "public"."plates" validate constraint "plates_author_profile_id_fkey";



