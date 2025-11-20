// ==================== DATA & CONFIGURATION ====================

const zones = [
    { 
        id: 'conference', 
        name: 'Salle de conférence', 
        capacity: 20, 
        roles: ['all'], 
        restricted: false 
    },
    { 
        id: 'reception', 
        name: 'Réception', 
        capacity: 2, 
        roles: ['Réceptionniste'], 
        restricted: true 
    },
    { 
        id: 'serveurs', 
        name: 'Salle des serveurs', 
        capacity: 5, 
        roles: ['Technicien IT'], 
        restricted: true 
    },
    { 
        id: 'securite', 
        name: 'Salle de sécurité', 
        capacity: 4, 
        roles: ['Agent de sécurité'], 
        restricted: true 
    },
    { 
        id: 'personnel', 
        name: 'Salle du personnel', 
        capacity: 15, 
        roles: ['all'], 
        restricted: false 
    },
    { 
        id: 'archives', 
        name: 'Salle d\'archives', 
        capacity: 3, 
        roles: ['Réceptionniste', 'Technicien IT', 'Agent de sécurité', 'Manager', 'Employé général'], 
        restricted: true 
    }
];

let employees = [];
let currentFilter = '';
let currentSearchTerm = '';
let selectedZoneForAdd = null;
let draggedEmployeeId = null;
let currentProfileId = null;

// ==================== INITIALIZATION ====================

function init() {
    loadFromLocalStorage();
    renderZones();
    renderUnassigned();
    updateStats();
    addEventListeners();
}

function addEventListeners() {
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAddModal();
            closeProfileModal();
            closeSelectModal();
        }
    });
}

// ==================== RENDER FUNCTIONS ====================

function renderZones() {
    const grid = document.getElementById('zonesGrid');
    grid.innerHTML = zones.map(zone => {
        const assigned = employees.filter(e => e.zone === zone.id);
        const isEmpty = assigned.length === 0;
        const isFull = assigned.length >= zone.capacity;
        
        return `
            <div class="zone ${zone.restricted && isEmpty ? 'restricted empty' : ''} ${isFull ? 'full' : ''}" 
                 data-zone="${zone.id}"
                 ondragover="handleDragOver(event)"
                 ondrop="handleDrop(event, '${zone.id}')"
                 ondragleave="handleDragLeave(event)">
                <div class="zone-header">
                    <div class="zone-info">
                        <div class="zone-title">${zone.name}</div>
                        <div class="zone-capacity">${assigned.length}/${zone.capacity} employés</div>
                    </div>
                    ${!isFull ? `<button class="add-to-zone-btn" onclick="openSelectModal('${zone.id}')" title="Ajouter un employé">+</button>` : ''}
                </div>
                <div class="zone-employees">
                    ${assigned.map(emp => `
                        <div class="zone-employee" onclick="openProfile('${emp.id}')">
                            <div class="zone-employee-info">
                                <img src="${emp.photo}" class="zone-employee-avatar" alt="${emp.name}" onerror="this.src='https://via.placeholder.com/150/667eea/ffffff?text=${emp.name.charAt(0)}'">
                                <div class="zone-employee-details">
                                    <div class="zone-employee-name">${emp.name}</div>
                                    <div class="zone-employee-role">${emp.role}</div>
                                </div>
                            </div>
                            <button class="remove-btn" onclick="event.stopPropagation(); removeFromZone('${emp.id}')" title="Retirer de la zone">×</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function renderUnassigned() {
    const list = document.getElementById('unassignedList');
    const unassigned = employees.filter(e => !e.zone).filter(e => {
        const matchesSearch = e.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) || 
                            e.role.toLowerCase().includes(currentSearchTerm.toLowerCase());
        const matchesRole = !currentFilter || e.role === currentFilter;
        return matchesSearch && matchesRole;
    });

    document.getElementById('unassignedBadge').textContent = employees.filter(e => !e.zone).length;

    if (unassigned.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <p>${currentSearchTerm || currentFilter ? 'Aucun employé trouvé' : 'Aucun employé non assigné'}</p>
            </div>
        `;
        return;
    }

    list.innerHTML = unassigned.map(emp => `
        <div class="employee-card" 
             draggable="true"
             ondragstart="handleDragStart(event, '${emp.id}')"
             ondragend="handleDragEnd(event)"
             onclick="openProfile('${emp.id}')">
            <img src="${emp.photo}" class="employee-avatar" alt="${emp.name}" onerror="this.src='https://via.placeholder.com/150/667eea/ffffff?text=${emp.name.charAt(0)}'">
            <div class="employee-info">
                <div class="employee-name">${emp.name}</div>
                <div class="employee-role">${emp.role}</div>
            </div>
        </div>
    `).join('');
}

// ==================== EMPLOYEE MANAGEMENT ====================

function addEmployee() {
    const name = document.getElementById('employeeName').value.trim();
    const role = document.getElementById('employeeRole').value;
    const photoUrl = document.getElementById('photoUrl').value.trim();
    const email = document.getElementById('employeeEmail').value.trim();
    const phone = document.getElementById('employeePhone').value.trim();

    // Validation
    if (!name) {
        showToast('Veuillez entrer un nom', 'error');
        return;
    }

    if (!role) {
        showToast('Veuillez sélectionner un rôle', 'error');
        return;
    }

    // Get experiences
    const experiences = [];
    document.querySelectorAll('.experience-item').forEach(item => {
        const company = item.querySelector('.exp-company').value.trim();
        const position = item.querySelector('.exp-position').value.trim();
        const duration = item.querySelector('.exp-duration').value.trim();
        if (company && position && duration) {
            experiences.push({ company, position, duration });
        }
    });

    // Create employee
    const employee = {
        id: Date.now().toString(),
        name,
        role,
        photo: photoUrl || `https://via.placeholder.com/150/667eea/ffffff?text=${name.charAt(0)}`,
        email: email || 'Non renseigné',
        phone: phone || 'Non renseigné',
        experiences,
        zone: null
    };

    employees.push(employee);
    saveToLocalStorage();
    renderUnassigned();
    renderZones();
    updateStats();
    closeAddModal();
    resetForm();
    showToast(`${employee.name} a été ajouté avec succès`, 'success');
}

function removeFromZone(empId) {
    const employee = employees.find(e => e.id === empId);
    if (employee) {
        employee.zone = null;
        saveToLocalStorage();
        renderUnassigned();
        renderZones();
        updateStats();
        showToast(`${employee.name} a été retiré de la zone`, 'info');
    }
}

function deleteEmployeeFromProfile() {
    if (!currentProfileId) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
        const employee = employees.find(e => e.id === currentProfileId);
        const name = employee ? employee.name : '';
        employees = employees.filter(e => e.id !== currentProfileId);
        saveToLocalStorage();
        renderUnassigned();
        renderZones();
        updateStats();
        closeProfileModal();
        showToast(`${name} a été supprimé`, 'success');
    }
}

// ==================== DRAG & DROP ====================

function handleDragStart(event, empId) {
    draggedEmployeeId = empId;
    event.target.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.target.innerHTML);
}

