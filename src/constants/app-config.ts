export const API_CONFIG = {
  BASE_URL: 'https://rickandmortyapi.com/api',
  ENDPOINTS: {
    CHARACTERS: '/character',
    LOCATIONS: '/location',
    EPISODES: '/episode',
  },
} as const;

export const VIDEO_CONFIG = {
  VIDSRC_BASE_URL: 'https://vidsrc.xyz/embed/tv',
  RICK_AND_MORTY_IMDB_ID: 'tt2861424',
  AUTOPLAY: true,
  AUTONEXT: true,
} as const;

export const PAGINATION_CONFIG = {
  CHARACTERS_PER_PAGE: 20,
  LOCATIONS_PER_PAGE: 20,
  EPISODES_PER_PAGE: 20,
  RESIDENTS_PER_PAGE: 20,
} as const;

export const CACHE_CONFIG = {
  TTL_SHORT: 2 * 60 * 1000,
  TTL_MEDIUM: 5 * 60 * 1000,
  TTL_LONG: 15 * 60 * 1000,
  TTL_EXTRA_LONG: 60 * 60 * 1000,
  MAX_SIZE: 100,
} as const;

export const FILTER_OPTIONS = {
  STATUS: [
    { value: '', label: 'All Statuses' },
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' },
  ],
  GENDER: [
    { value: '', label: 'All Genders' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'genderless', label: 'Genderless' },
    { value: 'unknown', label: 'Unknown' },
  ],
} as const;

export const ERROR_MESSAGES = {
  GENERIC: 'An error occurred',
  NOT_FOUND: 'Not found',
  CHARACTER_NOT_FOUND: 'Character not found',
  LOCATION_NOT_FOUND: 'Location not found',
  EPISODE_NOT_FOUND: 'Episode not found',
  NO_CHARACTERS_FOUND: 'No characters found matching your filters',
  NO_LOCATIONS_FOUND: 'No locations found matching your filters',
  NO_EPISODES_FOUND: 'No episodes found matching your filters',
  FAILED_TO_LOAD: 'Failed to load data',
} as const;

export const UI_TEXT = {
  APP_NAME: 'Rick & Morty Explorer',
  NAV_CHARACTERS: 'Characters',
  NAV_EPISODES: 'Episodes',
  NAV_LOCATIONS: 'Locations',
  BACK_TO_CHARACTERS: 'Back to Characters',
  BACK_TO_EPISODES: 'Back to Episodes',
  BACK_TO_LOCATIONS: 'Back to Locations',
  BACK_TO_EPISODE: 'Back to Episode',
  BACK_TO_LOCATION: 'Back to Location',
  WATCH_EPISODE: 'Watch Episode',
  SEARCH_PLACEHOLDER: 'Search...',
  RESET_FILTERS: 'Reset',
  NOT_FOUND_TITLE: '404 - Dimension Lost',
  NOT_FOUND_MESSAGE: "Looks like you've traveled to a dimension that doesn't exist!",
  GO_HOME: 'Go Home',
  TRY_AGAIN: 'Try Again',
  RELOAD_PAGE: 'Reload Page',
} as const;

export const ROUTES = {
  HOME: '/',
  CHARACTERS: '/characters',
  CHARACTER_DETAIL: '/character/:id',
  EPISODES: '/episodes',
  EPISODE_DETAIL: '/episode/:id',
  LOCATIONS: '/locations',
  LOCATION_DETAIL: '/location/:id',
  NOT_FOUND: '*',
} as const;

