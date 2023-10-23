run-all: activate-venv run-both

activate-venv:
	. venv/bin/activate; \

run-both:
	make run-django & make run-next

run-django:
	cd server && python manage.py runserver

run-next:
	cd client && npm run dev
