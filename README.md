# CRUD de Personas con Django + React + PostgreSQL

Este proyecto permite registrar, editar, eliminar y buscar personas usando:

- 🐍 Django + GraphQL
- ⚛️ React + Apollo Client
- 🐘 PostgreSQL 17

## Instalación

1. Clona el repositorio:
Tener instalado git y ejecutar el siguiente comando:
git clone https://github.com/PableitorxD/crudsw2.git

2. Configura PostgreSQL:
- Crea la base de datos `crudsw2`
- Ajusta `settings.py` con tus credenciales

3. Instala dependencias:
- Backend:
  ```
  cd backend-django
  python -m venv env
  env\Scripts\activate
  pip install -r requirements.txt
  python manage.py migrate
  python manage.py runserver
  ```
- Frontend:
  ```
  cd ../frontend-react
  npm install
  npm start
  ```

## Uso

- Backend: `http://127.0.0.1:8000/graphql/`
- Frontend: `http://localhost:3000`

## Autor

Pablo — Bolivia 🇧🇴
