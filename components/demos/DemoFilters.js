import { useState } from 'react'
import FilterButton from './FilterButton'

function DemoFilters(props) {
  const [filters, setFilters] = useState(props.filtersData)

  function handleSetFilters({ slug, type }) {
    for (const prop in filters) {
      if (filters.hasOwnProperty(prop)) {
        for (const prop2 in filters[prop]) {
          if (filters[prop].hasOwnProperty(prop2)) {
            if (slug === filters[prop][prop2].slug && type === filters[prop][prop2].type) {
              filters[prop][prop2].active = true
            } else {
              filters[prop][prop2].active = false
            }
          }
        }
      }
    }

    setFilters(filters)
  }

  function doFilterBtns(_type) {
    const btns = []
    let i = 0
    for (const prop in filters[_type]) {
      const { type, slug, active } = filters[_type][prop]
      btns.push(
        <FilterButton
          key={`${_type}-${i}`}
          handleClickFilter={props.handleClickFilter}
          handleSetActive={handleSetFilters}
          type={type}
          slug={slug}
          active={active} />
      )
      i++
    }
    return btns.sort((a, b) => {
      if (a.props.slug < b.props.slug) {
        return -1
      }
      if (b.props.slug > b.props.slug) {
        return 1
      }
      return 0
    })
  }

  return (
    <div className="demos-filters">
      <h4 className="demos-filters__title">Filters</h4>
      <div className="demos-filters__group">
        <label className="demos-filters__label"><b>Tech</b></label>
        {
          doFilterBtns('tech')
        }
      </div>
      <div className="demos-filters__group">
        <label className="demos-filters__label"><b>Dev</b></label>
        {
          doFilterBtns('dev')
        }
      </div>
      <div className="demos-filters__group">
        <label className="demos-filters__label"><b>Platforms</b></label>
        {
          doFilterBtns('platforms')
        }
      </div>
    </div>
  )
}

export default DemoFilters
