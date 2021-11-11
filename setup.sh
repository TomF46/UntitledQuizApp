#!/bin/bash  
# Runs fresh migrations (removes any existing and then runs the migrations so it works either to reset the database or start from a clean database) then run seeder to add admin with details from .env file
./vendor/bin/sail artisan migrate:fresh --seed
# Run passport install as required after migrations
./vendor/bin/sail artisan passport:install