function handleDragEnd(event) {
    event.target.classList.remove('dragging');
    document.querySelectorAll('.zone').forEach(zone => {
        zone.classList.remove('drag-over');
    });
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    event.currentTarget.classList.add('drag-over');
}

function handleDragLeave(event) {
    if (event.target.classList.contains('zone')) {
        event.target.classList.remove('drag-over');
    }
}

function handleDrop(event, zoneId) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    
    if (!draggedEmployeeId) return;

    const employee = employees.find(e => e.id === draggedEmployeeId);
    if (!employee) return;

    // Check if can assign
    if (!canAssignToZone(employee, zoneId)) {
        showToast(`${employee.role} ne peut pas être assigné à cette zone`, 'error');
        draggedEmployeeId = null;
        return;
    }

    // Check capacity
    const zone = zones.find(z => z.id === zoneId);
    const assigned = employees.filter(e => e.zone === zoneId);
    if (assigned.length >= zone.capacity) {
        showToast('Cette zone a atteint sa capacité maximale', 'error');
        draggedEmployeeId = null;
        return;
    }

    // Assign employee
    employee.zone = zoneId;
    saveToLocalStorage();
    renderUnassigned();
    renderZones();
    updateStats();
    showToast(`${employee.name} a été assigné à ${zone.name}`, 'success');
    draggedEmployeeId = null;
}

// ==================== ZONE ASSIGNMENT ====================

function canAssignToZone(employee, zoneId) {
    const zone = zones.find(z => z.id === zoneId);
    
    // Manager can go anywhere
    if (employee.role === 'Manager') return true;
    
    // Check if zone accepts all roles
    if (zone.roles.includes('all')) {
        // Nettoyage cannot go to archives
        if (zoneId === 'archives' && employee.role === 'Nettoyage') {
            return false;
        }
        return true;
    }
    
    // Check specific roles
    return zone.roles.includes(employee.role);
}

function assignToZoneFromModal(empId) {
    const employee = employees.find(e => e.id === empId);
    if (!employee || !selectedZoneForAdd) return;

    const zone = zones.find(z => z.id === selectedZoneForAdd);
    const assigned = employees.filter(e => e.zone === selectedZoneForAdd);
    
    if (assigned.length >= zone.capacity) {
        showToast('Cette zone a atteint sa capacité maximale', 'error');
        return;
    }
    
    employee.zone = selectedZoneForAdd;
    saveToLocalStorage();
    renderUnassigned();
    renderZones();
    updateStats();
    closeSelectModal();
    showToast(`${employee.name} a été assigné à ${zone.name}`, 'success');
}

