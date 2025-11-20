# 🏢 WorkSphere - Gestion Interactive du Personnel

![WorkSphere Banner](https://img.shields.io/badge/WorkSphere-v1.0-blue?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Application web innovante de gestion visuelle et interactive du personnel sur un plan d'étage en temps réel. Facilitez l'organisation et la répartition des employés avec un système intuitif de drag & drop et des règles métier automatiques.

---

## 📋 Table des Matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#️-technologies)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du Projet](#-structure-du-projet)
- [Règles Métier](#-règles-métier)
- [Responsive Design](#-responsive-design)
- [Captures d'écran](#-captures-décran)
- [Déploiement](#-déploiement)
- [Validation](#-validation)
- [Roadmap](#-roadmap)
- [Contribution](#-contribution)
- [Licence](#-licence)
- [Contact](#-contact)

---

## 🎯 Aperçu

WorkSphere est une solution web moderne qui permet de :
- Gérer visuellement le personnel sur un plan d'étage interactif
- Assigner des employés aux zones autorisées selon leur rôle
- Suivre en temps réel la répartition du personnel
- Maintenir des profils détaillés pour chaque employé
- Sauvegarder automatiquement toutes les modifications

### 🌟 Points Forts

✨ **Interface Intuitive** - Design moderne et fluide avec animations CSS  
🎨 **Visuellement Attrayant** - Gradients, formes arrondies, palette cohérente  
🚀 **Performances Optimales** - Code léger, aucune dépendance externe  
💾 **Sauvegarde Automatique** - LocalStorage pour persistance des données  
📱 **100% Responsive** - Fonctionne sur tous les appareils  

---

## ✨ Fonctionnalités

### 🔑 Fonctionnalités Principales

#### Gestion des Employés
- ➕ **Ajout d'employés** avec formulaire complet
  - Nom, rôle, photo, email, téléphone
  - Expériences professionnelles multiples
  - Prévisualisation de la photo en temps réel
  - Photo par défaut si aucune URL fournie
  
- 👤 **Profil détaillé** pour chaque employé
  - Photo grand format
  - Informations complètes
  - Historique des expériences
  - Localisation actuelle
  
- 🗑️ **Suppression d'employés** avec confirmation
- ✏️ **Modification** via le profil

#### Plan d'Étage Interactif

- 🏗️ **6 Zones distinctes** :
  - Salle de conférence (20 places)
  - Réception (2 places)
  - Salle des serveurs (5 places)
  - Salle de sécurité (4 places)
  - Salle du personnel (15 places)
  - Salle d'archives (3 places)

- 🖱️ **Drag & Drop fluide**
  - Glisser depuis la sidebar vers les zones
  - Animation de drag en cours
  - Validation visuelle (zones vertes/rouges)
  - Feedback immédiat

- ➕ **Bouton d'ajout par zone**
  - Sélection parmi les employés éligibles
  - Affichage intelligent des disponibles
  - Attribution rapide

- ❌ **Retrait facile**
  - Bouton × sur chaque employé assigné
  - Retour automatique en liste non-assignée

#### Recherche & Filtrage

- 🔍 **Recherche en temps réel**
  - Par nom d'employé
  - Par rôle
  - Résultats instantanés

- 🔘 **Filtres par rôle**
  - Tous
  - Réceptionniste
  - Technicien IT
  - Agent de sécurité
  - Manager
  - Nettoyage
  - Employé général

#### Règles Métier Automatiques

- 🔒 **Zones restreintes** avec validation automatique
- ⚠️ **Alertes visuelles** pour zones vides obligatoires (rouge pâle)
- ✅ **Validation instantanée** lors de l'assignation
- 🚫 **Blocage** des assignations non autorisées
- 📊 **Indicateurs de capacité** (ex: 2/5 employés)

#### Interface & Notifications

- 📢 **Toast notifications**
  - Succès (vert)
  - Erreur (rouge)
  - Information (bleu)
  - Animation slide-in

- 📊 **Statistiques en temps réel**
  - Nombre total d'employés
  - Nombre d'employés assignés
  - Badge de compteur sur sidebar

- 🎨 **Thème moderne**
  - Gradient violet/bleu
  - Glassmorphism
  - Ombres élégantes
  - Transitions fluides

---

## 🛠️ Technologies

### Frontend
- **HTML5** - Structure sémantique validée W3C
- **CSS3** - Design moderne et responsive
  - Flexbox & Grid Layout
  - Variables CSS
  - Animations & Transitions
  - Media Queries
- **JavaScript ES6** - Logique applicative
  - Vanilla JS (aucune librairie)
  - Drag & Drop API
  - LocalStorage API
  - DOM Manipulation

### Outils & Standards
- 📱 **Responsive Design** - Mobile-first approach
- ♿ **Accessibilité** - ARIA labels, contraste
- 🔍 **SEO** - Meta tags optimisés
- ✅ **W3C Validé** - HTML & CSS conformes

---

## 🚀 Installation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Éditeur de code (VS Code, Sublime Text, etc.)

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/worksphere.git
cd worksphere
```

2. **Structure des fichiers**
```
worksphere/
├── index.html          # Structure HTML
├── style.css           # Styles CSS
├── script.js           # Logique JavaScript
├── plan.jpeg          # Image du plan d'étage
└── README.md          # Documentation
```

3. **Ajouter l'image du plan**
- Placer `plan.jpeg` dans le dossier racine
- L'image sera affichée en arrière-plan avec opacité

4. **Ouvrir l'application**
```bash
# Option 1: Double-cliquer sur index.html

# Option 2: Serveur local (recommandé)
python -m http.server 8000
# Puis ouvrir: http://localhost:8000

# Option 3: Live Server (VS Code extension)
# Clic droit sur index.html > Open with Live Server
```

### Installation Rapide
Aucune dépendance npm ou package à installer ! L'application fonctionne directement dans le navigateur.

---

## 📖 Utilisation

### Guide de Démarrage

#### 1️⃣ Ajouter un Employé

1. Cliquer sur le bouton **"➕ Ajouter un Employé"**
2. Remplir le formulaire :
   - **Nom** (obligatoire)
   - **Rôle** (obligatoire)
   - **Photo URL** (optionnelle)
   - **Email** (optionnel)
   - **Téléphone** (optionnel)
3. Ajouter des expériences (optionnel) :
   - Cliquer sur **"+ Ajouter une expérience"**
   - Remplir : Entreprise, Poste, Durée
   - Possibilité d'en ajouter plusieurs
4. Cliquer sur **"✅ Ajouter l'Employé"**
5. L'employé apparaît dans la liste "Personnel Non Assigné"

#### 2️⃣ Assigner à une Zone

**Méthode 1 : Drag & Drop (Recommandé)**
1. Cliquer et maintenir sur une carte d'employé
2. Glisser vers une zone autorisée (devient verte)
3. Relâcher pour assigner
4. Notification de succès

**Méthode 2 : Bouton +**
1. Cliquer sur le **bouton "+"** dans une zone
2. Sélectionner un employé dans la liste
3. Cliquer pour assigner
4. L'employé est transféré automatiquement

#### 3️⃣ Voir un Profil

1. Cliquer sur n'importe quelle carte d'employé
2. Le modal de profil s'ouvre
3. Affiche :
   - Photo en grand
   - Informations complètes
   - Expériences professionnelles
   - Localisation actuelle
4. Possibilité de supprimer l'employé

#### 4️⃣ Retirer d'une Zone

1. Cliquer sur le **bouton "×"** rouge
2. L'employé retourne dans "Personnel Non Assigné"
3. Notification de confirmation

#### 5️⃣ Rechercher & Filtrer

**Recherche :**
- Taper dans la barre de recherche
- Filtrage instantané par nom ou rôle

**Filtres :**
- Cliquer sur un bouton de filtre
- Affiche uniquement ce rôle
- "Tous" pour réinitialiser

### Astuces & Raccourcis

- 🔑 **Touche ESC** : Fermer tous les modaux
- 💾 **Sauvegarde auto** : Toutes les 2 secondes
- 🔄 **Rechargement** : Les données persistent
- 📱 **Mobile** : Utilisez les boutons + (drag & drop désactivé)

---

## 📁 Structure du Projet

```
worksphere/
│
├── index.html                 # Page principale
│   ├── Header (stats)
│   ├── Sidebar (employés non assignés)
│   ├── Floor Plan (zones)
│   └── Modals (ajout, profil, sélection)
│
├── style.css                  # Styles complets
│   ├── Variables CSS
│   ├── Layout (Flexbox/Grid)
│   ├── Components (cards, modals, buttons)
│   ├── Animations
│   └── Media Queries (responsive)
│
├── script.js                  # Logique métier
│   ├── Configuration (zones, rôles)
│   ├── Initialisation
│   ├── Gestion des employés
│   ├── Drag & Drop
│   ├── Modals
│   ├── Filtres & Recherche
│   ├── LocalStorage
│   └── Notifications
│
├── plan.jpeg                  # Image du plan d'étage
│
└── README.md                  # Documentation (ce fichier)
```

### Architecture du Code

#### JavaScript (script.js)
```javascript
// 1. Configuration
const zones = [...];           // Définition des 6 zones
let employees = [];            // État de l'application

// 2. Initialisation
function init()                // Point d'entrée

// 3. Rendu
function renderZones()         // Affiche le plan
function renderUnassigned()    // Affiche la sidebar

// 4. CRUD Employés
function addEmployee()         // Créer
function openProfile()         // Lire
function deleteEmployee()      // Supprimer

// 5. Drag & Drop
function handleDragStart()
function handleDrop()

// 6. Utilitaires
function canAssignToZone()     // Validation
function saveToLocalStorage()  // Persistance
function showToast()           // Notifications
```

---

## 🔒 Règles Métier

### Matrice d'Accès aux Zones

| Rôle | Conférence | Réception | Serveurs | Sécurité | Personnel | Archives |
|------|:----------:|:---------:|:--------:|:--------:|:---------:|:--------:|
| **Réceptionniste** |
| **Technicien IT** | 
| **Agent de sécurité** | 
| **Manager** | 
| **Nettoyage** | 
| **Employé général** | 

### Règles Détaillées

#### 🔐 Zones Restreintes

1. **Réception** (Capacité: 2)
   - ✅ Réceptionnistes uniquement
   - ✅ Managers (accès universel)
   - ⚠️ Zone obligatoire - Alerte si vide

2. **Salle des Serveurs** (Capacité: 5)
   - ✅ Techniciens IT uniquement
   - ✅ Managers
   - ⚠️ Zone obligatoire - Alerte si vide

3. **Salle de Sécurité** (Capacité: 4)
   - ✅ Agents de sécurité uniquement
   - ✅ Managers
   - ⚠️ Zone obligatoire - Alerte si vide

4. **Salle d'Archives** (Capacité: 3)
   - ✅ Tous sauf Nettoyage
   - ⚠️ Zone obligatoire - Alerte si vide

#### 🌍 Zones Ouvertes

5. **Salle de Conférence** (Capacité: 20)
   - ✅ Accessible à tous
   - 💡 Pas d'alerte si vide

6. **Salle du Personnel** (Capacité: 15)
   - ✅ Accessible à tous
   - 💡 Pas d'alerte si vide

#### ⭐ Rôle Spécial : Manager

Le **Manager** a un accès universel :
- ✅ Peut être assigné à n'importe quelle zone
- ✅ Contourne toutes les restrictions
- 💼 Privilèges complets

### Validation & Feedback

- ✅ **Validation préventive** : Zones incompatibles grisées
- 🟢 **Feedback visuel** : Zone verte = autorisée pendant drag
- 🔴 **Zones rouges** : Zones obligatoires vides
- 🚫 **Notification d'erreur** : Si assignation non autorisée
- 📊 **Indicateur de capacité** : Affiche places restantes

---

## 📱 Responsive Design

### Breakpoints

```css
/* Desktop Large (>1280px) */
- Grille 3 colonnes
- Sidebar 350px
- Toutes fonctionnalités visibles

/* Desktop Small (1024px - 1279px) */
- Grille 2 colonnes
- Sidebar 300px
- Stats en colonne

/* Tablette (768px - 1023px) */
- Grille 2 colonnes
- Sidebar pleine largeur en haut
- Navigation tactile optimisée

/* Mobile (0 - 767px) */
- Grille 1 colonne
- Layout vertical
- Sidebar collapsible
- Boutons + privilégiés (drag désactivé)
- Touch-friendly (44px min)
```

### Adaptations Mobile

#### Interface
- 📱 Sidebar en haut, scroll horizontal
- 🔽 Zones empilées verticalement
- 👆 Boutons + agrandis pour tactile
- 🚫 Drag & drop désactivé (utiliser boutons)

#### Performance
- ⚡ Images optimisées
- 🎨 CSS minimal
- 💾 LocalStorage efficace
- 🚀 Temps de chargement < 1s

---

## 📸 Captures d'écran

### Vue Desktop
```
[En-tête avec logo et stats]
├── Sidebar (Personnel Non Assigné)
│   ├── Bouton "Ajouter"
│   ├── Recherche
│   ├── Filtres
│   └── Liste employés (draggable)
│
└── Plan d'Étage (3x2 grid)
    ├── Salle de conférence
    ├── Réception
    ├── Salle des serveurs
    ├── Salle de sécurité
    ├── Salle du personnel
    └── Salle d'archives
```

### Vue Mobile
```
[Header compact]
├── [Sidebar horizontal scroll]
└── [Zones empilées]
    └── Chaque zone en pleine largeur
```

---

## 🌐 Déploiement

### GitHub Pages

1. **Pousser le code**
```bash
git add .
git commit -m "Initial commit: WorkSphere v1.0"
git push origin main
```

2. **Activer GitHub Pages**
- Aller dans **Settings** > **Pages**
- Source: **Deploy from a branch**
- Branch: **main** / **root**
- Cliquer sur **Save**

3. **Accéder au site**
- URL: `https://votre-username.github.io/worksphere/`
- Délai: ~5 minutes

### Vercel (Alternatif)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Production
vercel --prod
```

### Netlify (Alternatif)

1. Drag & drop du dossier sur netlify.com
2. Ou connecter le repo GitHub
3. Site live en < 1 minute

---

## ✅ Validation

### Tests Effectués

#### Compatibilité Navigateurs
- ✅ Chrome 120+ (Desktop & Mobile)
- ✅ Firefox 121+
- ✅ Safari 17+
- ✅ Edge 120+
- ✅ Opera 105+

#### Validation Standards
- ✅ **HTML** : [W3C Validator](https://validator.w3.org/)
- ✅ **CSS** : [CSS Validator](https://jigsaw.w3.org/css-validator/)
- ✅ **Accessibilité** : ARIA labels, contraste WCAG AA

#### Tests Responsive
- ✅ iPhone SE (375px)
- ✅ iPhone 12/13 (390px)
- ✅ iPad (768px)
- ✅ iPad Pro (1024px)
- ✅ Desktop HD (1920px)
- ✅ Desktop 4K (3840px)

#### Tests Fonctionnels
- ✅ Ajout d'employé
- ✅ Drag & Drop
- ✅ Assignation via bouton +
- ✅ Retrait d'employé
- ✅ Suppression d'employé
- ✅ Recherche en temps réel
- ✅ Filtres par rôle
- ✅ Validation des règles
- ✅ LocalStorage
- ✅ Notifications
- ✅ Modals
- ✅ Responsive

---

## 🗺️ Roadmap

### Version 1.0 ✅ (Actuelle)
- [x] Gestion CRUD employés
- [x] Drag & Drop
- [x] 6 zones avec règles
- [x] Recherche & filtres
- [x] LocalStorage
- [x] Responsive design
- [x] Notifications

### Version 1.1 🔜 (Prochaine)
- [ ] Export PDF du plan
- [ ] Import/Export CSV
- [ ] Historique des modifications
- [ ] Mode sombre/clair
- [ ] Statistiques avancées
- [ ] Graphiques de répartition

### Version 2.0 🔮 (Future)
- [ ] Backend API (Node.js)
- [ ] Base de données (MongoDB)
- [ ] Multi-utilisateurs
- [ ] Authentification
- [ ] Temps réel (WebSocket)
- [ ] Application mobile native

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

### 1. Fork le projet
```bash
git clone https://github.com/votre-username/worksphere.git
```

### 2. Créer une branche
```bash
git checkout -b feature/nouvelle-fonctionnalite
```

### 3. Commiter les changements
```bash
git commit -m "✨ Ajout: Nouvelle fonctionnalité"
```

### 4. Pousser vers la branche
```bash
git push origin feature/nouvelle-fonctionnalite
```

### 5. Ouvrir une Pull Request

### Convention de Commits
```
✨ feat: Nouvelle fonctionnalité
🐛 fix: Correction de bug
📚 docs: Documentation
💄 style: Formatage, CSS
♻️ refactor: Refactoring code
⚡ perf: Amélioration performance
✅ test: Ajout de tests
```

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License

Copyright (c) 2025 WorkSphere

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Contact

### Équipe WorkSphere

- 📧 **Email** : contact@worksphere.com
- 🌐 **Site Web** : [www.worksphere.com](https://worksphere.com)
- 💼 **LinkedIn** : [WorkSphere](https://linkedin.com/company/worksphere)
- 🐦 **Twitter** : [@WorkSphere](https://twitter.com/worksphere)

### Support

- 🐛 **Bug Reports** : [Issues GitHub](https://github.com/votre-username/worksphere/issues)
- 💡 **Feature Requests** : [Discussions GitHub](https://github.com/votre-username/worksphere/discussions)
- 📖 **Documentation** : [Wiki](https://github.com/votre-username/worksphere/wiki)

---

## 🙏 Remerciements

- **Icons** : Emojis natifs Unicode
- **Avatars** : [Pravatar](https://pravatar.cc/)
- **Placeholders** : [Placeholder.com](https://placeholder.com/)
- **Inspiration** : Design moderne d'applications SaaS

---

## 📊 Statistiques du Projet

![GitHub Stars](https://img.shields.io/github/stars/votre-username/worksphere?style=social)
![GitHub Forks](https://img.shields.io/github/forks/votre-username/worksphere?style=social)
![GitHub Issues](https://img.shields.io/github/issues/votre-username/worksphere)
![GitHub License](https://img.shields.io/github/license/votre-username/worksphere)

---

<div align="center">

### ⭐ Si vous aimez ce projet, n'oubliez pas de lui donner une étoile ! ⭐

**Fait avec ❤️ par l'équipe WorkSphere**

[⬆ Retour en haut](#-worksphere---gestion-interactive-du-personnel)

</div># Brief-Croise