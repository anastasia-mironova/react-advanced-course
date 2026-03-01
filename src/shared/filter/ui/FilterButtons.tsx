import React from 'react'
import styles from './FilterButtons.module.css'

export type FilterType = 'all' | 'completed' | 'incomplete'

interface FiltersProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  className?: string
}

export const FilterButtons: React.FC<FiltersProps> = React.memo(
  ({currentFilter, onFilterChange, className = ''}) => {
    const filters: {value: FilterType; label: string}[] = [
      {value: 'all', label: 'Все'},
      {value: 'completed', label: 'Выполненные'},
      {value: 'incomplete', label: 'Невыполненные'}
    ]

    return (
      <div className={`${styles.filters} ${className}`}>
        {filters.map(({value, label}) => (
          <button
            key={value}
            className={`${styles.filterButton} ${currentFilter === value ? styles.active : ''}`}
            onClick={() => onFilterChange(value)}
            aria-label={`Показать ${label.toLowerCase()} задачи`}
          >
            {label}
          </button>
        ))}
      </div>
    )
  }
)
