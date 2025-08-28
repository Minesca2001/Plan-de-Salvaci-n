document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const container = document.querySelector('.container');

    let currentStepIndex = 0;

    function showStep(index) {
        if (index < 0 || index >= steps.length) {
            console.error("Attempted to show invalid step index:", index);
            return;
        }

        steps.forEach((step, i) => {
            if (i === index) {
                step.classList.remove('hidden');
            } else {
                step.classList.add('hidden');
            }
        });
        currentStepIndex = index;
    }

    container.addEventListener('click', (event) => {
        const target = event.target;

        if (target.tagName === 'BUTTON') {
            const parentSection = target.closest('.step');
            if (!parentSection) return;

            const buttonStepIndex = Array.from(steps).indexOf(parentSection);

            if (target.classList.contains('next-button')) {
                 // Handle next button clicks
                 if (buttonStepIndex < steps.length - 1) {
                    showStep(buttonStepIndex + 1);
                 }
            } else if (target.classList.contains('prev-button')) {
                // Handle previous button clicks
                if (buttonStepIndex === 6) {
                    // If it's the "Cerrar" button in the last step
                    window.close(); // Attempt to close the window/tab
                } else if (buttonStepIndex > 0) {
                    // For other steps, go back
                    showStep(buttonStepIndex - 1);
                }
            } else if (target.classList.contains('restart-button')) {
                // Handle restart button click
                showStep(0);
            }
        }
    });

    // Show the initial step when the page loads
    showStep(currentStepIndex);
});
