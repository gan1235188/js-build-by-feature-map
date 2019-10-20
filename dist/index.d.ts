import { featureMap, featureTransformType, builderConfig } from './types';
export * from './types';
export declare function build(featureMap?: featureMap, specialWebpackConfig?: any, builderConfig?: builderConfig): Promise<unknown>;
export declare function setTransformPlugin(_specialTransformConfig: featureTransformType): void;
