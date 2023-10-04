import type { ArcadeExpression } from "@/types"
import { createArcadeExecutor } from "@arcgis/core/arcade"

const defaultProfile: __esri.Profile = { 
  variables: [
    {
      name: '$feature',
      type: 'feature'
    }
  ]
}

/**
 * creates an ArcGIS Executor
 * @param arcade 
 * @returns the {@link https://developers.arcgis.com/javascript/latest/api-reference/esri-arcade.html#ArcadeExecutor ArcadeExecutor}
 * 
 * @example
 * // just passing in a string for the script
 * const executor = await = getArcadeExecutor("(($feature.POP_16UP - $feature.EMP_CY) / $feature.POP_16UP) * 100")
 */
export const getArcadeExecutor = async (arcade: ArcadeExpression) => {
  const script = typeof arcade === 'string'
    ? arcade
    : arcade.arcadeScript
  const profile = typeof arcade === 'string' 
    ? defaultProfile
    : arcade.profile ?? defaultProfile
  const executor = await createArcadeExecutor(script, profile)
  return executor
}

/**
 * helper functions for using Arcade Expressions
 * @param arcade - the arcade expression
 * @returns 
 */
export const useArcade = async (arcade: ArcadeExpression) => {

  /**
   * the arcade executor
   */
  const executor = await getArcadeExecutor(arcade)

  /**
   * executes an arcade function for a single feature
   * @param ft - the feature to execute the script against
   * @param executor - the {@link https://developers.arcgis.com/javascript/latest/api-reference/esri-arcade.html#ExecuteContext Arcade Executor} from a compiled script
   * @param context - the {@link https://developers.arcgis.com/javascript/latest/api-reference/esri-arcade.html#ExecuteContext executor context}
   * @returns the result of the arcade executor
   */
  const executeForFeature = <T = any>(ft: __esri.Graphic, context?: __esri.ExecuteContext) => executor.execute({
    '$feature': ft
  }, context) as T
  
  /**
     * helper function to run an arcade script against an array of graphics
     * @param features - the features to run the script against
     * @param executor - the Arcade Executor from a compiled script
     * @param context - the executor context
     * @returns the results of the arcade script for each feature
     */
  const executeForFeatures = async <T = any>(features: __esri.Graphic[], context?: __esri.ExecuteContext): Promise<T[]> => {
    return features.map((feature)=> {
      executor.execute({ 
        '$feature': feature
      }, context)
    }) as T[]
  }

  return {
    executor,
    executeForFeature,
    executeForFeatures,
    execute: executor.execute
  }
}

