/* ========================================
   WORKSPHERE - JAVASCRIPT
   ======================================== */

// ========== DONNÉES GLOBALES ==========

// Configuration des zones du bâtiment
const zones = [
  {
    id: "conference",
    name: "Salle de conférence",
    restricted: false,
    allowedRoles: [],
  },
  {
    id: "reception",
    name: "Réception",
    restricted: true,
    allowedRoles: ["Réceptionniste"],
  },
  {
    id: "servers",
    name: "Salle des serveurs",
    restricted: true,
    allowedRoles: ["Technicien IT"],
  },
  {
    id: "security",
    name: "Salle de sécurité",
    restricted: true,
    allowedRoles: ["Agent de sécurité"],
  },
  {
    id: "staff",
    name: "Salle du personnel",
    restricted: false,
    allowedRoles: [],
  },
  {
    id: "archives",
    name: "Salle d'archives",
    restricted: true,
    allowedRoles: [],
  },
];

// Liste des employés (vide au début)
let employees = [];

// Variable pour stocker la zone sélectionnée lors de l'assignation
let selectedZone = null;

// ========== INITIALISATION DE L'APPLICATION ==========

/**
 * Fonction principale qui s'exécute au chargement de la page
 */
function initApp() {
  createFloorPlan();
  displayUnassignedEmployees();
  displayZoneEmployees();
  setupEventListeners();
}

/**
 * Configure tous les écouteurs d'événements
 */
function setupEventListeners() {
  // Bouton pour ouvrir la modale d'ajout
  document
    .getElementById("addEmployeeBtn")
    .addEventListener("click", openAddModal);

  // Boutons pour fermer les modales
  document
    .getElementById("closeAddModalBtn")
    .addEventListener("click", closeAddModal);
  document
    .getElementById("closeAssignModalBtn")
    .addEventListener("click", closeAssignModal);

  // Soumettre le formulaire d'ajout
  document
    .getElementById("addEmployeeForm")
    .addEventListener("submit", addEmployee);

  // Fermer les modales en cliquant en dehors
  document.getElementById("addModal").addEventListener("click", function (e) {
    if (e.target === this) closeAddModal();
  });

  document
    .getElementById("assignModal")
    .addEventListener("click", function (e) {
      if (e.target === this) closeAssignModal();
    });
}

// ========== CRÉATION DU PLAN D'ÉTAGE ==========

/**
 * Crée toutes les cartes de zones sur le plan d'étage
 */
function createFloorPlan() {
  const floorPlan = document.getElementById("floorPlan");
  floorPlan.innerHTML = "";

  zones.forEach((zone) => {
    // Créer la carte de zone
    const zoneCard = document.createElement("div");
    zoneCard.className = "zone-card" + (zone.restricted ? " restricted" : "");

    // Contenu de la carte
    zoneCard.innerHTML = `
            <div class="zone-header">
                <h3>${zone.name}</h3>
                <button class="add-to-zone" data-zone="${zone.id}">+</button>
            </div>
            <div class="zone-employees" id="zone-${zone.id}"></div>
        `;

    floorPlan.appendChild(zoneCard);
  });

  // Ajouter les écouteurs pour les boutons "+"
  document.querySelectorAll(".add-to-zone").forEach((btn) => {
    btn.addEventListener("click", function () {
      openAssignModal(this.dataset.zone);
    });
  });
}

// ========== AFFICHAGE DES EMPLOYÉS ==========

/**
 * Affiche la liste des employés non assignés dans la sidebar
 */
