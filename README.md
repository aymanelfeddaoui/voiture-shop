# Voiture Shop — Full Stack Application

Application Full Stack complète : React + Spring Boot + PostgreSQL + JWT + Spring AI

## Démarrage rapide

### Prérequis
- Docker Desktop installé et démarré
- Git

### Lancement

```bash
git clone https://github.com/VOTRE-USER/voiture-shop.git
cd voiture-shop

# Copiez le fichier .env et ajoutez votre clé API
cp .env.example .env
# Éditez .env et renseignez ANTHROPIC_API_KEY

docker compose up --build
```

### Accès
| Service | URL |
|---|---|
| Frontend React | http://localhost:3000 |
| Backend API | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui.html |
| API Docs | http://localhost:8080/v3/api-docs |

### Comptes de test
| Utilisateur | Mot de passe | Rôle |
|---|---|---|
| admin | admin | ADMIN |
| user | user | USER |

## Stack technique
- **Frontend** : React 18, React-Bootstrap, React-Router, Axios, Font Awesome
- **Backend** : Spring Boot 3.2, Spring Security, JWT, Spring Data JPA, Spring AI
- **Base de données** : PostgreSQL 15
- **Documentation** : Springdoc OpenAPI / Swagger UI
- **Containerisation** : Docker, Docker Compose