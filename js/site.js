(() => {
    const observed = new WeakSet();
    let observer;

    const observeTargets = () => {
        if (!observer) return;
        document.querySelectorAll('.reveal').forEach((el) => {
            if (!observed.has(el)) {
                observed.add(el);
                observer.observe(el);
            }
        });
    };

    const boot = () => {
        document.documentElement.classList.add('js');

        observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            }
        }, { threshold: 0.18 });

        observeTargets();

        const mutationObserver = new MutationObserver(() => observeTargets());
        mutationObserver.observe(document.body, { childList: true, subtree: true });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }
})();
