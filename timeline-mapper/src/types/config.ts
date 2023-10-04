/// <reference types="../../node_modules/@arcgis/core/kernel.d.ts" />
/**
 * the Bootstrap Color Types
 */
export type BootstrapColorType = 
  | 'primary' 
  | 'secondary' 
  | 'info'
  | 'success'
  | 'danger'
  | 'warning'
  | 'light'
  | 'dark'

/**
 * the Color Theme map `{ color-name: color-hex | rgba | sass-variable }`
 */
export type ColorTheme = Partial<Record<BootstrapColorType, string>>;

/**
 * the application information
 */
export interface AppInfo { 
  /** the deployment title */
  title: string;
  /** the color theme */
  theme?: ColorTheme;
}

/**
 * the map configuration options
 */
export interface MapConfig {
  /**
   * the arcgis {@link https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html WebMap} constructor properties
   */
  webmap: __esri.WebMapProperties;
  /**
   *  {@link https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html MapView} properties for initial state such as
   * center, scale, etc
   */
  mapView?: __esri.MapViewProperties;
  /**
   * the default basemap id for the light theme
   */
  defaultLightBasemapId?: string;
  /**
   * the default basemap id for the dark theme
   */
  defaultDarkBasemapId?: string;
}

/**
 * the application configuration options
 */
export interface AppConfig { 
  /** 
   * the app information 
   */
  app: AppInfo;
  /** 
   * the map configuration options 
   */
  map: MapConfig;
}
