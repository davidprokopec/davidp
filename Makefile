.PHONY: dev up stop down clear-db

default:
	cat Makefile

dev:
	bun dev

up:
	docker compose -f docker-compose.yml up $(args)

stop:
	docker compose -f docker-compose.yml stop

down:
	docker compose -f docker-compose.yml down

clear-db:
	docker compose -f docker-compose.yml down && docker volume rm davidp_postgres-data && docker compose -f docker-compose.yml up -d

clean:
	rm -rf ./node_modules
	rm -rf ./dist
	rm -rf ./packages/*/node_modules ./packages/*/dist
