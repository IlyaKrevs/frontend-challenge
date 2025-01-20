import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { SquareCard } from './Components/SquareCard/SquareCard';

import { kittyAsyncActions, toggleFavorite } from 'reduxStore/slices/kittySlice';
import { useAppDispatch, useAppSelector } from 'reduxStore/reduxHooks';

type FilterBy = 'all' | 'favotite';

const filterOption: Record<FilterBy, string> = {
  all: 'Все котики',
  favotite: 'Любимые котики'
}

function App() {

  const dispatch = useAppDispatch()
  const catsArr = useAppSelector(state => state.kitties.itemsArr)
  const favoritesIDs = useAppSelector(s => s.kitties.favoritesID)

  useEffect(() => {
    dispatch(kittyAsyncActions.fetchMoreCats())
  }, [])

  useEffect(() => {
    const scrollHandler = () => {
      const isDocumentOver = (window.innerHeight + window.scrollY) >= document.body.offsetHeight
      if (isDocumentOver) {
        dispatch(kittyAsyncActions.fetchMoreCats())
      }
    }

    window.addEventListener('scroll', scrollHandler)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const [filterValue, setFilterValue] = useState<FilterBy>('all')

  let showItems: typeof catsArr = []
  if (filterValue === 'favotite') {
    showItems = catsArr.filter(item => favoritesIDs.includes(item.id))
  } else if (filterValue === 'all') {
    showItems = catsArr
  }

  function toggleHandler(value: string) {
    dispatch(toggleFavorite({ id: value }))
  }

  return (
    <div className={styles.App}>
      <header className={styles.headerContainer}>
        <ul className={styles.listContainer}>
          {Object.entries(filterOption).map(([key, value]) => {
            return <li
              key={key}
              className={[styles.list__item, filterValue === key ? styles.list__item_active : ''].join(' ')}
              onClick={() => setFilterValue(key as FilterBy)}
            >
              {value}
            </li>
          })}
        </ul>
      </header>
      <div className={styles.contentContainer}>
        {showItems.map(item => <SquareCard
          onClickHandler={() => toggleHandler(item.id)}
          isChecked={favoritesIDs.includes(item.id)}
          key={item.id}
          {...item}
        />)}
      </div>
    </div>
  );
}

export default App;

