document.addEventListener("DOMContentLoaded", function () {
    // Certificaten per categorie met PDF-bestandspaden
    const certificates = {
        bit: [
            { title: "HTML/CSS Beginner", pdf: "images/certificaten/bit_academy/HTML_CSS Beginner.pdf", categorie: "frontend"},
            { title: "HTML/CSS Advanced", pdf: "images/certificaten/bit_academy/HTML_CSS Advanced.pdf", categorie: "frontend" },
            { title: "Javascript Beginner", pdf: "images/certificaten/bit_academy/JavaScript Beginner.pdf", categorie: "frontend" },
            { title: "PHP Beginner", pdf: "images/certificaten/bit_academy/PHP Beginner.pdf", categorie: "backend" },
            { title: "PHP Novice", pdf: "images/certificaten/bit_academy/PHP Novice.pdf", categorie: "backend" },
            { title: "PHP Web", pdf: "images/certificaten/bit_academy/PHP Web.pdf", categorie: "backend" },
        ],
        zenva: [
            { title: "Game Design Academy", pdf: "path/to/certificate7.pdf" },
            { title: "Intro to Web Development with HTML and CSS", pdf: "path/to/certificate8.pdf" },
            { title: "Jr Coder Mini-Degree", pdf: "path/to/certificate9.pdf" },
            { title: "C++ Programming Academy", pdf: "path/to/certificate10.pdf" },
            { title: "Bite-Sized HTML [2019]", pdf: "path/to/certificate11.pdf" },
            { title: "The Complete Excel Productivity Bundle", pdf: "path/to/certificate12.pdf" },
        ],
        mammoth: [
            { title: "Web App Design in React", pdf: "path/to/certificate13.pdf" },
            { title: "Build your first WordPress theme", pdf: "path/to/certificate14.pdf" },
            { title: "Custom Templates WordPress", pdf: "path/to/certificate15.pdf" },
        ],
    };

    // Functie om certificaten dynamisch in de juiste tab te laden
    function loadCertificates(tab) {
        const container = document.getElementById(`${tab}-certificates`);
        const certificateList = certificates[tab];
        
        // Clear de container eerst
        container.innerHTML = "";

        // Loop door de certificaten en voeg ze toe aan de DOM
        certificateList.forEach((cert, index) => {
            const certificateElement = document.createElement('div');
            certificateElement.classList.add('certificate', 'border', 'border-black');
            certificateElement.textContent = cert.title;

            // Voeg een click-eventlistener toe om de modal te openen
            certificateElement.addEventListener('click', function () {
                openCertificateModal(cert.title, cert.pdf);
            });

            container.appendChild(certificateElement);
        });
    }

    // Functie om de modal te openen met de PDF
    function openCertificateModal(title, pdfSrc) {
        // Maak de modal
        const modal = document.createElement("div");
        modal.className = "modal fade";
        modal.id = "certificateModal";
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <canvas id="pdfCanvas" style="width: 100%; height: auto;"></canvas>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sluiten</button>
                    </div>
                </div>
            </div>
        `;

        // Voeg de modal aan de body toe
        document.body.appendChild(modal);

        // Gebruik PDF.js om de PDF te laden en te renderen in de canvas
        const canvas = document.getElementById("pdfCanvas");
        const context = canvas.getContext("2d");

        // Laad de PDF
        pdfjsLib.getDocument(pdfSrc).promise.then(function (pdf) {
            // We nemen de eerste pagina van de PDF (je kunt dit aanpassen om meerdere pagina's te tonen)
            pdf.getPage(1).then(function (page) {
                const viewport = page.getViewport({ scale: 1 });
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                // Render de pagina in het canvas
                page.render({ canvasContext: context, viewport: viewport });
            });
        });

        // Bootstrap modal openen
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        // Verwijder de modal uit de DOM zodra deze is gesloten
        modal.addEventListener('hidden.bs.modal', function () {
            modal.remove();
        });
    }

    // Laad de certificaten voor de actieve tab bij het laden van de pagina
    loadCertificates('bit'); // Standaard Bit tab laden

    // Voeg event listeners toe aan de nav-pills om certificaten te filteren
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Voorkom de standaard actie van de tab

            // Verkrijg de target tab naam (bit, zenva, mammoth)
            const targetTab = e.target.getAttribute('data-bs-target').substring(1); // Verwijder de '#' van het data-target attribuut
            
            // Bootstrap Tab functie aanroepen om de tab zelf correct te switchen
            const tab = new bootstrap.Tab(link); // Maak een nieuwe tab instantie aan
            tab.show(); // Activeer de tab zelf

            // Laad de certificaten voor de geklikte tab
            loadCertificates(targetTab);
        });
    });
});
