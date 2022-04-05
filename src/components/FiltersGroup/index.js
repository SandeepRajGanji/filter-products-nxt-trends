import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props

    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }

  const renderCategoryList = () => {
    const {categoryOptions} = props

    return categoryOptions.map(category => {
      const {changeCategory, activeCategoryId} = props
      const isActive = category.categoryId === activeCategoryId
      const onClickCategoryItem = () => changeCategory(category.categoryId)
      const categoryClassName = isActive
        ? `category-name active-category-name`
        : 'category-name'
      return (
        <li
          className="category-item"
          onClick={onClickCategoryItem}
          key={category.categoryId}
        >
          <p className={categoryClassName}>{category.name}</p>
        </li>
      )
    })
  }

  const renderProductCategories = () => (
    <>
      <h1 className="category-heading">Category</h1>
      <ul className="category-list">{renderCategoryList()}</ul>
    </>
  )

  const renderRatingsList = () => {
    const {ratingsList} = props

    return ratingsList.map(rating => {
      const {activeRatingId, changeRating} = props
      const onChangeRating = () => changeRating(rating.ratingId)
      const isActive = rating.ratingId === activeRatingId
      const ratingClassName = isActive ? 'active-rating up' : 'up'

      return (
        <li
          key={rating.ratingId}
          className="rating-item"
          onClick={onChangeRating}
        >
          <img
            src={rating.imageUrl}
            className="rating-img"
            alt={`rating ${rating.ratingId}`}
          />
          <p className={ratingClassName}>&up</p>
        </li>
      )
    })
  }

  const renderRatingsFilters = () => (
    <>
      <p className="rating-heading">Rating</p>
      <ul className="ratings-list">{renderRatingsList()}</ul>
    </>
  )

  const {clearFilters} = props
  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderProductCategories()}
      {renderRatingsFilters()}
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}
export default FiltersGroup