function displayUnassignedEmployees() {
  const list = document.getElementById("unassignedList");
  list.innerHTML = "";

  // Filtrer les employés sans zone
  const unassigned = employees.filter((emp) => !emp.zone);

  if (unassigned.length === 0) {
    list.innerHTML =
      '<p style="color: #7f8c8d; text-align: center;">Aucun employé non assigné</p>';
    return;
  }

  unassigned.forEach((emp) => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
            <h4>${emp.name}</h4>
            <p>${emp.role}</p>
        `;
    list.appendChild(card);
  });
}

/**
 * Affiche les employés dans chaque zone du plan d'étage
 */
function displayZoneEmployees() {
  zones.forEach((zone) => {
    const zoneDiv = document.getElementById(`zone-${zone.id}`);
    zoneDiv.innerHTML = "";

    // Trouver tous les employés de cette zone
    const zoneEmployees = employees.filter((emp) => emp.zone === zone.id);

    if (zoneEmployees.length === 0) {
      zoneDiv.innerHTML =
        '<p style="color: #95a5a6; font-size: 14px;">Zone vide</p>';
      return;
    }

    zoneEmployees.forEach((emp) => {
      const empDiv = document.createElement("div");
      empDiv.className = "zone-employee";
      empDiv.innerHTML = `
                <span><strong>${emp.name}</strong> - ${emp.role}</span>
                <button class="remove-btn" data-employee-id="${emp.id}">×</button>
            `;
      zoneDiv.appendChild(empDiv);
    });

    // Ajouter les écouteurs pour les boutons de suppression
    zoneDiv.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        removeFromZone(parseInt(this.dataset.employeeId));
      });
    });
  });
}

// ========== GESTION DES MODALES ==========

/**
 * Ouvre la modale pour ajouter un nouvel employé
 */
function openAddModal() {
  document.getElementById("addModal").classList.add("active");
}

/**
 * Ferme la modale d'ajout et réinitialise le formulaire
 */
function closeAddModal() {
  document.getElementById("addModal").classList.remove("active");
  document.getElementById("addEmployeeForm").reset();
}

/**
 * Ouvre la modale pour assigner un employé à une zone
 * @param {string} zoneId - L'identifiant de la zone
 */
function openAssignModal(zoneId) {
  selectedZone = zoneId;
  const zone = zones.find((z) => z.id === zoneId);
  const assignList = document.getElementById("assignList");
  assignList.innerHTML = "";

  // Filtrer les employés éligibles pour cette zone
  const eligible = getEligibleEmployees(zone);

  if (eligible.length === 0) {
    assignList.innerHTML =
      '<p style="color: #e74c3c; text-align: center; padding: 20px;">Aucun employé éligible pour cette zone.</p>';
  } else {
    eligible.forEach((emp) => {
      const card = document.createElement("div");
      card.className = "employee-card";
      card.dataset.employeeId = emp.id;
      card.innerHTML = `
                <h4>${emp.name}</h4>
                <p>${emp.role}</p>
            `;
      assignList.appendChild(card);
    });

    // Ajouter les écouteurs de clic
    assignList.querySelectorAll(".employee-card").forEach((card) => {
      card.addEventListener("click", function () {
        assignToZone(parseInt(this.dataset.employeeId));
      });
    });
  }

  document.getElementById("assignModal").classList.add("active");
}

/**
 * Ferme la modale d'assignation
 */
function closeAssignModal() {
  document.getElementById("assignModal").classList.remove("active");
  selectedZone = null;
}

// ========== LOGIQUE MÉTIER ==========

/**
 * Retourne la liste des employés éligibles pour une zone donnée
 * @param {Object} zone - La zone à vérifier
 * @returns {Array} Liste des employés éligibles
 */
function getEligibleEmployees(zone) {
  return employees.filter((emp) => {
    // Déjà assigné à une zone
    if (emp.zone) return false;

    // Manager peut aller partout
    if (emp.role === "Manager") return true;

    // Zone restreinte avec rôles spécifiques
    if (zone.restricted && zone.allowedRoles.length > 0) {
      return zone.allowedRoles.includes(emp.role);
    }

    // Salle d'archives - Nettoyage interdit
    if (zone.id === "archives" && emp.role === "Nettoyage") {
      return false;
    }

    // Salle de conférence et personnel - tous autorisés
    if (zone.id === "conference" || zone.id === "staff") {
      return true;
    }

    // Pour les autres zones restreintes sans rôles spécifiques
    if (zone.restricted) {
      return false;
    }

    return true;
  });
}

// ========== GESTION DES EMPLOYÉS ==========

/**
 * Ajoute un nouvel employé à la liste
 * @param {Event} event - L'événement de soumission du formulaire
 */
function addEmployee(event) {
  event.preventDefault();

  // Créer l'objet employé
  const newEmployee = {
    id: Date.now(), // ID unique basé sur le timestamp
    name: document.getElementById("employeeName").value.trim(),
    role: document.getElementById("employeeRole").value,
    email: document.getElementById("employeeEmail").value.trim(),
    phone: document.getElementById("employeePhone").value.trim(),
    zone: null, // Non assigné au début
  };

  // Ajouter à la liste
  employees.push(newEmployee);

  // Mettre à jour l'affichage
  displayUnassignedEmployees();

  // Fermer la modale
  closeAddModal();

  console.log("Employé ajouté:", newEmployee);
}

/**
 * Assigne un employé à la zone sélectionnée
 * @param {number} employeeId - L'ID de l'employé
 */
function assignToZone(employeeId) {
  const employee = employees.find((emp) => emp.id === employeeId);

  if (employee && selectedZone) {
    employee.zone = selectedZone;

    // Mettre à jour l'affichage
    displayUnassignedEmployees();
    displayZoneEmployees();

    // Fermer la modale
    closeAssignModal();

    console.log(`${employee.name} assigné à ${selectedZone}`);
  }
}

/**
 * Retire un employé d'une zone et le remet dans "Non assignés"
 * @param {number} employeeId - L'ID de l'employé
 */
function removeFromZone(employeeId) {
  const employee = employees.find((emp) => emp.id === employeeId);

  if (employee) {
    const oldZone = employee.zone;
    employee.zone = null;

    // Mettre à jour l'affichage
    displayUnassignedEmployees();
    displayZoneEmployees();

    console.log(`${employee.name} retiré de ${oldZone}`);
  }
}

// ========== DÉMARRAGE DE L'APPLICATION ==========

// Lancer l'application quand la page est chargée
window.addEventListener("DOMContentLoaded", initApp);