// ==================== MODAL MANAGEMENT ====================

function openAddModal() {
    document.getElementById('addModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAddModal() {
    document.getElementById('addModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
}

function openProfile(empId) {
    const employee = employees.find(e => e.id === empId);
    if (!employee) return;

    currentProfileId = empId;
    
    document.getElementById('profileAvatar').src = employee.photo;
    document.getElementById('profileAvatar').onerror = function() {
        this.src = `https://via.placeholder.com/150/667eea/ffffff?text=${employee.name.charAt(0)}`;
    };
    document.getElementById('profileName').textContent = employee.name;
    document.getElementById('profileRole').textContent = employee.role;

    const zone = employee.zone ? zones.find(z => z.id === employee.zone) : null;

    let experiencesHTML = '';
    if (employee.experiences && employee.experiences.length > 0) {
        experiencesHTML = `
            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e9ecef;">
                <strong style="font-size: 16px; color: #333;">💼 Expériences professionnelles</strong>
                ${employee.experiences.map(exp => `
                    <div style="background: white; padding: 15px; border-radius: 10px; margin-top: 12px; border-left: 4px solid #667eea;">
                        <div style="font-weight: 600; color: #667eea; font-size: 15px;">${exp.position}</div>
                        <div style="color: #666; font-size: 14px; margin-top: 4px;">${exp.company}</div>
                        <div style="color: #999; font-size: 13px; margin-top: 4px;">📅 ${exp.duration}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    document.getElementById('profileDetails').innerHTML = `
        <div class="profile-row">
            <span class="profile-label">📧 Email:</span>
            <span class="profile-value">${employee.email}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">📞 Téléphone:</span>
            <span class="profile-value">${employee.phone}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">💼 Rôle:</span>
            <span class="profile-value">${employee.role}</span>
        </div>
        <div class="profile-row">
            <span class="profile-label">📍 Localisation:</span>
            <span class="profile-value">${zone ? zone.name : 'Non assigné'}</span>
        </div>
        ${experiencesHTML}
    `;

    document.getElementById('profileModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProfileId = null;
}

function openSelectModal(zoneId) {
    selectedZoneForAdd = zoneId;
    const modal = document.getElementById('selectModal');
    const list = document.getElementById('selectList');
    
    const eligible = employees.filter(e => !e.zone && canAssignToZone(e, zoneId));
    
    if (eligible.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🚫</div>
                <p>Aucun employé éligible pour cette zone</p>
            </div>
        `;
    } else {
        list.innerHTML = eligible.map(emp => `
            <div class="select-employee-item" onclick="assignToZoneFromModal('${emp.id}')">
                <img src="${emp.photo}" class="employee-avatar" alt="${emp.name}" onerror="this.src='https://via.placeholder.com/150/667eea/ffffff?text=${emp.name.charAt(0)}'">
                <div class="employee-info">
                    <div class="employee-name">${emp.name}</div>
                    <div class="employee-role">${emp.role}</div>
                </div>
            </div>
        `).join('');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSelectModal() {
    document.getElementById('selectModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    selectedZoneForAdd = null;
}

// ==================== FORM MANAGEMENT ====================

function resetForm() {
    document.getElementById('employeeName').value = '';
    document.getElementById('employeeRole').value = '';
    document.getElementById('photoUrl').value = '';
    document.getElementById('employeeEmail').value = '';
    document.getElementById('employeePhone').value = '';
    document.getElementById('experiencesList').innerHTML = '';
    document.getElementById('photoPreview').src = 'https://via.placeholder.com/150/667eea/ffffff?text=Photo';
}

let expCounter = 0;
function addExperienceField() {
    expCounter++;
    const container = document.getElementById('experiencesList');
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.id = `exp-${expCounter}`;
    div.innerHTML = `
        <button type="button" class="remove-exp-btn" onclick="removeExperience('exp-${expCounter}')">×</button>
        <div style="margin-bottom: 10px;">
            <input type="text" class="exp-company" placeholder="Entreprise" style="width: 100%; padding: 10px; border: 2px solid #dee2e6; border-radius: 8px; font-size: 14px;">
        </div>
        <div style="margin-bottom: 10px;">
            <input type="text" class="exp-position" placeholder="Poste occupé" style="width: 100%; padding: 10px; border: 2px solid #dee2e6; border-radius: 8px; font-size: 14px;">
        </div>
        <div>
            <input type="text" class="exp-duration" placeholder="Durée (ex: 2020-2023)" style="width: 100%; padding: 10px; border: 2px solid #dee2e6; border-radius: 8px; font-size: 14px;">
        </div>
    `;
    container.appendChild(div);
}

function removeExperience(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

function previewPhoto() {
    const url = document.getElementById('photoUrl').value.trim();
    const preview = document.getElementById('photoPreview');
    if (url) {
        preview.src = url;
        preview.onerror = function() {
            this.src = 'https://via.placeholder.com/150/667eea/ffffff?text=Error';
        };
    } else {
        preview.src = 'https://via.placeholder.com/150/667eea/ffffff?text=Photo';
    }
}

// ==================== FILTER & SEARCH ====================

function filterByRole(role, buttonElement) {
    currentFilter = role;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
    renderUnassigned();
}

function filterEmployees() {
    currentSearchTerm = document.getElementById('searchBox').value.trim();
    renderUnassigned();
}

// ==================== STATS ====================

function updateStats() {
    const total = employees.length;
    const assigned = employees.filter(e => e.zone).length;
    
    document.getElementById('totalEmployees').textContent = total;
    document.getElementById('assignedCount').textContent = assigned;
}

// ==================== TOAST NOTIFICATIONS ====================

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = document.getElementById('toastIcon');
    const messageEl = document.getElementById('toastMessage');
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    
    icon.textContent = icons[type] || icons.info;
    messageEl.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== LOCAL STORAGE ====================

function saveToLocalStorage() {
    try {
        localStorage.setItem('worksphere_employees', JSON.stringify(employees));
    } catch (e) {
        console.error('Erreur de sauvegarde:', e);
        showToast('Erreur lors de la sauvegarde des données', 'error');
    }
}

function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('worksphere_employees');
        if (saved) {
            employees = JSON.parse(saved);
        } else {
            // Données de démonstration
            employees = [
                {
                    id: '1',
                    name: 'Sophie Martin',
                    role: 'Réceptionniste',
                    photo: 'https://i.pravatar.cc/150?img=1',
                    email: 'sophie.martin@worksphere.com',
                    phone: '+212 661 234 567',
                    experiences: [
                        { company: 'Hotel Plaza', position: 'Réceptionniste Senior', duration: '2020-2023' }
                    ],
                    zone: null
                },
                {
                    id: '2',
                    name: 'Ahmed Benjelloun',
                    role: 'Technicien IT',
                    photo: 'https://i.pravatar.cc/150?img=12',
                    email: 'ahmed.b@worksphere.com',
                    phone: '+212 662 345 678',
                    experiences: [
                        { company: 'Tech Solutions', position: 'Administrateur Système', duration: '2019-2023' },
                        { company: 'DataCorp', position: 'Technicien Support', duration: '2017-2019' }
                    ],
                    zone: null
                },
                {
                    id: '3',
                    name: 'Fatima Zahra Alami',
                    role: 'Manager',
                    photo: 'https://i.pravatar.cc/150?img=5',
                    email: 'fatima.z@worksphere.com',
                    phone: '+212 663 456 789',
                    experiences: [
                        { company: 'Global Corp', position: 'Chef de Projet', duration: '2018-2023' },
                        { company: 'Innovation Hub', position: 'Team Leader', duration: '2015-2018' }
                    ],
                    zone: null
                },
                {
                    id: '4',
                    name: 'Karim El Amrani',
                    role: 'Agent de sécurité',
                    photo: 'https://i.pravatar.cc/150?img=13',
                    email: 'karim.e@worksphere.com',
                    phone: '+212 664 567 890',
                    experiences: [
                        { company: 'SecureGuard', position: 'Agent de sécurité', duration: '2021-2023' }
                    ],
                    zone: null
                },
                {
                    id: '5',
                    name: 'Nadia Bennani',
                    role: 'Nettoyage',
                    photo: 'https://i.pravatar.cc/150?img=9',
                    email: 'nadia.b@worksphere.com',
                    phone: '+212 665 678 901',
                    experiences: [],
                    zone: null
                },
                {
                    id: '6',
                    name: 'Youssef Alami',
                    role: 'Employé général',
                    photo: 'https://i.pravatar.cc/150?img=14',
                    email: 'youssef.a@worksphere.com',
                    phone: '+212 666 789 012',
                    experiences: [
                        { company: 'Multi Services', position: 'Assistant', duration: '2022-2023' }
                    ],
                    zone: null
                }
            ];
            saveToLocalStorage();
        }
    } catch (e) {
        console.error('Erreur de chargement:', e);
        employees = [];
    }
}

// ==================== WINDOW LOAD ====================

window.onload = init;

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        closeAddModal();
        closeProfileModal();
        closeSelectModal();
    }
}