// Array met projectgegevens
const projects = [
    {
        title: "Project 1",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, in?",
        images: [
            {
                src: "images/avatar.jpg",  // Pad naar afbeelding in de 'images' map
                caption: "Dit is een afbeelding van Project 1"
            },
            {
                src: "images/domenico-loia-hGV2TfOh0ns-unsplash.jpg",
                caption: "Een andere afbeelding die Project 1 toont"
            }
        ],
        details: "Dit is een uitgebreide beschrijving van Project 1.",
        github: "https://github.com/jouwgebruikersnaam/project1",  // GitHub link van het project
        video: "https://www.youtube.com/embed/VIDEO_ID"  // Optionele video van YouTube (embed link)
    },
    {
        title: "Project 2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, quam!",
        images: [
            {
                src: "images/project2_img1.jpg",
                caption: "Afbeelding van Project 2"
            }
        ],
        details: "Dit is een uitgebreide beschrijving van Project 2.",
        github: "https://github.com/jouwgebruikersnaam/project2",  // GitHub link van het project
        video: "https://www.youtube.com/embed/ANOTHER_VIDEO_ID"  // Optionele video van YouTube (embed link)
    }
];

// Dynamisch kaarten en modals genereren
document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.querySelector(".projects .row");
    projectsContainer.classList.add("justify-content-center");

    projects.forEach((project, index) => {
        // Maak een kaart
        const card = document.createElement("div");
        card.className = "col-12 col-sm-6 col-lg-3 my-3"; 
        card.innerHTML = `
            <div class="card h-100">
                <img src="${project.images[0].src}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectModal${index}">
                        Bekijk project
                    </button>
                </div>
            </div>
        `;
        projectsContainer.appendChild(card);

        // Maak een modal
        const modal = document.createElement("div");
        modal.className = "modal fade projectsModal";
        modal.id = `projectModal${index}`;
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${project.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>${project.details}</p>
                        <div id="carouselExample${index}" class="carousel slide" data-bs-ride="false">
                            <div class="carousel-inner">
                                ${project.images.map((image, imageIndex) => {
                                    return `
                                        <div class="carousel-item ${imageIndex === 0 ? 'active' : ''}">
                                            <img src="${image.src}" class="d-block w-100" alt="${project.title}">
                                            <div class="carousel-caption d-none d-md-block">
                                                <p>${image.caption}</p>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample${index}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample${index}" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <!-- Thumbnails for carousel -->
                        <div class="carousel-thumbnails d-flex justify-content-center mt-3">
                            ${project.images.map((image, imageIndex) => {
                                return `
                                    <img src="${image.src}" class="carousel-thumbnail me-2" data-bs-target="#carouselExample${index}" data-bs-slide-to="${imageIndex}" alt="Thumbnail ${imageIndex + 1}">
                                `;
                            }).join('')}
                        </div>
                        <!-- Video Embed Section (optional) -->
                        ${project.video ? `
                            <div class="mt-4">
                                <h5>Bekijk de video:</h5>
                                <iframe width="100%" height="400" src="${project.video}" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        ` : ''}
                        <!-- GitHub Repository Link -->
                        <div class="mt-4">
                            <a href="${project.github}" target="_blank" class="btn btn-outline-primary">Bekijk GitHub Repository</a>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sluiten</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal); // Voeg modals toe aan de body
    });
});