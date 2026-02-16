// ===== Y15x Top Up - Complete JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Y15x Top Up - Modern Version Loaded');
    
    // ===== 1. ACTIVE MENU HIGHLIGHT =====
    highlightActiveMenu();
    
    // ===== 2. SEARCH FUNCTIONALITY (games.html) =====
    initSearchFeature();
    
    // ===== 3. DENOM SELECTION (topup.html) =====
    initDenomSelection();
    
    // ===== 4. PAYMENT METHOD SELECTION (topup.html) =====
    initPaymentSelection();
    
    // ===== 5. TOP UP FORM SUBMIT (topup.html) =====
    initTopUpSubmit();
    
    // ===== 6. CONTACT FORM SUBMIT (contact.html) =====
    initContactForm();
    
    // ===== 7. DOWNLOAD INVOICE (invoice.html) =====
    initInvoiceDownload();
    
    // ===== 8. ANIMATION ON SCROLL =====
    initScrollAnimation();
    
    // ===== 9. MOBILE MENU TOGGLE =====
    initMobileMenu();
    
    // ===== 10. BACK TO TOP BUTTON =====
    initBackToTop();
    
    // ===== 11. GAME FILTER (games.html) =====
    initGameFilter();
    
    // ===== 12. PRICE CALCULATOR (topup.html) =====
    initPriceCalculator();
    
    // ===== 13. FORM VALIDATION =====
    initFormValidation();
    
    // ===== 14. TOOLTIPS =====
    initTooltips();
    
    // ===== 15. LAZY LOADING =====
    initLazyLoading();
});

// ===== 1. ACTIVE MENU HIGHLIGHT =====
function highlightActiveMenu() {
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
    
    console.log(`📍 Active page: ${currentPage}`);
}

// ===== 2. SEARCH FUNCTIONALITY =====
function initSearchFeature() {
    const searchInput = document.getElementById('searchGame');
    if (!searchInput) return;
    
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase().trim();
        const gameCards = document.querySelectorAll('.game-card, .game-card-modern');
        let visibleCount = 0;
        
        gameCards.forEach(card => {
            const gameTitle = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const gameDesc = card.querySelector('p')?.textContent.toLowerCase() || '';
            
            if (gameTitle.includes(searchTerm) || gameDesc.includes(searchTerm)) {
                card.style.display = 'block';
                visibleCount++;
                // Add highlight effect
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = 'pulse 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show result count
        const resultMsg = document.getElementById('searchResult');
        if (!resultMsg) {
            const msg = document.createElement('div');
            msg.id = 'searchResult';
            msg.className = 'search-result';
            searchInput.parentNode.appendChild(msg);
        }
        
        const resultElement = document.getElementById('searchResult');
        if (resultElement) {
            if (searchTerm === '') {
                resultElement.textContent = '';
            } else {
                resultElement.textContent = `🔍 Ditemukan ${visibleCount} game`;
                resultElement.style.color = '#2d7aff';
            }
        }
    });
}

// ===== 3. DENOM SELECTION =====
function initDenomSelection() {
    const denomItems = document.querySelectorAll('.denom-item');
    if (denomItems.length === 0) return;
    
    denomItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove selected from all
            denomItems.forEach(d => {
                d.classList.remove('selected');
                d.style.transform = 'scale(1)';
            });
            
            // Add selected to clicked
            this.classList.add('selected');
            this.style.transform = 'scale(1.02)';
            
            // Get nominal value
            const nominal = this.getAttribute('data-nominal');
            const price = this.querySelector('.denom-price')?.textContent || '';
            console.log(`💰 Selected nominal: Rp ${nominal} - ${price}`);
            
            // Update summary if exists
            updateOrderSummary();
        });
    });
}

// ===== 4. PAYMENT METHOD SELECTION =====
function initPaymentSelection() {
    const paymentItems = document.querySelectorAll('.payment-item');
    if (paymentItems.length === 0) return;
    
    paymentItems.forEach(item => {
        item.addEventListener('click', function() {
            paymentItems.forEach(p => {
                p.classList.remove('selected');
                p.style.borderColor = 'var(--border-color)';
            });
            
            this.classList.add('selected');
            this.style.borderColor = 'var(--success)';
            
            const method = this.querySelector('span')?.textContent || '';
            console.log(`💳 Payment method: ${method}`);
            
            // Update summary
            updateOrderSummary();
        });
    });
}

