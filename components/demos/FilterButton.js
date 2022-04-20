function FilterButton(props) {
  const { type, slug, active, handleClickFilter, handleSetActive } = props
  const isActive = (active) ? 'active' : 'inactive'
  return (
    <button
      className={`filter filter-${type} filter-${type}--${slug} filter--${isActive}`}
      onClick={() => {
        handleClickFilter({type: type, slug: slug})
        handleSetActive({type: type, slug: slug})
      }}>
      {slug}
    </button>
  )
}

export default FilterButton
