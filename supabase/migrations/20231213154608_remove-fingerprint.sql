alter table "public"."plates" drop constraint "plates_fingerprint_key";

drop index if exists "public"."plates_fingerprint_key";

alter table "public"."plates" drop column "fingerprint";



