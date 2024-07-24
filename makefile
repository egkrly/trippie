up:
	docker-compose up --build
down-all:
	docker-compose down -v
rebuild:
	make down-all
	make up