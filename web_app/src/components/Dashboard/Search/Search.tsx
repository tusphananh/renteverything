import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect } from 'react'
import { SkeletonAnimation } from '../../../animations/SearchAnimations'
import LocationArrowIcon from '../../../assets/icons/location-arrow.svg'
import MinusIcon from '../../../assets/icons/minus.svg'
import PlusIcon from '../../../assets/icons/plus.svg'
import { MarkerType } from '../../../constants/SearchConstants'
import { useSearchContext } from '../../../contexts/searchContext'
import {
  addMarker,
  flyTo,
  generateMarker,
  getMap,
  zoomIn,
  zoomOut
} from '../../../libs/mapbox'
import styles from './Search.module.scss'
import { SearchController } from './SearchController'

/**
 * Search component here
 */

const Search: React.FC<{
  isVisible: boolean
}> = ({ isVisible }) => {
  const { searchState } = useSearchContext()
  const [map, setMap] = React.useState<mapboxgl.Map | null>(null)
  const [userMarker, setUserMarker] = React.useState<mapboxgl.Marker | null>(
    null,
  )
  const [resultMarkers, setResultMarkers] = React.useState<mapboxgl.Marker[]>(
    [],
  )
  const resetMarker = (results: mapboxgl.Marker[]) => {
    results.forEach((rs) => {
      rs.remove()
    })
    setResultMarkers([])
  }
  useEffect(() => {
    const length = searchState.results.length
    resetMarker(resultMarkers)
    if (map && length > 0) {
      searchState.results.forEach((element) => {
        const marker = generateMarker(element.providerPosition, MarkerType.RED)
        setResultMarkers((prev) => [...prev, marker])
      })
    }
  }, [searchState.results])

  useEffect(() => {
    length = resultMarkers.length
    if (map && length > 0) {
      resultMarkers.forEach((e) => {
        addMarker(map, e)
      })
    }
  }, [resultMarkers])

  useEffect(() => {
    if (isVisible && !map) {
      setMap(getMap())
    }
  }, [isVisible])

  useEffect(() => {
    if (map && searchState.curPos) {
      map.flyTo({
        center: [searchState.curPos.lng, searchState.curPos.lat],
        zoom: 15,
      })

      if (userMarker !== null) {
        userMarker.setLngLat([searchState.curPos.lng, searchState.curPos.lat])
      } else {
        const marker = generateMarker(searchState.curPos, MarkerType.GREEN)
        setUserMarker(marker)
        addMarker(map, marker)
      }
    }
  }, [map, searchState.curPos])

  /**
   * Render the search component
   */
  return (
    <div className={isVisible ? styles['container'] : styles['hide']}>
      {/* Loading... Skeleton */}
      <SkeletonAnimation
        className={styles['skeleton-loading']}
        isVisible={searchState.curPos ? false : true}
      >
        <p>Loading Map...</p>
      </SkeletonAnimation>

      {/* Search Controller */}
      <SearchController map={map} />

      {/* Map Controller */}
      <MapController map={map} />

      {/* Map */}
      <div
        id="map"
        className={
          searchState.curPos
            ? styles['map-container--actived']
            : styles['map-container--disabled']
        }
      ></div>
    </div>
  )
}

const MapController: React.FC<{
  map: mapboxgl.Map | null
}> = ({ map }) => {
  const { searchState } = useSearchContext()
  return (
    <div className={styles['map-controller-container']}>
      <div className={styles['map-controller__btn-container']}>
        <button
          className={styles['map-controller__btn']}
          onClick={() => {
            zoomIn(map)
          }}
        >
          <PlusIcon />
        </button>
        <div className={styles['map-controller__devider']} />
        <button
          className={styles['map-controller__btn']}
          onClick={() => {
            zoomOut(map)
          }}
        >
          <MinusIcon />
        </button>
      </div>
      <div className={styles['map-controller__btn-container']}>
        <button
          className={styles['map-controller__btn']}
          onClick={() => {
            flyTo(map, searchState.curPos!)
          }}
        >
          <LocationArrowIcon />
        </button>
      </div>
    </div>
  )
}

export default React.memo(Search)
