// ===== Y15x Top Up - Main JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('Y15x Top Up - Modern Dongker Panel Loaded');
    
    // ===== HIGHLIGHT ACTIVE MENU =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ===== SEARCH FUNCTIONALITY (games.html) =====
    const searchInput = document.getElementById('searchGame');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const gameCards = document.querySelectorAll('.game-card');
            
            gameCards.forEach(card => {
                const gameTitle = card.querySelector('h3')?.textContent.toLowerCase() || '';
                if (gameTitle.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // ===== DENOM SELECTION (topup.html) =====
    const denomItems = document.querySelectorAll('.denom-item');
    denomItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove selected class from all denom items
            denomItems.forEach(d => d.classList.remove('selected'));
            // Add selected class to clicked item
            this.classList.add('selected');
        });
    });
    
    // ===== PAYMENT METHOD SELECTION (topup.html) =====
    const paymentItems = document.querySelectorAll('.payment-item');
    paymentItems.forEach(item => {
        item.addEventListener('click', function() {
            paymentItems.forEach(p => p.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // ===== TOP UP SUBMIT (topup.html) =====
    const topupSubmit = document.getElementById('topupSubmit');
    if (topupSubmit) {
        topupSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const game = document.getElementById('gameSelect')?.value || 'Not selected';
            const userId = document.getElementById('userId')?.value || 'Not entered';
            const serverId = document.getElementById('serverId')?.value || 'Not entered';
            
            // Check if user ID is entered
            if (!userId || userId === 'Not entered' || userId.trim() === '') {
                alert('Mohon masukkan User ID / Player ID terlebih dahulu!');
                return;
            }
            
            // Check if denom selected
            const selectedDenom = document.querySelector('.denom-item.selected');
            if (!selectedDenom) {
                alert('Mohon pilih nominal top up terlebih dahulu!');
                return;
            }
            
            // Check if payment method selected
            const selectedPayment = document.querySelector('.payment-item.selected');
            if (!selectedPayment) {
                alert('Mohon pilih metode pembayaran terlebih dahulu!');
                return;
            }
            
            // Get nominal details
            const nominalValue = selectedDenom.querySelector('.denom-value')?.textContent || 'Unknown';
            const nominalPrice = selectedDenom.querySelector('.denom-price')?.textContent || 'Unknown';
            
            // Get payment method
            const paymentMethod = selectedPayment.querySelector('span')?.textContent || 'Unknown';
            
            // Show success message (in real app, redirect to invoice)
            alert(`Top Up diproses!\n\nGame: ${game}\nID: ${userId}\nNominal: ${nominalValue} (${nominalPrice})\nPembayaran: ${paymentMethod}\n\nAnda akan diarahkan ke halaman invoice.`);
            
            // Redirect to invoice page (simulation)
            // window.location.href = 'invoice.html';
        });
    }
    
    // ===== CONTACT FORM SUBMIT (contact.html) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Pesan Anda telah terkirim! Tim kami akan segera merespon.');
            this.reset();
        });
    }
    
    // ===== DOWNLOAD INVOICE (invoice.html) =====
    const downloadBtn = document.getElementById('downloadInvoice');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('Invoice akan diunduh dalam format PDF (simulasi).');
            // In real implementation, this would trigger PDF download
        });
    }
    
    // ===== ANIMATION ON SCROLL (simple) =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.game-card, .feature-item, .value-item, .stat-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.game-card, .feature-item, .value-item, .stat-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // ===== TOOLTIP INIT (if any) =====
    // No tooltips needed for now
    
    // ===== DROPDOWN MENU (if needed for mobile) =====
    // Not implemented for simplicity
    
    // ===== LAZY LOAD IMAGES =====
    const images = document.querySelectorAll('img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load if data-src was used
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});