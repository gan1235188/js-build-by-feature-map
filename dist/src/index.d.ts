import { featureMap, featureTransformType, featureMapBuilder, builderConfig } from './types';
export * from './types';
export declare function build(featureMap?: featureMap, specialWebpackConfig?: any, builderConfig?: builderConfig): Promise<featureMapBuilder>;
export declare function setTransformPlugin(_specialTransformConfig: featureTransformType): void;
