function DemoFilters(props) {
  const filtersTech = [],
        filtersDev  = [],
        filtersPlat = []

  for (let obj in props.filtersData.tech) {
    if (props.filtersData.tech.hasOwnProperty(obj)) {
      filtersTech.push(obj)
    }
  }

  for (let obj in props.filtersData.dev) {
    if (props.filtersData.dev.hasOwnProperty(obj)) {
      filtersDev.push(obj)
    }
  }

  for (let obj in props.filtersData.platforms) {
    if (props.filtersData.platforms.hasOwnProperty(obj)) {
      filtersPlat.push(obj)
    }
  }

  return (
    <div className="demos-filters">
      <h4 className="demos-filters__title">Filters</h4>
      <div className="demos-filters__group">
        <label className="demos-filters__label"><b>Tech</b></label>
        {
          filtersTech.sort().map((item, i) => <FilterButton key={`tech-${i}`} handleClickFilter={props.handleClickFilter} type='tech' slug={item} />)
        }
      </div>
      <div className="demos-filters__group">
        <label className="demos-filters__label"><b>Dev</b></label>
        {
          filtersDev.sort().map((item, i) => <FilterButton key={`dev-${i}`} handleClickFilter={props.handleClickFilter} type='dev' slug={item} />)
        }
      </div>
      <div className="demos-filters__group">
        <label className="demos-filters__label"><b>Platforms</b></label>
        {
          filtersPlat.sort().map((item, i) => <FilterButton key={`plat-${i}`} handleClickFilter={props.handleClickFilter} type='platforms' slug={item} />)
        }
      </div>
    </div>
  )
}

function FilterButton(props) {
  const { type, slug, handleClickFilter } = props
  return (
    <button
      className={`filter filter-${type} filter-${type}--${slug}`}
      onClick={() => {
        handleClickFilter({type: type, slug: slug})
      }}>
      {slug}
    </button>
  )
}

export default DemoFilters
