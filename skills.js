document.addEventListener("DOMContentLoaded", () => {
    // Gegevens voor de verschillende radar charts
    const frontendSkills = {
        labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue'],
        datasets: [{
            label: 'Frontend Skills',
            data: [100, 90, 80, 75, 70], // Frontend vaardigheidsscores
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(0, 123, 255, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
        }]
    };

    const backendSkills = {
        labels: ['PHP', 'Node.js', 'Python', 'C#', 'Java'],
        datasets: [{
            label: 'Backend Skills',
            data: [85, 80, 70, 60, 75], // Backend vaardigheidsscores
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
        }]
    };

    const databaseSkills = {
        labels: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'SQL Server'],
        datasets: [{
            label: 'Database Skills',
            data: [90, 85, 70, 60, 80], // Database vaardigheidsscores
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
        }]
    };

    const otherSkills = {
        labels: ['Git', 'Docker', 'Agile', 'Scrum', 'CI/CD'],
        datasets: [{
            label: 'Other Skills',
            data: [85, 80, 90, 75, 80], // Andere vaardigheidsscores
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(153, 102, 255, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
        }]
    };

    // Configuraties voor de radar charts
    const radarChartConfig = {
        type: 'radar',
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: { display: true },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    grid: { color: '#ddd' },
                    ticks: {
                        display: true,
                        stepSize: 20,
                        font: { size: 12, weight: 'bold' },
                        color: '#333'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { font: { size: 14, weight: 'bold' } }
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                        }
                    }
                }
            }
        }
    };

    // Maak de radar charts
    new Chart(document.getElementById('frontendRadarChart').getContext('2d'), { ...radarChartConfig, data: frontendSkills });
    new Chart(document.getElementById('backendRadarChart').getContext('2d'), { ...radarChartConfig, data: backendSkills });
    new Chart(document.getElementById('databaseRadarChart').getContext('2d'), { ...radarChartConfig, data: databaseSkills });
    new Chart(document.getElementById('otherRadarChart').getContext('2d'), { ...radarChartConfig, data: otherSkills });
});
