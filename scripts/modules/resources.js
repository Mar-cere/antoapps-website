/**
 * Resources Module
 * Handles filtering and searching of resources
 */

export function initResources() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('resource-search');
    const resourceCards = document.querySelectorAll('.resource-card');
    const resourcesEmpty = document.getElementById('resources-empty');
    const resourcesGrid = document.getElementById('resources-grid');
    
    let currentFilter = 'all';
    let currentSearch = '';
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            filterResources();
        });
    });
    
    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            filterResources();
        });
    }
    
    function filterResources() {
        let visibleCount = 0;
        
        resourceCards.forEach(card => {
            const type = card.dataset.type;
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const searchText = title + ' ' + description;
            
            const matchesFilter = currentFilter === 'all' || type === currentFilter;
            const matchesSearch = !currentSearch || searchText.includes(currentSearch);
            
            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide empty state
        if (resourcesEmpty) {
            if (visibleCount === 0) {
                resourcesEmpty.style.display = 'block';
                if (resourcesGrid) resourcesGrid.style.display = 'none';
            } else {
                resourcesEmpty.style.display = 'none';
                if (resourcesGrid) resourcesGrid.style.display = 'grid';
            }
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.resources-grid')) {
            initResources();
        }
    });
} else {
    if (document.querySelector('.resources-grid')) {
        initResources();
    }
}

