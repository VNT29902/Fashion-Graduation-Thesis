-- V3__fix_event_publication.sql
ALTER TABLE event_publication ALTER COLUMN completion_attempts DROP NOT NULL;
