export class FilterComponent {
    constructor(parent, onFilterChange) {
        this.parent = parent;
        this.onFilterChange = onFilterChange;
    }

    getHTML() {
        return `
            <div class="filter-container text-center mb-3">
                <label for="filter">Фильтр:</label>
                <select id="filter" name="filter" class="form-select mx-auto" style="max-width: 200px;">
                    <option value="">Все</option>
                    <option value="friends">Друзья</option>
                </select>
            </div>
        `;
    }

    addListeners() {
        const filterSelect = document.getElementById('filter');
        filterSelect.addEventListener('change', (e) => {
            this.onFilterChange(e.target.value);
        });
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        this.addListeners();
    }
}
