// Data definitie
const schoolData = [
    {
      name: "School 1",
      departments: [
        {
          name: "Front-End Development",
          skills: [
            {
              name: "HTML & CSS",
              certLink: "certificates/html-css.pdf"
            },
            {
              name: "JavaScript Basics",
              certLink: "certificates/javascript-basics.pdf"
            }
          ]
        },
        {
          name: "UI/UX Design",
          skills: [
            {
              name: "Wireframing",
              certLink: "certificates/wireframing.pdf"
            },
            {
              name: "Prototyping",
              certLink: "certificates/prototyping.pdf"
            }
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
            {
              name: "Node.js",
              certLink: "certificates/nodejs.pdf"
            },
            {
              name: "Database Management",
              certLink: "certificates/database-management.pdf"
            }
          ]
        },
        {
          name: "Cloud Computing",
          skills: [
            {
              name: "AWS Basics",
              certLink: "certificates/aws-basics.pdf"
            },
            {
              name: "Azure Fundamentals",
              certLink: "certificates/azure-fundamentals.pdf"
            }
          ]
        }
      ]
    }
  ];
  
  // Dynamische rendering functie
  function renderSchoolData(data) {
    const navTabs = document.getElementById("nav-tabs");
    const tabContent = document.getElementById("tab-content");
  
    data.forEach((school, schoolIndex) => {
      // School Tabs genereren
      const isActiveSchool = schoolIndex === 0 ? "active" : "";
      const schoolTab = document.createElement("button");
      schoolTab.className = `nav-link ${isActiveSchool}`;
      schoolTab.id = `tab-${schoolIndex}`;
      schoolTab.setAttribute("data-bs-toggle", "tab");
      schoolTab.setAttribute("data-bs-target", `#school-content-${schoolIndex}`);
      schoolTab.textContent = school.name;
      navTabs.appendChild(schoolTab);
  
      // School content container
      const schoolContent = document.createElement("div");
      schoolContent.className = `tab-pane fade ${isActiveSchool ? "show active" : ""}`;
      schoolContent.id = `school-content-${schoolIndex}`;
  
      // Afdelingen Tabs voor elke school
      const departmentNav = document.createElement("ul");
      departmentNav.className = "nav nav-tabs mb-3";
      departmentNav.id = `department-tabs-${schoolIndex}`;
  
      const departmentContent = document.createElement("div");
      departmentContent.className = "tab-content";
  
      school.departments.forEach((department, departmentIndex) => {
        const isActiveDepartment = departmentIndex === 0 ? "active" : "";
  
        // Department Tabs genereren
        const departmentTab = document.createElement("button");
        departmentTab.className = `nav-link ${isActiveDepartment}`;
        departmentTab.id = `department-tab-${schoolIndex}-${departmentIndex}`;
        departmentTab.setAttribute("data-bs-toggle", "tab");
        departmentTab.setAttribute("data-bs-target", `#department-content-${schoolIndex}-${departmentIndex}`);
        departmentTab.textContent = department.name;
        departmentNav.appendChild(departmentTab);
  
        // Department content genereren
        const departmentPane = document.createElement("div");
        departmentPane.className = `tab-pane fade ${isActiveDepartment ? "show active" : ""}`;
        departmentPane.id = `department-content-${schoolIndex}-${departmentIndex}`;
        departmentPane.innerHTML = department.skills.map(skill => `
          <div class="card-body">
            <h5>${skill.name}</h5>
            <button class="btn btn-primary" onclick="openCertificateModal('${skill.certLink}')">Bekijk Certificaat</button>
          </div>
        `).join("");
        departmentContent.appendChild(departmentPane);
      });
  
      // Voeg afdelingen nav-tabs en content toe aan school content
      schoolContent.appendChild(departmentNav);
      schoolContent.appendChild(departmentContent);
  
      tabContent.appendChild(schoolContent);
    });
  }
  
  // Certificaat modal openen
  function openCertificateModal(link) {
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `<iframe src="${link}" style="width:100%; height:400px;"></iframe>`;
    const modal = new bootstrap.Modal(document.getElementById("certificateModal"));
    modal.show();
  }
  
  // HTML structuur dynamisch genereren op paginalaad
  window.onload = function () {
    renderSchoolData(schoolData);
  };
  