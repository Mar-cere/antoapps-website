import type { Locale } from '@/lib/i18n/config';

export type SharedUiCopy = {
  loading: string;
  loadingSrOnly: string;
  closeNotification: string;
  notifications: string;
  closeModal: string;
  breadcrumb: string;
  tabsNav: string;
  faqSearchPlaceholder: string;
  faqSearchAria: string;
  clearSearch: string;
  clearSearchButton: string;
  faqAllCategories: string;
  faqNoResults: (query: string) => string;
  faqResultSingular: string;
  faqResultPlural: string;
  pullToRefreshHint: string;
  pullToRefreshRefreshing: string;
};

const uiCopy: Record<Locale, SharedUiCopy> = {
  es: {
    loading: 'Cargando',
    loadingSrOnly: 'Cargando...',
    closeNotification: 'Cerrar notificación',
    notifications: 'Notificaciones',
    closeModal: 'Cerrar modal',
    breadcrumb: 'Miga de pan',
    tabsNav: 'Navegación por pestañas',
    faqSearchPlaceholder: 'Buscar en preguntas frecuentes...',
    faqSearchAria: 'Buscar preguntas frecuentes',
    clearSearch: 'Limpiar búsqueda',
    clearSearchButton: 'Limpiar búsqueda',
    faqAllCategories: 'Todas',
    faqNoResults: (query) => `No se encontraron resultados para "${query}"`,
    faqResultSingular: 'resultado encontrado',
    faqResultPlural: 'resultados encontrados',
    pullToRefreshHint: 'Desliza para actualizar',
    pullToRefreshRefreshing: 'Actualizando...',
  },
  en: {
    loading: 'Loading',
    loadingSrOnly: 'Loading...',
    closeNotification: 'Dismiss notification',
    notifications: 'Notifications',
    closeModal: 'Close dialog',
    breadcrumb: 'Breadcrumb',
    tabsNav: 'Tab navigation',
    faqSearchPlaceholder: 'Search frequently asked questions...',
    faqSearchAria: 'Search FAQ',
    clearSearch: 'Clear search',
    clearSearchButton: 'Clear search',
    faqAllCategories: 'All',
    faqNoResults: (query) => `No results found for "${query}"`,
    faqResultSingular: 'result found',
    faqResultPlural: 'results found',
    pullToRefreshHint: 'Pull to refresh',
    pullToRefreshRefreshing: 'Refreshing...',
  },
};

export function getUiCopy(locale: Locale): SharedUiCopy {
  return uiCopy[locale];
}