// ===== 5. TOP UP SUBMIT =====
function initTopUpSubmit() {
    const topupSubmit = document.getElementById('topupSubmit');
    if (!topupSubmit) return;
    
    topupSubmit.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateTopUpForm()) {
            return;
        }
        
        // Get form values
        const game = document.getElementById('gameSelect')?.value || 'Not selected';
        const userId = document.getElementById('userId')?.value || '';
        const serverId = document.getElementById('serverId')?.value || '-';
        
        // Get selected denom
        const selectedDenom = document.querySelector('.denom-item.selected');
        const nominalValue = selectedDenom?.querySelector('.denom-value')?.textContent || '';
        const nominalPrice = selectedDenom?.querySelector('.denom-price')?.textContent || '';
        
        // Get payment method
        const selectedPayment = document.querySelector('.payment-item.selected');
        const paymentMethod = selectedPayment?.querySelector('span')?.textContent || '';
        
        // Create invoice data
        const invoiceData = {
            invoiceNo: 'INV/' + new Date().getFullYear() + '/' + 
                       String(new Date().getMonth() + 1).padStart(2,'0') + '/' +
                       Math.floor(Math.random() * 10000).toString().padStart(4,'0'),
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            game: game,
            userId: userId,
            serverId: serverId,
            nominal: nominalValue,
            price: nominalPrice,
            paymentMethod: paymentMethod,
            status: 'Pending'
        };
        
        // Save to localStorage
        localStorage.setItem('lastInvoice', JSON.stringify(invoiceData));
        
        // Show success message with animation
        showNotification('✅ Top Up diproses! Mengarahkan ke invoice...', 'success');
        
        // Redirect to invoice after delay
        setTimeout(() => {
            window.location.href = 'invoice.html';
        }, 1500);
    });
}

