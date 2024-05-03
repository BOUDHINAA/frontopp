FROM node:16-alpine

WORKDIR /app

# Copie des fichiers du projet dans l'image Docker
COPY . /app

# Nettoyez le cache npm avant d'installer les dépendances
RUN npm cache clean --force

# Installez les dépendances avec `--legacy-peer-deps` pour ignorer les conflits
RUN npm install --legacy-peer-deps

# Ajoutez des diagnostics pour vérifier les versions
RUN node -v
RUN npm -v

# Exécutez la commande appropriée pour votre application
CMD ["npm", "start"]
