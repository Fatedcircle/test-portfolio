// Data definitie
const schoolData = [
    {
        name: "School 1",
        departments: [
            {
                name: "Front-End Development",
                skills: [
                    { name: "HTML & CSS", certLink: "certificates/html-css.pdf" },
                    { name: "JavaScript Basics", certLink: "certificates/javascript-basics.pdf" }
                ]
            },
            {
                name: "UI/UX Design",
                skills: [
                    { name: "Wireframing", certLink: "certificates/wireframing.pdf" },
                    { name: "Prototyping", certLink: "certificates/prototyping.pdf" }
                ]
            }
        ]
    },
    {
        name: "School 2",
        departments: [
            {
                name: "Back-End Development",
                skills: [
                    { name: "Node.js", certLink: "certificates/nodejs.pdf" },
                    { name: "Database Management", certLink: "certificates/database-management.pdf" }
                ]
            },
            {
                name: "Cloud Computing",
                skills: [
                    { name: "AWS Basics", certLink: "certificates/aws-basics.pdf" },
                    { name: "Azure Fundamentals", certLink: "certificates/azure-fundamentals.pdf" }
                ]
            }
        ]
    },
    {
        name: "School 3",
        departments: [
            {
                name: "front end development",
                skills: [
                    { name: "test", certlink: "test.pdf"}
                ]
            }
        ]
    }
];

// Modal genereren
function createCertificateModal() {
    const modalDiv = document.createElement("div");
    modalDiv.className = "modal fade";
    modalDiv.id = "certificateModal";
    modalDiv.tabIndex = -1;
    modalDiv.setAttribute("aria-labelledby", "certificateModalLabel");
    modalDiv.setAttribute("aria-hidden", "true");

    modalDiv.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="certificateModalLabel">Certificaat</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modal-body"></div>
            </div>
        </div>
    `;

    document.body.appendChild(modalDiv);
}

// School- en afdelingstabgeneratie
function renderSchoolData(data) {
    const schoolTabs = document.getElementById("schoolTabs");
    const schoolTabContent = document.getElementById("schoolTabContent");

    data.forEach((school, schoolIndex) => {
        const isActiveSchool = schoolIndex === 0 ? "active" : "";

        // Tab voor de school
        const schoolTab = document.createElement("button");
        schoolTab.className = `nav-link ${isActiveSchool} border border-black`;
        schoolTab.id = `school-tab-${schoolIndex}`;
        schoolTab.setAttribute("data-bs-toggle", "tab");
        schoolTab.setAttribute("data-bs-target", `#school-content-${schoolIndex}`);
        schoolTab.setAttribute("type", "button");
        schoolTab.setAttribute("role", "tab");
        schoolTab.setAttribute("aria-controls", `school-content-${schoolIndex}`);
        schoolTab.setAttribute("aria-selected", isActiveSchool ? "true" : "false");
        schoolTab.innerText = school.name;
        schoolTabs.appendChild(schoolTab);

        // Tab-inhoud voor de school
        const schoolContent = document.createElement("div");
        schoolContent.className = `tab-pane fade ${isActiveSchool ? "show active" : ""}`;
        schoolContent.id = `school-content-${schoolIndex}`;

        // Tabs voor afdelingen
        const departmentTabs = document.createElement("div");
        departmentTabs.className = "nav nav-tabs mb-3";
        departmentTabs.id = `department-tabs-${schoolIndex}`;

        const departmentContent = document.createElement("div");
        departmentContent.className = "tab-content";

        school.departments.forEach((department, departmentIndex) => {
            const isActiveDepartment = departmentIndex === 0 ? "active" : "";

            // Tab voor afdeling
            const departmentTab = document.createElement("button");
            departmentTab.className = `nav-link ${isActiveDepartment} border border-black`;
            departmentTab.id = `department-tab-${schoolIndex}-${departmentIndex}`;
            departmentTab.setAttribute("data-bs-toggle", "tab");
            departmentTab.setAttribute("data-bs-target", `#department-content-${schoolIndex}-${departmentIndex}`);
            departmentTab.setAttribute("type", "button");
            departmentTab.setAttribute("role", "tab");
            departmentTab.setAttribute("aria-controls", `department-content-${schoolIndex}-${departmentIndex}`);
            departmentTab.setAttribute("aria-selected", isActiveDepartment ? "true" : "false");
            departmentTab.innerText = department.name;
            departmentTabs.appendChild(departmentTab);

            // Tab-inhoud voor afdeling
            const departmentPane = document.createElement("div");
            departmentPane.className = `tab-pane fade ${isActiveDepartment ? "show active" : ""}`;
            departmentPane.id = `department-content-${schoolIndex}-${departmentIndex}`;

            // Certificaten als kaarten
            const skillsContainer = document.createElement("div");
            skillsContainer.className = "row g-3";
            department.skills.forEach(skill => {
                const skillCard = document.createElement("div");
                skillCard.className = "col-6";
                skillCard.innerHTML = `
                    <div class="card skill-card h-100">
                        <div class="card-body text-center">
                            <h5 class="card-title">${skill.name}</h5>
                        </div>
                    </div>`;
                skillCard.addEventListener("click", () => openCertificateModal(skill.certLink));
                skillsContainer.appendChild(skillCard);
            });

            departmentPane.appendChild(skillsContainer);
            departmentContent.appendChild(departmentPane);
        });

        schoolContent.appendChild(departmentTabs);
        schoolContent.appendChild(departmentContent);
        schoolTabContent.appendChild(schoolContent);
    });
}

// Certificaat modal openen
function openCertificateModal(link) {
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `<iframe src="${link}" style="width:100%; height:400px;"></iframe>`;
    const modal = new bootstrap.Modal(document.getElementById("certificateModal"));
    modal.show();
}

// Dynamische inhoud laden
window.onload = function () {
    // Modal genereren
    createCertificateModal();

    // School- en afdelingstab genereren
    renderSchoolData(schoolData);
};