// ===== 6. CONTACT FORM SUBMIT =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[placeholder="Nama Lengkap"]')?.value || '';
        const email = this.querySelector('input[placeholder="Email"]')?.value || '';
        const phone = this.querySelector('input[placeholder="No. WhatsApp"]')?.value || '';
        const category = this.querySelector('select')?.value || '';
        const message = this.querySelector('textarea')?.value || '';
        
        // Validate
        if (!name || !email || !message) {
            showNotification('❌ Mohon isi semua field yang wajib!', 'error');
            return;
        }
        
        console.log('📧 Contact Form:', { name, email, phone, category, message });
        
        // Show success message
        showNotification('✅ Pesan terkirim! Tim kami akan segera merespon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// ===== 7. INVOICE DOWNLOAD =====
function initInvoiceDownload() {
    const downloadBtn = document.getElementById('downloadInvoice');
    if (!downloadBtn) return;
    
    // Load invoice data from localStorage
    loadInvoiceData();
    
    downloadBtn.addEventListener('click', function() {
        // Create PDF content
        const invoiceContent = generateInvoiceHTML();
        
        // Create blob and download
        const blob = new Blob([invoiceContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification('📄 Invoice siap diunduh!', 'success');
    });
}

// ===== 8. SCROLL ANIMATION =====
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll(
        '.game-card-modern, .feature-card, .value-item, .stat-card, .game-card'
    );
    
    if (animatedElements.length === 0) return;
    
    // Set initial state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ===== 9. MOBILE MENU =====
function initMobileMenu() {
    // Create mobile menu button if needed
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        
        if (!navbar || !navLinks) return;
        
        // Check if menu button exists
        if (!document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('div');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuBtn.style.cssText = `
                display: block;
                font-size: 2rem;
                cursor: pointer;
                color: var(--accent-primary);
                margin-left: auto;
            `;
            
            // Insert after logo
            const logoArea = document.querySelector('.logo-area');
            logoArea?.parentNode?.insertBefore(menuBtn, logoArea.nextSibling);
            
            // Hide nav links initially
            navLinks.style.display = 'none';
            navLinks.style.flexDirection = 'column';
            navLinks.style.width = '100%';
            navLinks.style.marginTop = '1rem';
            
            menuBtn.addEventListener('click', function() {
                if (navLinks.style.display === 'none') {
                    navLinks.style.display = 'flex';
                    this.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    navLinks.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
            
            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'row';
                    if (document.querySelector('.mobile-menu-btn')) {
                        document.querySelector('.mobile-menu-btn').style.display = 'none';
                    }
                } else {
                    navLinks.style.display = 'none';
                    if (document.querySelector('.mobile-menu-btn')) {
                        document.querySelector('.mobile-menu-btn').style.display = 'block';
                    }
                }
            });
        }
    }
}

// ===== 10. BACK TO TOP BUTTON =====
function initBackToTop() {
    // Create button if not exists
    if (!document.querySelector('.back-to-top')) {
        const btn = document.createElement('div');
        btn.className = 'back-to-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #2d7aff, #00e5ff);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            z-index: 999;
            box-shadow: 0 5px 20px rgba(45,122,255,0.5);
            border: none;
        `;
        document.body.appendChild(btn);
        
        // Show/hide on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                btn.style.opacity = '1';
                btn.style.transform = 'scale(1)';
            } else {
                btn.style.opacity = '0';
                btn.style.transform = 'scale(0.8)';
            }
        });
        
        // Click to top
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== 11. GAME FILTER =====
function initGameFilter() {
    // Create filter buttons on games.html
    if (window.location.pathname.includes('games.html')) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
        filterContainer.style.cssText = `
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin: 2rem;
            flex-wrap: wrap;
        `;
        
        const categories = ['Semua', 'Mobile', 'PC', 'Battle Royale', 'MOBA'];
        const filterSection = document.querySelector('.games-section');
        
        if (filterSection) {
            categories.forEach(cat => {
                const btn = document.createElement('button');
                btn.className = 'filter-btn';
                btn.textContent = cat;
                btn.style.cssText = `
                    padding: 0.8rem 1.5rem;
                    background: rgba(45,122,255,0.1);
                    border: 1px solid rgba(45,122,255,0.3);
                    border-radius: 50px;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s;
                `;
                
                btn.addEventListener('mouseenter', () => {
                    btn.style.background = 'rgba(45,122,255,0.3)';
                });
                
                btn.addEventListener('mouseleave', () => {
                    if (!btn.classList.contains('active')) {
                        btn.style.background = 'rgba(45,122,255,0.1)';
                    }
                });
                
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.filter-btn').forEach(b => {
                        b.style.background = 'rgba(45,122,255,0.1)';
                    });
                    this.style.background = 'linear-gradient(135deg, #2d7aff, #00e5ff)';
                    filterGames(cat);
                });
                
                filterContainer.appendChild(btn);
            });
            
            filterSection.parentNode.insertBefore(filterContainer, filterSection);
        }
    }
}

function filterGames(category) {
    const games = document.querySelectorAll('.game-card-modern, .game-card');
    if (category === 'Semua') {
        games.forEach(g => g.style.display = 'block');
    } else {
        // Simple filter logic - customize as needed
        games.forEach(g => {
            const title = g.querySelector('h3')?.textContent || '';
            if (category === 'Mobile' && (title.includes('Mobile') || title.includes('Free Fire') || title.includes('PUBG'))) {
                g.style.display = 'block';
            } else if (category === 'PC' && title.includes('Valorant')) {
                g.style.display = 'block';
            } else {
                g.style.display = 'none';
            }
        });
    }
}

// ===== 12. PRICE CALCULATOR =====
function initPriceCalculator() {
    const userId = document.getElementById('userId');
    const denomItems = document.querySelectorAll('.denom-item');
    const paymentItems = document.querySelectorAll('.payment-item');
    
    if (userId && denomItems.length > 0) {
        // Create price summary element
        let summary = document.getElementById('priceSummary');
        if (!summary) {
            summary = document.createElement('div');
            summary.id = 'priceSummary';
            summary.className = 'price-summary';
            summary.style.cssText = `
                margin-top: 2rem;
                padding: 1.5rem;
                background: rgba(0,0,0,0.3);
                border-radius: 20px;
                border: 1px solid rgba(45,122,255,0.3);
            `;
            
            const submitBtn = document.getElementById('topupSubmit');
            submitBtn?.parentNode?.insertBefore(summary, submitBtn);
        }
        
        updateOrderSummary();
    }
}

function updateOrderSummary() {
    const summary = document.getElementById('priceSummary');
    if (!summary) return;
    
    const selectedDenom = document.querySelector('.denom-item.selected');
    const selectedPayment = document.querySelector('.payment-item.selected');
    const userId = document.getElementById('userId')?.value || '-';
    
    if (selectedDenom && selectedPayment) {
        const nominal = selectedDenom.querySelector('.denom-value')?.textContent || '';
        const price = selectedDenom.querySelector('.denom-price')?.textContent || '';
        const payment = selectedPayment.querySelector('span')?.textContent || '';
        
        summary.innerHTML = `
            <h4 style="color: #2d7aff; margin-bottom: 1rem;">📋 Ringkasan Order</h4>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>ID Player:</span> <strong>${userId}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Nominal:</span> <strong>${nominal} Diamond</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Harga:</span> <strong style="color: #00e5ff;">${price}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Pembayaran:</span> <strong>${payment}</strong>
            </div>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="display: flex; justify-content: space-between; font-size: 1.2rem;">
                    <span>Total Bayar:</span> 
                    <strong style="color: #2d7aff; font-size: 1.4rem;">${price}</strong>
                </div>
            </div>
        `;
    }
}

// ===== 13. FORM VALIDATION =====
function validateTopUpForm() {
    const userId = document.getElementById('userId')?.value || '';
    const selectedDenom = document.querySelector('.denom-item.selected');
    const selectedPayment = document.querySelector('.payment-item.selected');
    
    if (!userId || userId.trim() === '') {
        showNotification('❌ Masukkan User ID / Player ID!', 'error');
        document.getElementById('userId')?.focus();
        return false;
    }
    
    if (userId.length < 5) {
        showNotification('❌ User ID minimal 5 karakter!', 'error');
        document.getElementById('userId')?.focus();
        return false;
    }
    
    if (!selectedDenom) {
        showNotification('❌ Pilih nominal top up!', 'error');
        return false;
    }
    
    if (!selectedPayment) {
        showNotification('❌ Pilih metode pembayaran!', 'error');
        return false;
    }
    
    return true;
}

function initFormValidation() {
    // Add input validation for numeric fields
    const userId = document.getElementById('userId');
    if (userId) {
        userId.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    const serverId = document.getElementById('serverId');
    if (serverId) {
        serverId.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
}

// ===== 14. TOOLTIPS =====
function initTooltips() {
    // Add tooltips to important elements
    const tooltipElements = [
        { selector: '.stat-badge', text: 'Statistik Y15x' },
        { selector: '.btn-glow', text: 'Mulai Top Up' },
        { selector: '.game-card-modern', text: 'Klik untuk detail game' }
    ];
    
    tooltipElements.forEach(item => {
        document.querySelectorAll(item.selector).forEach(el => {
            el.setAttribute('title', item.text);
        });
    });
}

// ===== 15. LAZY LOADING =====
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===== HELPER: Load Invoice Data =====
function loadInvoiceData() {
    const invoiceData = localStorage.getItem('lastInvoice');
    if (!invoiceData) return;
    
    try {
        const data = JSON.parse(invoiceData);
        
        // Update invoice elements if they exist
        const invoiceNoEl = document.querySelector('.invoice-title p');
        if (invoiceNoEl) invoiceNoEl.textContent = `#${data.invoiceNo}`;
        
        const dateEl = document.querySelector('.info-col .value');
        if (dateEl) dateEl.textContent = data.date;
        
        const gameDescEl = document.querySelector('.invoice-table tbody tr td:first-child');
        if (gameDescEl) gameDescEl.textContent = `${data.game} Diamond`;
        
        const detailEl = document.querySelector('.invoice-table tbody tr td:nth-child(2)');
        if (detailEl) detailEl.textContent = `ID: ${data.userId} (Server: ${data.serverId})`;
        
        const amountEl = document.querySelector('.invoice-table tbody tr td:nth-child(3)');
        if (amountEl) amountEl.textContent = data.nominal;
        
        const priceEl = document.querySelector('.invoice-table tbody tr td:last-child');
        if (priceEl) priceEl.textContent = data.price;
        
        const totalEl = document.querySelector('.total-row td:last-child');
        if (totalEl) totalEl.textContent = data.price;
        
        const paymentEl = document.querySelector('.payment-detail p:first-of-type');
        if (paymentEl) paymentEl.textContent = `Metode: ${data.paymentMethod}`;
        
    } catch (e) {
        console.error('Error loading invoice:', e);
    }
}

// ===== HELPER: Generate Invoice HTML =====
function generateInvoiceHTML() {
    const invoiceData = JSON.parse(localStorage.getItem('lastInvoice') || '{}');
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice Y15x Top Up</title>
            <style>
                body { font-family: Arial; padding: 40px; }
                .invoice { max-width: 800px; margin: auto; border: 1px solid #ccc; padding: 30px; }
                .header { text-align: center; margin-bottom: 30px; }
                .details { margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 10px; border-bottom: 1px solid #ddd; }
                .total { font-size: 1.2em; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="invoice">
                <div class="header">
                    <h1>Y15x Top Up</h1>
                    <h2>INVOICE</h2>
                    <p>${invoiceData.invoiceNo || 'INV/2026/001'}</p>
                </div>
                <div class="details">
                    <p>Tanggal: ${invoiceData.date || new Date().toLocaleDateString()}</p>
                    <p>ID Player: ${invoiceData.userId || '-'}</p>
                    <p>Game: ${invoiceData.game || '-'}</p>
                </div>
                <table>
                    <tr>
                        <th>Deskripsi</th>
                        <th>Jumlah</th>
                        <th>Harga</th>
                    </tr>
                    <tr>
                        <td>${invoiceData.game || 'Game'} Diamond</td>
                        <td>${invoiceData.nominal || '-'}</td>
                        <td>${invoiceData.price || '-'}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: right;">Total</td>
                        <td class="total">${invoiceData.price || '-'}</td>
                    </tr>
                </table>
                <p>Metode Pembayaran: ${invoiceData.paymentMethod || '-'}</p>
                <p>Status: LUNAS</p>
            </div>
        </body>
        </html>
    `;
}

// ===== HELPER: Show Notification =====
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00b09b, #96c93d)' : 
                     type === 'error' ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' : 
                     'linear-gradient(135deg, #2d7aff, #00e5ff)'};
        color: white;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
