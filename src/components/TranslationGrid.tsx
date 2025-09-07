import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Search, Filter, Download, Upload } from 'lucide-react';
import styles from './TranslationGrid.module.css';

export default function TranslationGrid() {
  const { 
    currentProject, 
    translations, 
    selectedTranslation,
    loadTranslations, 
    createTranslation, 
    updateTranslation,
    setSelectedTranslation 
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [newSourceText, setNewSourceText] = useState('');

  useEffect(() => {
    if (currentProject) {
      loadTranslations(currentProject.id);
    }
  }, [currentProject, loadTranslations]);

  const filteredTranslations = translations.filter(translation => {
    const matchesSearch = translation.source_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         translation.target_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         translation.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || translation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddTranslation = async () => {
    if (newSourceText.trim() && currentProject) {
      await createTranslation(currentProject.id, newSourceText.trim());
      setNewSourceText('');
      setIsAddingRow(false);
    }
  };

  const handleUpdateTranslation = async (id: string, field: keyof typeof translations[0], value: string) => {
    const updates: Partial<typeof translations[0]> = {};
    if (field === 'status') {
      updates[field] = value as 'Draft' | 'Validated' | 'Approved';
    } else {
      updates[field] = value;
    }
    await updateTranslation(id, updates);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Draft':
        return styles.draft;
      case 'Validated':
        return styles.validated;
      case 'Approved':
        return styles.approved;
      default:
        return styles.draft;
    }
  };

  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarHeader}>
          <h2 className={styles.title}>Translations</h2>
          <div className={styles.toolbarActions}>
            <button className={styles.toolbarButton}>
              <Upload className={styles.toolbarIcon} />
            </button>
            <button className={styles.toolbarButton}>
              <Download className={styles.toolbarIcon} />
            </button>
            <button
              onClick={() => setIsAddingRow(true)}
              className={styles.addButton}
            >
              <Plus className={styles.addIcon} />
              <span>Add Row</span>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className={styles.searchAndFilter}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search translations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Validated">Validated</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {/* Header */}
          <div className={styles.gridHeader}>
            <div className={styles.gridHeaderRow}>
              <div className={`${styles.gridHeaderCell} col-span-3`}>Source Text</div>
              <div className={`${styles.gridHeaderCell} col-span-3`}>Target Translation</div>
              <div className={`${styles.gridHeaderCell} col-span-2`}>Notes</div>
              <div className={`${styles.gridHeaderCell} col-span-2`}>Status</div>
              <div className={`${styles.gridHeaderCell} col-span-2`}>Actions</div>
            </div>
          </div>

          {/* Rows */}
          <div className={styles.gridRows}>
            {/* Add New Row */}
            {isAddingRow && (
              <div className={styles.addRowContainer}>
                <div className={styles.addRowContent}>
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={newSourceText}
                      onChange={(e) => setNewSourceText(e.target.value)}
                      placeholder="Enter source text..."
                      className={styles.textarea}
                      autoFocus
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      placeholder="Target translation will appear here..."
                      className={`${styles.textarea} ${styles.disabled}`}
                      disabled
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Notes..."
                      className={`${styles.textarea} ${styles.disabled}`}
                      disabled
                    />
                  </div>
                  <div className="col-span-2">
                    <span className={`${styles.statusBadge} ${styles.draft}`}>
                      Draft
                    </span>
                  </div>
                  <div className={`col-span-2 ${styles.addRowActions}`}>
                    <button
                      onClick={handleAddTranslation}
                      className={styles.saveButton}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingRow(false);
                        setNewSourceText('');
                      }}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Translation Rows */}
            {filteredTranslations.map((translation) => (
              <div
                key={translation.id}
                className={`${styles.gridRow} ${
                  selectedTranslation?.id === translation.id ? styles.selected : ''
                }`}
                onClick={() => setSelectedTranslation(translation)}
              >
                <div className={styles.gridRowContent}>
                  <div className="col-span-3">
                    <div className={styles.sourceText}>
                      {translation.source_text}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <textarea
                      value={translation.target_text || ''}
                      onChange={(e) => handleUpdateTranslation(translation.id, 'target_text', e.target.value)}
                      placeholder="Enter translation..."
                      className={styles.textarea}
                      rows={2}
                    />
                  </div>
                  <div className="col-span-2">
                    <textarea
                      value={translation.notes || ''}
                      onChange={(e) => handleUpdateTranslation(translation.id, 'notes', e.target.value)}
                      placeholder="Add notes..."
                      className={styles.textarea}
                      rows={2}
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      value={translation.status}
                      onChange={(e) => handleUpdateTranslation(translation.id, 'status', e.target.value)}
                      className={`${styles.statusSelect} ${getStatusClass(translation.status)}`}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Validated">Validated</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <div className={styles.addRowActions}>
                      <button className={styles.actionButton}>
                        <Filter className={styles.actionIcon} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredTranslations.length === 0 && !isAddingRow && (
              <div className={styles.emptyState}>
                <p>No translations found</p>
                {searchTerm && (
                  <p className={styles.emptyText}>Try adjusting your search terms</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
