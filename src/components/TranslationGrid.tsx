import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Search, Filter, Download, Upload } from 'lucide-react';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-status-draft/20 text-status-draft border border-status-draft/30';
      case 'Validated':
        return 'bg-status-validated/20 text-status-validated border border-status-validated/30';
      case 'Approved':
        return 'bg-status-approved/20 text-status-approved border border-status-approved/30';
      default:
        return 'bg-status-draft/20 text-status-draft border border-status-draft/30';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="p-4 border-b border-border-primary bg-background-secondary">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Translations</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-text-tertiary hover:text-text-primary hover:bg-interactive-hover rounded-lg transition-all duration-200">
              <Upload className="w-4 h-4" />
            </button>
            <button className="p-2 text-text-tertiary hover:text-text-primary hover:bg-interactive-hover rounded-lg transition-all duration-200">
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsAddingRow(true)}
              className="flex items-center space-x-1 px-3 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 transition-all duration-200 shadow-cursor-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Row</span>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary w-4 h-4" />
            <input
              type="text"
              placeholder="Search translations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-200"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-200"
          >
            <option value="all">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Validated">Validated</option>
            <option value="Approved">Approved</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="sticky top-0 bg-background-secondary border-b border-border-primary shadow-cursor-sm">
            <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-text-primary">
              <div className="col-span-3">Source Text</div>
              <div className="col-span-3">Target Translation</div>
              <div className="col-span-2">Notes</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Actions</div>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border-secondary">
            {/* Add New Row */}
            {isAddingRow && (
              <div className="p-4 bg-accent-blue/5 border-l-4 border-accent-blue animate-slide-in">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={newSourceText}
                      onChange={(e) => setNewSourceText(e.target.value)}
                      placeholder="Enter source text..."
                      className="w-full px-3 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-200"
                      autoFocus
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      placeholder="Target translation will appear here..."
                      className="w-full px-3 py-2 bg-background-tertiary border border-border-secondary rounded-lg text-text-tertiary"
                      disabled
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Notes..."
                      className="w-full px-3 py-2 bg-background-tertiary border border-border-secondary rounded-lg text-text-tertiary"
                      disabled
                    />
                  </div>
                  <div className="col-span-2">
                    <span className="px-2 py-1 text-xs font-medium bg-status-draft/20 text-status-draft border border-status-draft/30 rounded-full">
                      Draft
                    </span>
                  </div>
                  <div className="col-span-2 flex space-x-2">
                    <button
                      onClick={handleAddTranslation}
                      className="px-3 py-1 text-sm bg-accent-green text-white rounded hover:bg-accent-green/90 transition-all duration-200 shadow-cursor-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingRow(false);
                        setNewSourceText('');
                      }}
                      className="px-3 py-1 text-sm bg-interactive-hover text-text-primary rounded hover:bg-interactive-active transition-all duration-200"
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
                className={`p-4 hover:bg-interactive-hover cursor-pointer transition-all duration-200 group ${
                  selectedTranslation?.id === translation.id ? 'bg-accent-blue/10 border-l-4 border-accent-blue' : ''
                }`}
                onClick={() => setSelectedTranslation(translation)}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3">
                    <div className="text-sm text-text-primary whitespace-pre-wrap">
                      {translation.source_text}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <textarea
                      value={translation.target_text || ''}
                      onChange={(e) => handleUpdateTranslation(translation.id, 'target_text', e.target.value)}
                      placeholder="Enter translation..."
                      className="w-full px-3 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:ring-2 focus:ring-accent-blue focus:border-accent-blue resize-none transition-all duration-200"
                      rows={2}
                    />
                  </div>
                  <div className="col-span-2">
                    <textarea
                      value={translation.notes || ''}
                      onChange={(e) => handleUpdateTranslation(translation.id, 'notes', e.target.value)}
                      placeholder="Add notes..."
                      className="w-full px-3 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:ring-2 focus:ring-accent-blue focus:border-accent-blue resize-none transition-all duration-200"
                      rows={2}
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      value={translation.status}
                      onChange={(e) => handleUpdateTranslation(translation.id, 'status', e.target.value)}
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 transition-all duration-200 ${getStatusColor(translation.status)}`}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Validated">Validated</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <div className="flex space-x-1">
                      <button className="p-1 text-text-tertiary hover:text-text-primary hover:bg-interactive-hover rounded transition-all duration-200">
                        <Filter className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredTranslations.length === 0 && !isAddingRow && (
              <div className="p-8 text-center text-text-tertiary animate-fade-in">
                <p>No translations found</p>
                {searchTerm && (
                  <p className="text-sm mt-1">Try adjusting your search terms</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
