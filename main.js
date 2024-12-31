const counts = document.querySelectorAll('.count');
const speed = 250; // Adjusted speed for smoother animation

function formatNumber(number) {
    if (typeof number === 'string') {
        // Remove the '+' for calculation but keep it for display
        return number.includes('+') ? 
            parseInt(number.replace('+', '')) + '+' : 
            number;
    }
    return number;
}

counts.forEach((counter) => {
    function upData() {
        const targetStr = counter.getAttribute('data-target');
        // Remove '+' if present for calculation
        const target = parseInt(targetStr.replace('+', ''));
        const count = parseInt(counter.innerText);
        const increment = Math.ceil(target / speed);

        if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            if (count + increment < target) {
                setTimeout(upData, 1);
            } else {
                counter.innerText = formatNumber(targetStr);
            }
        } else {
            counter.innerText = formatNumber(targetStr);
        }
    }

    // Start with 0
    counter.innerText = "0";

    // Use Intersection Observer to start animation when counter is visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            upData();
            observer.disconnect();
        }
    }, {
        threshold: 0.5
    });

    observer.observe(counter);
});