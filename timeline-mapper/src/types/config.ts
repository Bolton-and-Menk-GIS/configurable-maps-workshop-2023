/// <reference types="../../node_modules/@arcgis/core/kernel.d.ts" />
import type { RequireAtLeastOne } from 'type-fest'
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

export type EsriQuery = __esri.Query | __esri.QueryProperties;

interface BaseLayerInfo {
  /**
   * the layer id
   */
  id?: string;
  /** 
   * the layer title
   */
  title?: string;
  /**
   * the date field name that contains the timeline event 
   */
  dateField: string;
  /**
   * a query to use for fetching the timeline events
   */
  query?: EsriQuery;
}

/**
 * the layer info
 */
export type LayerInfo = RequireAtLeastOne<BaseLayerInfo, 'id' | 'title'>


/**
 * arcade expression options, use this to define a script
 * with a given profile
 */
export interface ArcadeExpressionOptions {
  /**
   * the arcade script code
   */
  arcadeScript: string;
  /**
   * the arcade profile options
   */
  profile?: __esri.Profile
}

/**
 * an arcade expression. Can be a string or contain the {@link ArcadeExpressionOptions}
 */
export type ArcadeExpression = string | ArcadeExpressionOptions

/** 
 * the timeline information
 */
export interface TimelineInfo {
  /**
   * the event title Arcade Expression which will be the display name in the
   * timeline list. 
   * 
   * This is an  {@link https://developers.arcgis.com/javascript/latest/arcade/ ArcadeExpression} as a string
   */
  titleExpression: string;
  /**
   * the event subtitle which will also be included in timeline list. 
   * 
   * This is an  {@link https://developers.arcgis.com/javascript/latest/arcade/ ArcadeExpression} as a string
   */
  subtitleExpression?: string;
  /**
   * the event description which will appear under the timeline slider. 
   * 
   * This is an  {@link https://developers.arcgis.com/javascript/latest/arcade/ ArcadeExpression} as a string
   */
  descriptionExpression?: string;
  /**
   * the date {@link https://day.js.org/docs/en/parse/string-format#list-of-all-available-parsing-tokens format} to use for displaying event dates
   */
  dateFormat?: string;
  /**
   * the target layer info
   * 
   */
  layer: LayerInfo;
}

/**
 * a timeline event
 */
export interface TimelineEvent {
  /** 
   * the objectId for the timeline event
   */
  objectId: number;
  /**
   * the event display title
   */
  title: string;
  /**
   * the event display subtitle
   */
  subtitle?: string;
  /**
   * the event description
   */
  description: string;
  /**
   * the event date (in milliseconds)
   */
  date: number;
  /**
   * the formatted Event Date
   */
  formattedDate: string;
  /**
   * the [lat, long] coordinates for the event
   */
  lngLat?: [number, number];
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
  /**
   * the timeline info
   */
  timelineInfo: TimelineInfo;
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

/**
 * represents an app deployment configuration within the Config Registry
 */
export interface RegistryItem {
  /** the deployment id */
  id: string;
  /** the deployment name */
  name: string;
  /** 
   * the deployment config file path, can be a full url or a relative
   * path to the public folder
   */
  path: string;
}

/**
 * the Configuration Registry of app deployments
 */
export interface ConfigRegistry {
  /** the registered application deployment configs */
  apps: RegistryItem[];
}
