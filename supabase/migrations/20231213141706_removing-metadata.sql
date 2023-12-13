alter table "public"."items" drop column "meta_data";

alter table "public"."plates" alter column "author_profile" set not null;

alter table "public"."plates" alter column "title" set not null;



